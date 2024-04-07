import { S3ClientClass } from "./s3";
import { SQSClientClass } from "./sqs";
import { Message } from "@aws-sdk/client-sqs";

export const s3client: S3ClientClass = S3ClientClass.Instance;
export const sqsclient: SQSClientClass = SQSClientClass.Instance;

export type { Message };
export * from "./constants";
