const dotenv = require("dotenv");
dotenv.config();
const ApiClassError = require("../utils/ApiClassError");

//aws
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({
  region, // Replace with your desired AWS region
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
const isS3UrlExpired = require("../utils/SomeUsefulFunction.js/checkS3UrlExpiration");

exports.getuploadedprofilepicture = async (req, res, next) => {
  try {
    if (isS3UrlExpired(req.user.profileIMG)) {
      const realurl = await exports.getuploadedprofilepicturefromapply(
        req.user.orprofileIMG
      );
      req.user.profileIMG = realurl;
      await req.user.save();
    }
    next();
  } catch (e) {
    console.log(e);
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
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10); // Set expiration to 10 years in the future
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 604800, // 10 years in seconds (60 seconds * 60 minutes * 24 hours * 365 days * 10 years)
    });
    return url;
  } catch (e) {
    console.log(e);
    return new ApiClassError(`Failed to load file`, 500);
  }
};

exports.getpostphotosandvideos = async (req, res, next) => {
  3;
  try {
    const params = {
      Bucket: bucketName,
      Key: req.body.path,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 604800, // 10 years in seconds (60 seconds * 60 minutes * 24 hours * 365 days * 10 years)
    });
    res.status(200).json({ url });
  } catch (e) {
    console.log(e);
    return new ApiClassError(`Failed to load file`, 500);
  }
};

// exports.getallcategories = asyncHandler(async (req, res) => {});
