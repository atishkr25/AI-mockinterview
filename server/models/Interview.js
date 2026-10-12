import mongoose from "mongoose";

const questionItemSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    default: null,
  },
  feedback: {
    type: String,
    default: "",
  },
  strengths: { type: String, default: "" },
  idealAnswer: { type: String, default: "" },
});

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    experience: {
      type: mongoose.Schema.Types.Mixed,
      default: 0,
    },
    techStack: {
      type: [String],
      default: [],
    },
    resumeText: {
      type: String,
      default: "",
      select: false,
    },
    questions: {
      type: [questionItemSchema],
      default: [],
    },
    overallScore: {
      type: Number,
      default: null,
    },
    summary: {
      strengths: {
        type: [String],
        default: [],
      },
      improvements: {
        type: [String],
        default: [],
      },
    },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
