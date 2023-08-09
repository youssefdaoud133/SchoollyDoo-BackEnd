const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
dotenv.config();
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const sharp = require("sharp");

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const uploadProfileimage = async (req, res, next) => {
  const file = req.file;
  const imageName = "yahia-photo";
  const fileBuffer = file.buffer;
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: imageName,
    ContentType: file.mimetype,
  };

  try {
    const response = await s3Client.send(new PutObjectCommand(uploadParams));

    req.user.profileIMG = `https://${bucketName}.s3.eu-west-1.amazonaws.com/${imageName}`;
    await req.user.save();
    res.json({});
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).json({ error: "Failed to upload file to S3" });
  }
};

module.exports = uploadProfileimage;
