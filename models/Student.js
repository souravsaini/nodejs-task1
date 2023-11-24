const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StudentModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

StudentModel.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  },
});

// Define a virtual field 'age' for studentSchema
StudentModel.virtual("age").get(function () {
  const now = new Date();
  const dob = this.dob;
  const diff = now.getTime() - dob.getTime();
  const ageDate = new Date(diff); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
});

const Student = mongoose.model("Student", StudentModel);
module.exports = Student;
