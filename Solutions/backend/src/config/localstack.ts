import AWS from 'aws-sdk';
import { createError } from '@utils/error.util';

export const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  s3ForcePathStyle: true,
});

export async function uploadFileToS3(
  bucketName: string,
  fileName: string,
  fileBuffer: Buffer,
  mimeType: string
): Promise<string> {
  try {
    await s3.putObject({
      Bucket: bucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
    }).promise();

    return `${process.env.S3_ENDPOINT}/${bucketName}/${fileName}`;
  } catch (error) {
    throw createError('E23: Erro inesperado.', 500, { details: (error as Error).message });
  }
}

export async function deleteFileFromS3(fileUrl: string): Promise<void> {
  try {
    const urlParts = fileUrl.replace(`${process.env.S3_ENDPOINT}/`, '').split('/');
    const bucketName = urlParts[0];
    const key = urlParts.slice(1).join('/');

    await s3.deleteObject({
      Bucket: bucketName,
      Key: key
    }).promise();
  } catch (error) {
    console.error(`Erro ao deletar arquivo órfão: ${fileUrl}`, error);
  }
}