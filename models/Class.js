const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    numberOfStudents: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

ClassSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  },
});

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
