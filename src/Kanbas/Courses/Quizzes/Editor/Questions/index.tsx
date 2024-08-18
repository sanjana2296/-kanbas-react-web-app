import React, { useEffect } from "react";
import { FaCheckCircle, FaEllipsisV, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router-dom";
import useQuizData from "../useQuizData";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz } from "../../reducer";
import {
  setQuestions,
  addQuestion,
  resetQuestions,
  deleteQuestion,
  selectTotalPoints,
} from "./questionsReducer";
import { KanbasState } from "../../../../store";
import * as client from "../../client";
import QuestionCard from "./card";

function Questions() {
  const { cid, quizId } = useParams();
  const { quiz, updateQuizData } = useQuizData(quizId, cid);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const questions = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );

  const totalPoints = useSelector(selectTotalPoints);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await client.findQuestionsForQuiz(quizId!);

        dispatch(setQuestions(fetchedQuestions));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [quizId, dispatch]);

  const handleCancel = () => {
    dispatch(resetQuestions());
    navigate(`/Kanbas/Courses/${cid}/quizzes`);
  };

  const addNewQuestion = async (questionType: string) => {
    let newQuestion: any;

    if (questionType === "Multiple Choice") {
      newQuestion = {
        title: "Sample Multiple Choice Question",
        question: "This is a sample multiple choice question",
        options: ["Choice 1", "Choice 2", "Choice 3"],
        correctAnswer: 2,
        points: 2,
        type: "multiple_choice",
      };
    } else if (questionType === "True/False") {
      newQuestion = {
        title: "Sample True False question",
        question: "This is a sample true/false question",
        options: ["True", "False"],
        correctAnswer: 1,
        points: 4,
        type: "true_false",
      };
    } else if (questionType === "Fill in the Blank") {
      newQuestion = {
        title: "Sample Fill in the Blanks question",
        question:
          "This is a sample fill in the blanks question, please fill in __blank1__ and __blank2__",
        options: ["Choice 1", "Choice 2"],
        blanks: ["answer1", "answer2"],
        points: 5,
        type: "fill_in_the_blanks",
      };
    }

    try {
      const createdQuestion = await client.createQuestion(
        cid!,
        quizId!,
        newQuestion
      );
      dispatch(addQuestion(createdQuestion));
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleDelete = (questionId: string) => {
    if (window.confirm("Are you sure you want to remove this question?")) {
      client.deleteQuestion(quizId!, questionId).then(() => {
        dispatch(deleteQuestion(questionId));
      });
    }
  };

  const handleUpdateQuiz = async (quizData: any) => {
    const updatedQuiz = await client.updateQuiz(quiz);
    dispatch(updateQuiz(updatedQuiz));
    return updatedQuiz;
  };

  const handleSave = async () => {
    let totalPoints = 0;
    questions.forEach((question) => {
      totalPoints += question.points;
    });
    const updatedQuiz = { ...quiz, points: totalPoints };
    await updateQuizData(updatedQuiz);
    navigate(`/Kanbas/Courses/${cid}/quizzes`);
  };

  const handleSaveAndPublish = async () => {
    const existingQuiz = quizzes.find((q) => q._id === quizId);
    if (existingQuiz) {
      try {
        const updatedQuiz = { ...quiz, isPublished: true };
        const response = await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(response));
        navigate(`/Kanbas/Courses/${cid}/quizzes`);
      } catch (error) {
        console.error("Error updating quiz:", error);
      }
    }
  };

  return (
    <div className="w-100 px-5 mt-5 mb-4">
      <div className="d-flex justify-content-end align-items-center me-3 mt-2 pb-3 border-2 border-bottom">
        <div className="d-flex justify-content-start align-items-center">
          Total question points {totalPoints} |
          {quiz.isPublished ? (
            <span className="ms-2">
              <FaCheckCircle className="text-success me-1" /> Published
            </span>
          ) : (
            <span className="ms-2">
              <FaRegEyeSlash className="text-danger me-1" /> Unpublished
            </span>
          )}
        </div>
        <button className="btn btn-light ms-3">
          <FaEllipsisV />
        </button>
      </div>
      <ul className="m-3 nav nav-tabs">
        <li className="nav-item">
          <Link
            to={`/Kanbas/Courses/${cid}/quizzes/${quizId}/editor`}
            className="nav-link text-danger"
          >
            Details
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={`/Kanbas/Courses/${cid}/quizzes/${quizId}/editor/questions`}
            className="nav-link active"
          >
            Questions
          </Link>
        </li>
      </ul>
      <hr />
      <button
        className="btn btn-success mb-2"
        onClick={() => addNewQuestion("Multiple Choice")}
      >
        + New Multiple Choice Question
      </button>
      <button
        className="btn btn-success mb-2 ms-2"
        onClick={() => addNewQuestion("True/False")}
      >
        + New True/False Question
      </button>
      <button
        className="btn btn-success mb-2 ms-2"
        onClick={() => addNewQuestion("Fill in the Blank")}
      >
        + New Fill in the Blank Question
      </button>
      {questions.map((question) => (
        <QuestionCard
          key={question._id}
          question={question}
          handleDelete={handleDelete}
        />
      ))}
      <hr />
      <button
        onClick={handleSaveAndPublish}
        className="btn btn-outline-secondary ms-2 float-end"
      >
        Save & Publish
      </button>
      <button onClick={handleSave} className="btn btn-danger ms-2 float-end">
        Save
      </button>
      <Link
        onClick={handleCancel}
        to={`/Kanbas/Courses/${cid}/quizzes`}
        className="btn btn-outline-secondary float-end"
      >
        Cancel
      </Link>
    </div>
  );
}
export default Questions;
