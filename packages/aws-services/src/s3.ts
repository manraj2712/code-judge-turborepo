import { GetObjectCommand, S3Client as S3C } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
require("dotenv").config();

export class S3ClientClass {
  private static _instance: S3ClientClass;
  private clientInstance: S3C;

  private constructor() {
    this.clientInstance = new S3C({
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

  public async getObjectURL({
    bucketName,
    key,
    directory,
  }: {
    bucketName: string;
    key: string;
    directory: string;
  }): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: `${directory}/${key}`,
    });

    const signedUrl = await getSignedUrl(this.clientInstance, command, {
      expiresIn: 3600,
    });

    return signedUrl;
  }

  public getMultipleObjectURLs({
    files,
    directory,
    bucketName,
  }: {
    files: string[];
    directory: string;
    bucketName: string;
  }): Promise<string[]> {
    return Promise.all(
      files.map((file) =>
        this.getObjectURL({
          bucketName: bucketName,
          key: file,
          directory,
        })
      )
    );
  }
}
