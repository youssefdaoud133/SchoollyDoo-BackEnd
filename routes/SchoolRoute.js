const express = require("express");
const router = express.Router();
const Crud = require("../services/CrudClass");
const Auth = require("../services/AuthClass");
const CrudForSchool = new Crud("SchoolModel");

const AuthUsers = new Auth();

const {
  CreatevalidateData,
  FindvalidateData,
  updatevalidateData,
  DeletevalidateData,
} = require("../utils/validations/ValidationsSchools");
//
router
  .route("/")
  .post(
    CreatevalidateData,
    AuthUsers.protect.bind(AuthUsers),
    CrudForSchool.createHandler.bind(CrudForSchool)
  )
  .get(CrudForSchool.readAllHandlerAndPopulate.bind(CrudForSchool));
router
  .route("/unactive")
  .get(
    AuthUsers.protect.bind(AuthUsers),
    CrudForSchool.readAllHandlerUnactiveSchool.bind(CrudForSchool)
  );
router
  .route("/myschool")
  .get(
    AuthUsers.protect.bind(AuthUsers),
    CrudForSchool.readAllHandlermySchool.bind(CrudForSchool)
  );

router
  .route("/:id")
  .get(FindvalidateData, CrudForSchool.readOneSchool.bind(CrudForSchool));
router
  .route("/unactive/:id")
  .put(CrudForSchool.updateHandler.bind(CrudForSchool))
  .delete(CrudForSchool.deleteHandler.bind(CrudForSchool));

module.exports = router;
