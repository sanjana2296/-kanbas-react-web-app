import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaCaretDown,
  FaPlus,
  FaEdit,
  FaBan,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import {
  deleteQuiz,
  setQuiz,
  setEditMode,
  setQuizzes,
  addQuiz,
  updateQuiz,
} from "./reducer";
import { Dropdown } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";
import * as client from "./client";
let quizMain: any;
import "bootstrap/dist/js/bootstrap.bundle.min";
function Quizzes() {
  const { cid } = useParams();
  const role = localStorage.getItem("role");
  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );

  const fetchQuiz = async () => {
    try {
      quizMain = await client.findQuizzesForCourse(cid);
      dispatch(setQuizzes(quizMain));
    } catch (err: any) {}
  };
  useEffect(() => {
    fetchQuiz();
  }, []);

  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredQuizzes = quizList.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    client
      .findQuizzesForCourse(cid)
      .then((quizzes) => dispatch(setQuizzes(quizzes)));
  }, [dispatch, cid]);

  const handleAddQuiz = () => {
    let quizStruc = {
      title: "New Quiz Title",
      description: "New Description",
      points: "0",
      type: "Graded Quiz",
      group: "Quizzes",
      isShuffleAnswers: "Yes",
      timeLimit: "20",
      isMultipleAttempts: "No",
      isShowCorrectAnswers: "No",
      accessCode: "1234",
      oneQuestionAtATime: "Yes",
      isWebCamRequired: "No",
      isLockQuestionsAfterAnswered: "No",
      due: "2024-05-25 23:59",
      available: "2024-04-30 00:00",
      until: "2024-05-25 23:59",
      course: "",
      isPublished: false,
      noOfQuestions: "0",
    };
    const newQuiz = { ...quizStruc, course: cid, isPublished: false };
    client.createQuiz(cid, newQuiz).then((quiz) => {
      dispatch(addQuiz(quiz));
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/Details`);
    });
  };

  const handleDeleteQuiz = (quizId: string) => {
    client.deleteQuiz(quizId).then(() => {
      dispatch(deleteQuiz(quizId));
    });
  };

  const publishQuiz = (quiz: any) => {
    const updatedQuiz = { ...quiz, isPublished: !quiz.isPublished };
    client.updateQuiz(updatedQuiz).then(() => {
      dispatch(updateQuiz(updatedQuiz));
    });
  };

  const currentDate = new Date();

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

  const getQuizStatus = (quiz: any) => {
    var status = quiz.until;

    if (currentDate < new Date(quiz.available)) {
      status = "Not available until " + handleDateChange(quiz.available);
    } else if (
      currentDate > new Date(quiz.available) &&
      currentDate < new Date(quiz.until)
    ) {
      status = "Available";
    } else if (currentDate > new Date(quiz.until)) {
      status = "Closed";
    }

    return status;
  };

  return (
    <div className="w-100 px-5 mt-5">
      {/* Buttons */}
      <div className="d-flex">
        {/* TODO : Enable search for quizzes */}
        <div className="flex-fill justify-content-start">
          <input
            type="search"
            className="form-control w-25"
            placeholder="Search for Quiz"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="d-flex justify-content-end">
          {role != "STUDENT" && (
            <button
              className="btn btn-danger btn-sm btn-spacing me-2"
              style={{ paddingTop: 6 }}
              onClick={() => {
                handleAddQuiz();
                dispatch(setEditMode(false));
              }}
            >
              <FaPlus
                className="chk-icon-spacing"
                style={{ fontSize: "0.8em" }}
              />
              <span style={{ marginTop: 6 }}>Quiz</span>
            </button>
          )}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm btn-spacing btn-color"
          >
            <FaEllipsisV />
          </button>
        </div>
      </div>

      <hr />

      {/* Display message if quizList is empty */}
      {quizList.length === 0 && (
        <div className="alert alert-info" role="alert">
          No quizzes found. Click the Add Quiz(+ Quiz) button to create a new
          one.
        </div>
      )}

      {/* Display quizzes */}
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          {/* Buttons before quiz title */}
          <div>
            <FaCaretDown className="caret-down-icon" />
            <span className="txt-title">Quizzes</span>
          </div>

          {/* Quizzes list */}
          <ul className="list-group">
            {quizList
              .filter((quiz) => quiz.course === cid)
              .map((quiz, index) => (
                <li key={index} className="list-group-item">
                  {/* Rocket icons */}
                  <IoRocketOutline className="text-success me-2" />

                  {/* Quiz title */}
                  <Link
                    className="txt-title link-style"
                    to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/Details`}
                    onClick={(event) => {
                      dispatch(setQuiz(quiz));
                      dispatch(setEditMode(true));
                    }}
                  >
                    {quiz.title}
                  </Link>

                  {/* Check icon, and context menu options ellipsis */}
                  <span className="float-end">
                    <span
                      onClick={() => {
                        {
                          role != "STUDENT" && publishQuiz(quiz);
                        }
                      }}
                    >
                      {quiz.isPublished ? (
                        <FaCheckCircle
                          className="text-success"
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <FaBan
                          className="text-danger"
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </span>
                    {role != "STUDENT" && (
                      <Dropdown>
                        <Dropdown.Toggle
                          as={FaEllipsisV}
                          style={{
                            cursor: "pointer",
                          }}
                          id="dropdown-basic"
                        />

                        <Dropdown.Menu className="dropdown-menu-right">
                          <Dropdown.Item
                            onClick={() => {
                              navigate(
                                `/Kanbas/Courses/${cid}/quizzes/${quiz._id}/Editor`
                              );
                            }}
                            className="dropdown-item p-2"
                          >
                            <BsPencilSquare className="dropdown-icon me-2" />
                            Edit
                          </Dropdown.Item>

                          <div className="dropdown-divider"></div>

                          <Dropdown.Item
                            className="dropdown-item p-2"
                            onClick={() => handleDeleteQuiz(quiz._id)}
                          >
                            <MdDelete className="dropdown-icon me-2" />
                            Delete
                          </Dropdown.Item>

                          <div className="dropdown-divider"></div>

                          <Dropdown.Item
                            className="dropdown-item p-2"
                            style={{ marginBottom: "1em" }}
                            onClick={() => {
                              publishQuiz(quiz);
                            }}
                          >
                            {!quiz.isPublished ? (
                              <FaCheckCircle className="dropdown-icon text-success me-2" />
                            ) : (
                              <FaBan className="dropdown-icon text-danger me-2" />
                            )}
                            {!quiz.isPublished ? "Publish" : "Unpublish"}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </span>

                  {/* Subtext - quiz details */}
                  <div className="txt-subtitle-quiz">
                    <span>{quiz.status}</span>
                    <br />
                    <span>
                      {/* If current date is after available date, status = Closed, if current date is between Available Date and Available Until Date, status = Available,
                                            else if current date is before available date, status = Not available until  */}
                      {getQuizStatus(quiz)} |
                      <span className="txt-bold"> Due </span>
                      {handleDateChange(quiz.due)} | {quiz.points} pts |{" "}
                      {quiz.noOfQuestions} Questions
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Quizzes;
