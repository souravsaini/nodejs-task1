const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubjectModel = new Schema(
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

SubjectModel.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  },
});

const Subject = mongoose.model("Subject", SubjectModel);
module.exports = Subject;
