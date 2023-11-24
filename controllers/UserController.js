const Model = require("../models/index");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  addSubject: catchAsync(async (req, res) => {
    const { name } = req.body;
    if (!name) return res.badRequest(`Missing required parameters: name`);

    const subject = new Model.Subject({
      name,
    });
    await subject.save();

    return res.ok("Subject saved successfully", subject);
  }),

  addTeacher: catchAsync(async (req, res) => {
    const { name } = req.body;
    if (!name) {
      const requiredParams = ["name"]; // List of required parameters

      // Check if all required parameters are present
      const missingParams = requiredParams.filter((param) => !req.body[param]);
      return res.badRequest(
        `Missing required parameters: ${missingParams.join(", ")}`
      );
    }

    const teacher = new Model.Teacher({
      name,
    });
    await teacher.save();

    return res.ok("Teacher saved successfully", teacher);
  }),

  addStudent: catchAsync(async (req, res) => {
    const { name, dob, grade } = req.body;
    if (!name || !dob || !grade) {
      const requiredParams = ["name", "dob", "grade"]; // List of required parameters

      // Check if all required parameters are present
      const missingParams = requiredParams.filter((param) => !req.body[param]);
      return res.badRequest(
        `Missing required parameters: ${missingParams.join(", ")}`
      );
    }

    const student = new Model.Student({
      name,
      dob,
      grade,
    });
    await student.save();

    return res.ok("Student saved successfully", student);
  }),

  addClass: catchAsync(async (req, res) => {
    const { subjectId, teacherId } = req.body;
    if (!subjectId || !teacherId) {
      const requiredParams = ["subjectId", "teacherId"]; // List of required parameters

      // Check if all required parameters are present
      const missingParams = requiredParams.filter((param) => !req.body[param]);
      return res.badRequest(
        `Missing required parameters: ${missingParams.join(", ")}`
      );
    }

    const existingSubject = await Model.Subject.findById(subjectId);
    if (!existingSubject) return res.badRequest("Subject not found");

    const existingTeacher = await Model.Teacher.findById(teacherId);
    if (!existingTeacher) return res.badRequest("Teacher not found");

    const existingClass = await Model.Class.findOne({ subjectId, teacherId });
    if (existingClass) return res.badRequest("Class already exists");

    const newClass = new Model.Class({
      subjectId,
      teacherId,
    });
    await newClass.save();

    return res.ok("Class saved successfully", newClass);
  }),

  assignClassToStudent: catchAsync(async (req, res) => {
    const studentId = req.params.id;
    const student = await Model.Student.findById(studentId);
    if (!student) return res.badRequest("Student not found");

    const { classId } = req.body;
    if (!classId) {
      const requiredParams = ["classId"]; // List of required parameters

      // Check if all required parameters are present
      const missingParams = requiredParams.filter((param) => !req.body[param]);
      return res.badRequest(
        `Missing required parameters: ${missingParams.join(", ")}`
      );
    }

    const existingClass = await Model.Class.findById(classId);
    if (!existingClass) return res.badRequest("Class not found");

    const existingStudentClass = await Model.StudentClass.findOne({
      classId,
      studentId,
    });
    if (existingStudentClass)
      return res.badRequest("Student already registered to class");

    const studentClass = new Model.StudentClass({
      studentId,
      classId,
    });
    await studentClass.save();

    return res.ok("Student assigned to class", null);
  }),

  getSummary: catchAsync(async (req, res) => {
    //NOTE: Could have used aggregated pipeline to compute average age, but virtual properties are not accessible in aggregated pipeline

    const students = await Model.Student.find();
    const totalAge = students.reduce((total, student) => {
      return total + student.age;
    }, 0);
    const totalClasses = await Model.Class.countDocuments();

    const summary = {
      totalStudents: students.length,
      averageAge: students.length > 0 ? totalAge / students.length : 0,
      totalClasses,
    };

    return res.ok("Summary fetched successfully", summary);
  }),
};
