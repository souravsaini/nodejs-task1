const express = require("express");
const Controller = require("../controllers/index");
const router = express.Router();

router.route("/subjects").post(Controller.UserController.addSubject);
router.route("/students").post(Controller.UserController.addStudent);
router.route("/teachers").post(Controller.UserController.addTeacher);
router.route("/classes").post(Controller.UserController.addClass);
router
  .route("/students/:id/class")
  .post(Controller.UserController.assignClassToStudent);

router.route("/summary").get(Controller.UserController.getSummary);

module.exports = router;
