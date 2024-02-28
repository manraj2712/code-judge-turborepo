import fs from "fs";
import { exec } from "child_process";
import { finished } from "stream/promises";
import { Readable } from "stream";
import { ReadableStream } from "stream/web";
import {joinPath, getImportsByLanguage, getUnixPath } from ".";
import {s3client} from "@manraj2712/aws-services";

type ExecutionFilePaths = {
  pathToMain: string;
  pathToInput: string;
  pathToExpectedOutput: string;
  pathToOutput: string;
};

async function generateExecutionFilePaths({
  submissionId,
  userSubmittedCode,
  problemId,
  language,
}: {
  submissionId: string;
  userSubmittedCode: string;
  problemId: string;
  language: string;
}): Promise<ExecutionFilePaths> {
  const directoryPath = joinPath(
    __dirname,
    "..",
    "/requests",
    `/${submissionId}`
  );

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  const fileNames = ["driver-code.txt", "input.txt", "expected-output.txt"];

  const signedUrls = await s3client.getMultipleObjectURLs({
    bucketName: "codestreax-problems",
    files: fileNames,
    directory: problemId,
  });

  for (let i = 0; i < fileNames.length; i++) {
    const filePath = joinPath(directoryPath, fileNames[i]);

    // Fetch the file from the signed URL
    const response = await fetch(signedUrls[i]);

    if (response.ok) {
      const fileStream = fs.createWriteStream(filePath);
      const body = response.body as ReadableStream<any>;
      await finished(Readable.fromWeb(body).pipe(fileStream));
    }
  }

  fs.writeFileSync(joinPath(directoryPath, "output.txt"), "");

  const imports = getImportsByLanguage(language.toLowerCase());
  const codeToExecute = `
      ${imports}
      ${userSubmittedCode}
      ${fs.readFileSync(joinPath(directoryPath, "driver-code.txt"), "utf-8")}
      `;

  const pathToMain = joinPath(directoryPath, "main.cpp");
  fs.writeFileSync(pathToMain, codeToExecute);

  const pathToTestCases = joinPath(directoryPath, "expected-output.txt");
  const pathToOutput = joinPath(directoryPath, "output.txt");
  const pathToInput = joinPath(directoryPath, "input.txt");

  return {
    pathToMain,
    pathToInput,
    pathToExpectedOutput: pathToTestCases,
    pathToOutput,
  };
}

async function executeDockerCommand({
  files,
}: {
  files: ExecutionFilePaths;
}): Promise<any> {
  const dockerCommand = `docker run --rm -v ${getUnixPath(
    files.pathToMain
  )}:/home/sandbox/main.cpp:ro -v ${getUnixPath(
    files.pathToExpectedOutput
  )}:/home/sandbox/expected-output.txt:ro -v ${getUnixPath(
    files.pathToOutput
  )}:/home/sandbox/output.txt -v ${getUnixPath(
    files.pathToInput
  )}:/home/sandbox/input.txt:ro`;

  const startTime = new Date().getTime();

  return await new Promise((resolve, reject) => {
    exec(dockerCommand, (err, stdout, stderr) => {
      if (err) {
        const errorToSend = err.message
          .substring(err.message.indexOf("\n") + 1)
          .replace("main.cpp:", "");
        const endTime = new Date().getTime();
        reject({
          error: errorToSend,
          timeToExecute: `${(endTime - startTime) / 1000}s`,
        });
      } else {
        const endTime = new Date().getTime();
        const output = fs.readFileSync(files.pathToOutput, "utf-8");
        if (
          output.split(" ")[0] !== "Success" ||
          output.split(" ")[0] !== "Failed"
        ) {
          reject({
            error: "Invalid user input",
            timeToExecute: `${(endTime - startTime) / 1000}s`,
          });
        }
        resolve({
          output: output || stdout,
          timeToExecute: `${(endTime - startTime) / 1000}s`,
        });
      }
    });
  });
}

export { generateExecutionFilePaths, ExecutionFilePaths, executeDockerCommand };
