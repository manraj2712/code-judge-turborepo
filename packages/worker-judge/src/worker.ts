import { sqsclient, Message } from "@manraj2712/aws-services";

import { executeDockerCommand, generateExecutionFilePaths } from "./utils";
import { Status, prisma } from "@manraj2712/database";

export const processQueue = async () => {
  await new Promise<void>(async (resolve) => {
    const response = await sqsclient.getMessage();

    if (!response || !response.Messages || !response.Messages[0]) {
      console.log(`Nothing left to process`);
      setTimeout(resolve, 5000);
    } else {
      const timeout = setTimeout(() => {
        resolve();
      }, 10 * 1000);
      await processResponse(response.Messages[0]);
      clearTimeout(timeout);
      resolve();
    }
  });
};

const processResponse = async (message: Message) => {
  try {
    const submissionId = message.Body;
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
    });

    if (!submission) {
      console.log(`Submission with id ${submissionId} not found`);
      return;
    }

    const files = await generateExecutionFilePaths({
      submissionId: submission.id,
      userSubmittedCode: submission.code,
      problemId: submission.problemId,
      language: submission.language,
    });

    try {
      const res = await executeDockerCommand({ files });
      prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: Status.AC,
          output: res.output,
          time: res.timeToExecute,
        },
      });
      sqsclient.deleteMessage({ receiptHandle: message.ReceiptHandle! });
    } catch (e: any) {
      prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: Status.WA,
          output: e.toString(),
          time: e.timeToExecute,
        },
      });
      sqsclient.deleteMessage({ receiptHandle: message.ReceiptHandle! });
    }
  } catch (e) {
    console.log(`ERROR: while processing queue`);
    console.log(e);
  }
};

process.on("uncaughtException", function (err) {
  console.log("Caught exception: " + err);
});
