import { Router } from "express";
import {
  createQuiz,
  fetchAllQuiz,
  deleteQuiz,
  fetchQuizbyId,
  updateQuiz
} from "../controllers/quiz.controller.js";

const router = Router();

router.route("/create-quiz").post(createQuiz);
router.route("/quizzes").get(fetchAllQuiz);
router.route("/delete-quiz").delete(deleteQuiz);
router.route("/quiz-id").get(fetchQuizbyId);
router.route("/update-quiz").patch(updateQuiz)

export default router;
