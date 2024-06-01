import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  optionsType: {
    type: String,
    enum: ["Text", "Image URL", "Text & Image URL"],
    required: true,
  },
  options: {
    type: Schema.Types.Mixed,
    required: true,
  },
  correctOption: {
    type: String,
  },
  timer: {
    type: String,
    enum: ["", "Off", "5 Sec", "10 Sec"],
  },
});

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    quizType: {
      type: String,
      required: true,
    },
    quizQuestions: {
      type: [questionSchema],
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export { Quiz };
