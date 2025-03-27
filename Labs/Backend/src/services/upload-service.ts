import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const bucketName = process.env.BUCKET_NAME!;
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  endpoint: process.env.AWS_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Upload file to S3
export async function uploadFileToS3(file: Express.Multer.File) {
  const params = {
    Bucket: bucketName,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await s3.send(new PutObjectCommand(params));
  console.log(`File ${file.originalname} uploaded to bucket ${bucketName}`);
}
