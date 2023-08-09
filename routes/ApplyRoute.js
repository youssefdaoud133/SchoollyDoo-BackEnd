const express = require("express");
const router = express.Router();
const Crud = require("../services/CrudClass");
const Auth = require("../services/AuthClass");
const CrudForApply = new Crud("ApplyModel");

const AuthUsers = new Auth();

const {
  CreatevalidateData,
  FindvalidateData,
  updatevalidateData,
  DeletevalidateData,
} = require("../utils/validations/ValidationsApply");
//
router
  .route("/")
  .post(
    CreatevalidateData,
    AuthUsers.protect.bind(AuthUsers),
    CrudForApply.createHandler.bind(CrudForApply)
  );
//   .get(CrudForApply.readAllHandlerAndPopulate.bind(CrudForApply));
router
  .route("/unactive")
  .get(
    AuthUsers.protect.bind(AuthUsers),
    CrudForApply.readAllHandlerUnactiveApply.bind(CrudForApply)
  );
// router
//   .route("/myschool")
//   .get(
//     AuthUsers.protect.bind(AuthUsers),
//     CrudForApply.readAllHandlermySchool.bind(CrudForApply)
//   );

// router
//   .route("/:id")
//   .get(FindvalidateData, CrudForApply.readOneSchool.bind(CrudForApply));
router
  .route("/unactive/:id")
  .put(CrudForApply.updateHandler.bind(CrudForApply))
  .delete(CrudForApply.deleteHandler.bind(CrudForApply));

module.exports = router;
