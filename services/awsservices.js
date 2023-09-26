// import libraries
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
dotenv.config();
// get access
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const ApiClassError = require("../utils/ApiClassError");

// test
const { getuploadedprofilepicturefromapply } = require("./getawsservices");

//generaterandomname
function generateDifficultname(length = 12) {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";

  const allChars = uppercaseChars + lowercaseChars + numberChars;

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
}

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

exports.uploadProfileimage = async (req, res, next) => {
  const file = req.file;
  const typeHeader = req.header("Type"); // Get the type from the header

  if (!typeHeader) {
    return res.status(400).json({ error: "Missing X-Upload-Type header" });
  }

  const imageName =
    typeHeader === "ProfilePictures"
      ? `ProfilePictures/${req.user.username}/${generateDifficultname()}`
      : `${req.user.company}/${
          req.user.username
        }/${typeHeader}/${generateDifficultPassword()}`;
  const fileBuffer = file.buffer;
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: imageName,
    ContentType: file.mimetype,
  };

  try {
    const response = await s3Client.send(new PutObjectCommand(uploadParams));
    if (typeHeader === "ProfilePictures") {
      req.user.orprofileIMG = imageName;
      const realurl = await getuploadedprofilepicturefromapply(imageName);
      req.user.profileIMG = realurl;
    }

    await req.user.save();
    res.json(response);
  } catch (error) {
    return next(new ApiClassError(`Failed to upload file to S3`, 500));
  }
};
exports.uploadPostimages = async (req, res, next) => {
  const images = req.files;
  const posttxt = req.body.txt;
  if (images.length === 0 && posttxt === "") {
    return next(new ApiClassError(`Write anything or add Media`, 500));
  }
  console.log(posttxt);
  let arrayofphotos = [];
  try {
    for (const image of images) {
      const imageName = `${req.user.company}/${
        req.user.username
      }/${"PostsImages"}/${generateDifficultname()}`;
      arrayofphotos.push(imageName);

      const fileBuffer = image.buffer;
      const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: imageName,
        ContentType: image.mimetype,
      };
      await s3Client.send(new PutObjectCommand(uploadParams));
    }
    req.body = {
      post_text: posttxt,
      owner: req.user._id,
      school: req.user.company,
      photos: arrayofphotos,
      role: req.user.role,
    };

    next();
  } catch (error) {
    console.log(error);
    return next(new ApiClassError(`Failed to upload file to S3`, 500));
  }
};
