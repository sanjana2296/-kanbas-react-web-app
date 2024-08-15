import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { FaCheck, FaRegEyeSlash, FaPencilAlt } from "react-icons/fa";
import "./index.css";
import { KanbasState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../client";
import { updateQuiz } from "../reducer";

function QuizDetails() {
  const { cid, quizId } = useParams();

  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );

  const selectedQuiz = useSelector(
    (state: KanbasState) => state.quizzesReducer.quiz
  );

  let quiz = quizList.find((quiz) => quiz._id === quizId);
  if (quiz === undefined) {
    quiz = selectedQuiz;
  }

  const dispatch = useDispatch();

  const handlePublishQuiz = (quiz: any) => {
    const updatedQuiz = { ...quiz, isPublished: !quiz.isPublished };

    client.updateQuiz(updatedQuiz).then((quiz) => {
      dispatch(updateQuiz(updatedQuiz));
    });
  };

  const handleDateChange = (dueDate: Date) => {
    const date = new Date(dueDate);
    const day = date.getDate() + 1;
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()]; // JavaScript months are 0-based
    const year = date.getFullYear();

    const dateStr = `${month} ${day}, ${year} at 11:59 pm`;
    return dateStr;
  };

  return (
    <div className="w-100 px-5 mt-5">
      <div className="d-flex">
        <div className="flex-fill justify-content-start"></div>

        <div className="d-flex justify-content-end">
          <Link
            to={`/Kanbas/Courses/${cid}/quizzes`}
            className={`btn btn-${
              quiz.isPublished ? "danger" : "success"
            } me-1`}
            onClick={() => handlePublishQuiz(quiz)}
            aria-pressed={quiz.isPublished}
            data-toggle="button"
          >
            {quiz.isPublished ? (
              <>
                <FaRegEyeSlash /> Unpublish
              </>
            ) : (
              <>
                <FaCheck /> Publish
              </>
            )}
          </Link>

          <Link
            to={`/Kanbas/Courses/${cid}/quizzes/${quizId}/Preview`}
            className="btn btn-primary me-1"
          >
            Preview
          </Link>

          <Link
            to={`/Kanbas/Courses/${cid}/quizzes/${quizId}/Editor`}
            className="btn btn-warning me-1"
          >
            <FaPencilAlt />
            Edit
          </Link>

          {/* Context Menu */}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm btn-spacing btn-color"
          >
            <FaEllipsisV />
          </button>
        </div>
      </div>

      <hr />

      {/* Quiz Details */}
      <h2>{quiz.title}</h2>

      <div className="container">
        {/* <!-- Type--> */}
        <div className="row g-4">
          <div className="col-3 details-text">
            <h5>Quiz Type</h5>
          </div>
          <div className="col-6 text-start details-value">
            <div className="input-group mb-3">{quiz.type}</div>
          </div>
        </div>

        {/* Points */}
        <div className="row g-4">
          <div className="col-3 details-text">
            <h5>Points</h5>
          </div>
          <div className="col-6 text-start details-value">
            <div className="input-group mb-3">{quiz.points}</div>
          </div>
        </div>

        {/* Group */}
        <div className="row g-4">
          <div className="col-3 details-text">
            <h5>Assignment Group</h5>
          </div>
          <div className="col-6 text-start details-value">
            <div className="input-group mb-3">{quiz.group}</div>
          </div>
        </div>

        {/* Shuffle answers */}
        <div className="row g-4">
          <div className="col-3 details-text">
            <h5>Shuffle Answers</h5>
          </div>
          <div className="col-6 text-start details-value">
            <div className="input-group mb-3">{quiz.isShuffleAnswers}</div>
          </div>
        </div>

        {/* Time Limit */}
        <div className="row g-4">
          <div className="col-3 details-text">
            <h5>Time Limit</h5>
          </div>
          <div className="col-6 text-start details-value">
            <div className="input-group mb-3">{quiz.timeLimit}</div>
          </div>
        </div>

        {/* Multiple Attempts */}
        <div className="row g-4">
          <div className="col-3 details-text">
            <h5>Multiple Attempts</h5>
          </div>
          <div className="col-6 text-start details-value">
            <div className="input-group mb-3">{quiz.isMultipleAttempts}</div>
          </div>
        </div>

        {/* Show Correct Answers */}
        <div className="row g-4">
          <div className="col-3 details-text">
            <h5>Show Correct Answers</h5>
          </div>
          <div className="col-6 text-start details-value">
            <div className="input-group mb-3">{quiz.isShowCorrectAnswers}</div>
          </div>
        </div>

        {/* One question at a time */}
        <div className="row g-4">
          <div className="col-3 details-text">
            <h5>One Question at a Time</h5>
          </div>
          <div className="col-6 text-start details-value">
            <div className="input-group mb-3">{quiz.oneQuestionAtATime}</div>
          </div>
        </div>

        {/* Webcam required */}
        <div className="row g-4">
          <div className="col-3 details-text">
            <h5>Webcam Required</h5>
          </div>
          <div className="col-6 text-start details-value">
            <div className="input-group mb-3">{quiz.isWebCamRequired}</div>
          </div>
        </div>

        {/* Lock questions after answered */}
        <div className="row g-4">
          <div className="col-3 details-text">
            <h5>Lock Questions After Answered</h5>
          </div>
          <div className="col-6 text-start details-value">
            <div className="input-group mb-3">
              {quiz.isLockQuestionsAfterAnswered}
            </div>
          </div>
        </div>
      </div>

      {/* table for due, available, for and until */}
      <div className="container">
        <table className="table">
          <tbody>
            <tr>
              <td>
                <h5>Due</h5>
              </td>
              <td>
                <h5>For</h5>
              </td>
              <td>
                <h5>Available</h5>
              </td>
              <td>
                <h5>Until</h5>
              </td>
            </tr>

            <tr>
              <td>{handleDateChange(quiz.due)}</td>
              <td>Everyone</td>
              <td>{handleDateChange(quiz.available)}</td>
              <td>{handleDateChange(quiz.until)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuizDetails;
