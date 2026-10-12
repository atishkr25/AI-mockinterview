import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  createInterview,
  getInterviews,
  getInterviewById,
  saveAnswers,
  finishInterview,
} from "../controllers/interviewController.js";
import upload from "../middlewares/resumeUpload.js";

const interviewRouter = express.Router();

interviewRouter.use(isAuth);

interviewRouter.post("/", upload.single("resume"), createInterview);
interviewRouter.get("/", getInterviews);
interviewRouter.get("/:id", getInterviewById);
interviewRouter.post("/:id/answers", saveAnswers);
interviewRouter.post("/:id/finish", finishInterview);

export default interviewRouter;