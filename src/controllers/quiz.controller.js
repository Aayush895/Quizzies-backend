import { Quiz } from "../models/quiz.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const createQuiz = asyncHandler(async (req, res) => {
  const { title, quizType, quizQuestions } = req.body;

  if (!title || !quizType || quizQuestions.length === 0) {
    throw new ApiError(400, "Fill all the fields for creating the quiz");
  }

  const quiz = await Quiz.create({ title, quizType, quizQuestions });
  if (!quiz) {
    throw new ApiError(500, "Something went wrong when creating quiz");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, quiz, "Quiz was created successfully"));
});

const fetchAllQuiz = asyncHandler(async (req, res) => {
  const getQuiz = await Quiz.find();
  if (!getQuiz) {
    throw new ApiError(500, "Something went wrong when fetching all the quiz");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, getQuiz, "Quizzes were fetched successfully"));
});

const fetchQuizbyId = asyncHandler(async (req, res) => {
  const { quizId } = req.query;

  if (!quizId) {
    throw new ApiError(400, "Fetch the quiz id to find the quiz");
  }

  const getQuiz = await Quiz.findById(quizId);
  if (!getQuiz) {
    throw new ApiError(500, "Something went wrong while fetching the quiz");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, getQuiz, "Quiz was fetched successfully"));
});

const updateQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.query;
  const { title, quizType, quizQuestions } = req.body;

  if (!quizId) {
    throw new ApiError(400, "Provide the quiz id");
  }

  const getQuiz = await Quiz.findByIdAndUpdate(
    { _id: quizId },
    {
      title,
      quizType,
      quizQuestions,
    },
    {
      new: true,
    }
  );

  if (!getQuiz) {
    throw new ApiError(500, "Something went wrong while updating the quiz");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, getQuiz, "Quiz was updated successfully"));
});

const deleteQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.query;

  if (!quizId) {
    throw new ApiError(400, "Fetch the quiz id to delete the quiz");
  }

  const isQuizDeleted = await Quiz.findByIdAndDelete({ _id: quizId });

  if (!isQuizDeleted) {
    throw new ApiError(500, "Something went wrong while deleting the quiz");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Quiz was deleted successfully"));
});

export { createQuiz, fetchAllQuiz, deleteQuiz, fetchQuizbyId, updateQuiz };
