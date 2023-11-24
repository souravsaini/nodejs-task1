const mongoose = require("mongoose");

const StudentClassSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
  },
  { timestamps: true }
);

StudentClassSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  },
});

// Hook to update numberOfStudents in the associated Class
StudentClassSchema.post("save", async function () {
  const Class = mongoose.model("Class");
  const classId = this.classId;
  console.log(classId);
  const count = await this.model("StudentClass").countDocuments({ classId });
  console.log(count);
  await Class.updateOne({ _id: classId }, { numberOfStudents: count });
});

const StudentClass = mongoose.model("StudentClass", StudentClassSchema);

module.exports = StudentClass;
