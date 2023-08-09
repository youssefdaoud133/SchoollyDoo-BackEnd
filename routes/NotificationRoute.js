const express = require("express");
const router = express.Router();
const Crud = require("../services/CrudClass");
const Auth = require("../services/AuthClass");
const CrudForNotification = new Crud("NotificationModel");

const AuthUsers = new Auth();

const {
  CreatevalidateData,
  FindvalidateData,
  updatevalidateData,
  DeletevalidateData,
} = require("../utils/validations/ValidationsNotification");
//
router
  .route("/")
  .post(
    CreatevalidateData,
    AuthUsers.protect.bind(AuthUsers),
    CrudForNotification.createHandler.bind(CrudForNotification)
  )

  .get(CrudForNotification.readAllHandlerAndPopulate.bind(CrudForNotification));
router
  .route("/AllNotificationsForThisUser")
  .get(
    AuthUsers.protect.bind(AuthUsers),
    CrudForNotification.ReadAllNotifications.bind(CrudForNotification)
  )
  .put(
    AuthUsers.protect.bind(AuthUsers),
    CrudForNotification.makeReadAllNotifications.bind(CrudForNotification)
  );
router
  .route("/OneNotificationsForThisUser/:id")

  .put(
    AuthUsers.protect.bind(AuthUsers),
    CrudForNotification.makeReadOneNotifications.bind(CrudForNotification)
  );

// router
//   .route("/:id")
//   .get(FindvalidateData, CrudForSchool.readOneSchool.bind(CrudForSchool));
// router
//   .route("/unactive/:id")
//   .put(CrudForSchool.updateHandler.bind(CrudForSchool))
//   .delete(CrudForSchool.deleteHandler.bind(CrudForSchool));

module.exports = router;
