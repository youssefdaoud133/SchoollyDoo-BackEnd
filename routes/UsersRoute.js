const express = require("express");
const router = express.Router();
const Crud = require("../services/CrudClass");
const Auth = require("../services/AuthClass");
const CrudForUsers = new Crud("UserModel");
const AuthUsers = new Auth();
const { uploadProfileimage } = require("../services/awsservices");

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  CreatevalidateData,
  FindvalidateData,
  updatevalidateData,
  DeletevalidateData,
} = require("../utils/validations/ValidationsUsers");
//
router
  .route("/")
  .post(CreatevalidateData, CrudForUsers.createHandler.bind(CrudForUsers))
  .get(CrudForUsers.readAllHandler.bind(CrudForUsers));

router
  .route("/uploadprofilepicture")
  .post(
    AuthUsers.protect.bind(AuthUsers),
    upload.single("image"),
    uploadProfileimage
  );

router
  .route("/:id")
  .get(FindvalidateData, CrudForUsers.readOneHandler.bind(CrudForUsers))
  .put(updatevalidateData, CrudForUsers.updateHandler.bind(CrudForUsers))
  .delete(DeletevalidateData, CrudForUsers.deleteHandler.bind(CrudForUsers));

module.exports = router;
