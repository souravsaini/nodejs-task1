const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TeacherModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TeacherModel.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  },
});

const Teacher = mongoose.model("Teacher", TeacherModel);
module.exports = Teacher;
