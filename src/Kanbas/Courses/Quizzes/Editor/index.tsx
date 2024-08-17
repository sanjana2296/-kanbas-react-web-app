import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { BiSolidCircleHalf } from "react-icons/bi";
import useQuizData from "./useQuizData";
import { setQuiz } from "../reducer";
import { FaRegEyeSlash } from "react-icons/fa6";
import * as client from "../client";
import { updateQuiz } from "../reducer";

function formatDateToLocalInputString(utcDateString: any) {
  const date = new Date(utcDateString);
  const pad = (num: any) => num.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function QuizEditor() {
  const { cid, quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quiz, updateQuizData } = useQuizData(quizId, cid);

  const handleSave = async () => {
    // await updateQuizData(quiz);
    const updatedQuiz = { ...quiz };

    client.updateQuiz(updatedQuiz).then((quiz) => {
      dispatch(updateQuiz(updatedQuiz));
    });
    navigate(`/Kanbas/Courses/${cid}/quizzes`);
  };
  const handleSaveAndPublish = async () => {
    // await updateQuizData({ ...quiz, isPublished: true });
    const updatedQuiz = { ...quiz, isPublished: true };

    client.updateQuiz(updatedQuiz).then((quiz) => {
      dispatch(updateQuiz(updatedQuiz));
    });
    navigate(`/Kanbas/Courses/${cid}/quizzes`);
  };

  return (
    <div className="w-100 px-5 mt-5">
      <div className="d-flex justify-content-end align-items-center me-3 mt-2 pb-3 border-2 border-bottom">
        <div className="d-flex justify-content-start align-items-center">
          Total points {quiz?.points} |
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
            className="nav-link active"
          >
            Details
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={`/Kanbas/Courses/${cid}/quizzes/${quizId}/editor/questions`}
            className="nav-link text-danger"
          >
            Questions
          </Link>
        </li>
      </ul>

      <br />
      <div className="mb-5">
        <div className="mb-3">
          <input
            className="form-control"
            placeholder={quiz?.title ? quiz?.title : "New Quiz"}
            value={quiz?.title}
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, title: e.target.value }))
            }
          />
          <br />
        </div>
        <div className="mb-3">
          <label htmlFor="assignment-name" className="form-label">
            <b>Quiz Instructions:</b>
          </label>

          <div className="d-flex flex-row justify-content-between me-3 mt-2 pb-2">
            <div className="d-flex border-2">
              <Link
                to={`#`}
                style={{ marginRight: "4%", textDecoration: "none" }}
                className="text-dark"
              >
                Edit
              </Link>

              <Link
                to={`#`}
                style={{ marginRight: "4%", textDecoration: "none" }}
                className="text-dark"
              >
                Insert
              </Link>

              <Link
                to={`#`}
                style={{ marginRight: "4%", textDecoration: "none" }}
                className="text-dark"
              >
                Format
              </Link>

              <Link
                to={`#`}
                style={{ marginRight: "4%", textDecoration: "none" }}
                className="text-dark"
              >
                Tools
              </Link>

              <Link
                to={`#`}
                style={{ textDecoration: "none" }}
                className="text-dark"
              >
                Table
              </Link>
            </div>

            <div className="justify-content-end">
              <BiSolidCircleHalf
                className="text-success"
                style={{ transform: "rotate(270deg)" }}
              />
              <span className="fw-bold text-success">100%</span>
            </div>
          </div>
          <textarea
            className="form-control w-500"
            id="quiz-instruction"
            placeholder={
              quiz?.description
                ? quiz?.description
                : "Enter Instructions for the quiz"
            }
            value={quiz?.description}
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, description: e.target.value }))
            }
          />
        </div>

        <div className="container-fluid">
          <div className="row my-3">
            <div className="col-2">
              <div className="d-flex w-100 justify-content-end">
                <label htmlFor="assignment-points" className="form-label">
                  Quiz Type
                </label>
              </div>
            </div>
            <div className="col-5">
              <select
                id="quiz-groups"
                className="form-select"
                value={quiz.type}
                onChange={(e) => {
                  dispatch(setQuiz({ ...quiz, type: e.target.value }));
                }}
              >
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Ungraded Quiz">Ungraded Quiz</option>
                <option value="Graded Exam">Graded Exam</option>
                <option value="Ungraded Exam">Ungraded Exam</option>
              </select>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-2">
              <div className="d-flex w-100 justify-content-end">
                <label htmlFor="assignment-groups" className="form-label">
                  Assignment Groups
                </label>
              </div>
            </div>
            <div className="col-5">
              <select
                id="assignment-groups"
                className="form-select"
                value={quiz.group}
                onChange={(e) => {
                  dispatch(setQuiz({ ...quiz, group: e.target.value }));
                }}
              >
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="One">One</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
              </select>
            </div>
          </div>
          <div className="col mt-3 mb-5">
            <div className="d-flex w-100 justify-content-start">
              <label htmlFor="quiz-options" className="form-label">
                <b>Options</b>
              </label>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                checked={quiz.isShuffleAnswers === "Yes"}
                onChange={(e) =>
                  dispatch(
                    setQuiz({
                      ...quiz,
                      isShuffleAnswers: e.target.checked ? "Yes" : "No",
                    })
                  )
                }
                className="form-check-input"
              />
              <label className="form-check-label">Shuffle Answers</label>
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                checked={quiz.isMultipleAttempts === "Yes"}
                onChange={(e) =>
                  dispatch(
                    setQuiz({
                      ...quiz,
                      isMultipleAttempts: e.target.checked ? "Yes" : "No",
                    })
                  )
                }
                className="form-check-input"
              />
              <label className="form-check-label">Multiple Attempts</label>
            </div>

            <div className="mb-3">
              <label>Show Correct Answers</label>
              <select
                value={quiz.isShowCorrectAnswers}
                onChange={(e) =>
                  dispatch(
                    setQuiz({ ...quiz, isShowCorrectAnswers: e.target.value })
                  )
                }
                className="form-control mb-2 w-50"
              >
                <option value="No">No</option>
                <option value="After Due Date">After Due Date</option>
                <option value="Immediately">Immediately</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Access Code</label>
              <input
                value={quiz.accessCode || ""}
                onChange={(e) =>
                  dispatch(setQuiz({ ...quiz, accessCode: e.target.value }))
                }
                className="form-control mb-2"
              />
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                checked={quiz.oneQuestionAtATime === "Yes"}
                onChange={(e) =>
                  dispatch(
                    setQuiz({
                      ...quiz,
                      oneQuestionAtATime: e.target.checked ? "Yes" : "No",
                    })
                  )
                }
                className="form-check-input"
              />
              <label className="form-check-label">One Question at a Time</label>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                checked={quiz.isWebCamRequired === "Yes"}
                onChange={(e) =>
                  dispatch(
                    setQuiz({
                      ...quiz,
                      isWebCamRequired: e.target.checked ? "Yes" : "No",
                    })
                  )
                }
                className="form-check-input"
              />
              <label className="form-check-label">Webcam Required</label>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                checked={quiz.isLockQuestionsAfterAnswered === "Yes"}
                onChange={(e) =>
                  dispatch(
                    setQuiz({
                      ...quiz,
                      isLockQuestionsAfterAnswered: e.target.checked
                        ? "Yes"
                        : "No",
                    })
                  )
                }
                className="form-check-input"
              />
              <label className="form-check-label">
                Lock Questions After Answering
              </label>
            </div>
            <div className="mb-3">
              <label>Time Limit</label>
              <input
                defaultValue={quiz.timeLimit}
                onChange={(e) =>
                  dispatch(setQuiz({ ...quiz, timeLimit: e.target.value }))
                }
                className="form-control mb-2 w-50"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <div className="d-flex w-100 justify-content-end">
                <label htmlFor="assignment-points" className="form-label">
                  Assign
                </label>
              </div>
            </div>
            <div className="col-5 border rounded-2">
              <div className="d-flex flex-column w-100">
                <div className="my-2">
                  <label className="fw-bold">Assign to</label>
                  <div className="d-flex flex-row p-2 align-items-center border border-top border-subtle rounded-2">
                    <div className="d-flex flex-row fw-light justify-content-center align-items-center rounded-1 fs-12 h-30">
                      <button type="button" className="btn btn-light m-0 pe-2">
                        Everyone <i className="fa fa-times" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-1 mb-3">
                  <label
                    htmlFor="assignment-due"
                    className="form-label fw-bold"
                  >
                    Due
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="assignment-due"
                    defaultValue="2021-06-12T19:30"
                    value={
                      quiz?.due
                        ? formatDateToLocalInputString(quiz.due)
                        : "2021-06-12T19:30"
                    }
                    onChange={(e) => {
                      const formattedDate = e.target.value;
                      dispatch(
                        setQuiz({ ...quiz, due: formattedDate + ":00.000Z" })
                      );
                    }}
                  />
                </div>
                <div className="row g-1 mb-3">
                  <div className="col-6">
                    <label
                      htmlFor="assignment-available"
                      className="form-label fw-bold"
                    >
                      Available from
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="assignment-available"
                      value={
                        quiz?.available
                          ? formatDateToLocalInputString(quiz.available)
                          : "2021-06-12T19:30"
                      }
                      onChange={(e) => {
                        const formattedDate = e.target.value;
                        dispatch(
                          setQuiz({
                            ...quiz,
                            available: formattedDate + ":00.000Z",
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <label
                      htmlFor="assignment-until"
                      className="form-label fw-bold"
                    >
                      Until
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="assignment-until"
                      value={
                        quiz?.until
                          ? formatDateToLocalInputString(quiz.until)
                          : "2021-06-12T19:30"
                      }
                      onChange={(e) => {
                        const formattedDate = e.target.value;
                        dispatch(
                          setQuiz({
                            ...quiz,
                            until: formattedDate + ":00.000Z",
                          })
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <button type="button" className="btn btn-light rounded-0">
                    {" "}
                    + Add{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center m-3 pt-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="notify-users"
          />
          <label className="form-check-label" htmlFor="notify-users">
            Notify users that this content has changed
          </label>
        </div>
        <div>
          <Link
            to={`/Kanbas/Courses/${cid}/Quizzes`}
            className="text-decoration-none btn btn-light me-1 rounded-0"
          >
            Cancel
          </Link>

          <Link
            to={`/Kanbas/Courses/${cid}/Quizzes`}
            type="button"
            className="btn btn-light me-1 rounded-0"
            onClick={handleSaveAndPublish}
          >
            Save and Publish
          </Link>

          <Link
            to={`/Kanbas/Courses/${cid}/Quizzes`}
            type="button"
            className="btn btn-danger rounded-0"
            onClick={handleSave}
          >
            Save
          </Link>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default QuizEditor;
