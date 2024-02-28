import {
    SQSClient,
    SendMessageCommand,
    ReceiveMessageCommand,
    SendMessageCommandOutput,
    DeleteMessageCommand,
    DeleteMessageCommandOutput,
    ReceiveMessageCommandOutput,
  } from "@aws-sdk/client-sqs";
  require("dotenv").config();
  
  export class SQSClientClass {
    private static _instance: SQSClientClass;
    private clientInstance: SQSClient;
    private queueUrl: string;
  
    private constructor() {
      this.queueUrl = process.env.SUBMISSION_QUEUE_URL!;
      this.clientInstance = new SQSClient({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
      });
    }
  
    public static get Instance() {
      return this._instance || (this._instance = new this());
    }
  
    public async getMessage(): Promise<ReceiveMessageCommandOutput> {
      const command = new ReceiveMessageCommand({
        QueueUrl: this.queueUrl,
        MaxNumberOfMessages: 1,
      });
  
      return await this.clientInstance.send(command);
    }
  
    public async deleteMessage({
      receiptHandle,
    }: {
      receiptHandle: string;
    }): Promise<DeleteMessageCommandOutput> {
      const command = new DeleteMessageCommand({
        QueueUrl: this.queueUrl,
        ReceiptHandle: receiptHandle,
      });
  
      return await this.clientInstance.send(command);
    }
  
    public async sendMessage({
      message,
    }: {
      message: string;
    }): Promise<SendMessageCommandOutput> {
      const command = new SendMessageCommand({
        QueueUrl: this.queueUrl,
        MessageBody: message,
        MessageAttributes: {
          "submission-id": {
            DataType: "String",
            StringValue: "123",
          },
        },
        MessageGroupId: "submissions",
      });
  
      return await this.clientInstance.send(command);
    }
  }
  