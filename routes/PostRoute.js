const express = require("express");
const router = express.Router();
const Crud = require("../services/CrudClass");
const Auth = require("../services/AuthClass");
const CrudForPosts = new Crud("PostModel");
const multer = require("multer");
const storage = multer.memoryStorage(); // Store files in memory (you can customize storage options)
const upload = multer({ storage });

const AuthUsers = new Auth();
const { uploadPostimages } = require("../services/awsservices");
const { getpostphotosandvideos } = require("../services/getawsservices");

const isS3UrlExpired = require("../utils/SomeUsefulFunction.js/checkS3UrlExpiration");

router
  .route("/")
  .post(
    AuthUsers.protect.bind(AuthUsers),
    upload.array("files"),
    uploadPostimages,
    CrudForPosts.createHandler.bind(CrudForPosts)
  );
router
  .route("/GetPostsRelateToSchool")
  .get(
    AuthUsers.protect.bind(AuthUsers),
    CrudForPosts.readAllPostsRelatedToSchool.bind(CrudForPosts)
  );
router.route("/GetFile").post(getpostphotosandvideos);

router
  .route("/AddLike/:id")
  .post(
    AuthUsers.protect.bind(AuthUsers),
    CrudForPosts.AddLike.bind(CrudForPosts)
  );
router
  .route("/RemoveLike/:id")
  .post(
    AuthUsers.protect.bind(AuthUsers),
    CrudForPosts.RemoveLike.bind(CrudForPosts)
  );
router
  .route("/:id")
  .get(
    AuthUsers.protect.bind(AuthUsers),
    CrudForPosts.readAllLikesRelatedToPostAndPopulate.bind(CrudForPosts)
  );

router
  .route("/:id")
  .delete(
    AuthUsers.protect.bind(AuthUsers),
    CrudForPosts.deleteHandler.bind(CrudForPosts)
  )
  .put(
    AuthUsers.protect.bind(AuthUsers),
    CrudForPosts.updateHandler.bind(CrudForPosts)
  );

module.exports = router;
