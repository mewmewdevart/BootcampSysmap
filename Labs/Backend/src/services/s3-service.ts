import { CreateBucketCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

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

export async function createBucket() {
    await s3.send(
        new CreateBucketCommand({
            Bucket: bucketName,
        })
    );
    console.log(`Bucket ${bucketName} created`);
}

export async function uploadImage(file: Express.Multer.File){
    const uploadParams = {
        Bucket: bucketName,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
    }

    const retornaOq = await s3.send(new PutObjectCommand(uploadParams)); // => Envia o arquivo para o S3
    console.log(retornaOq)
    return `${process.env.AWS_ENDPOINT}/${bucketName}/${file.originalname}`; // => Retorna a URL do arquivo no S3
} 