const dotenv = require("dotenv");
dotenv.config();
const ApiClassError = require("../utils/ApiClassError");

//aws
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({
  region, // Replace with your desired AWS region
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

exports.getuploadedprofilepicture = async (req, res, next) => {
  try {
    // Parse the URL to extract the bucket name and object key
    let urlParts;

    // urlParts = req.user.profileIMG;

    // const objectKey = urlParts;

    // const params = {
    //   Bucket: bucketName,
    //   Key: objectKey,
    // };
    // const command = new GetObjectCommand(params);
    // const url = await getSignedUrl(s3Client, command, {});
    // req.user.profileIMG = url;
    next();
  } catch (e) {
    return next(new ApiClassError(`Failed to load file`, 500));
  }
};
exports.getuploadedprofilepicturefromapply = async (objectKey) => {
  try {
    if (
      objectKey ===
      "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
    ) {
      const url = objectKey;
      return url;
    }
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, {});
    return url;
  } catch (e) {
    return new ApiClassError(`Failed to load file`, 500);
  }
};

// exports.getallcategories = asyncHandler(async (req, res) => {});
