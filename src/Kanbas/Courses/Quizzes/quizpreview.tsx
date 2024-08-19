import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import * as client from "./client";
import * as userClient from "../../Account/client";
import { setQuiz } from "./reducer";
import { setQuestions } from "./Editor/Questions/questionsReducer";
import { FaLongArrowAltLeft } from "react-icons/fa";
import dayjs from "dayjs";
import GreenCheckmark from "./GreenCheckmark";

function QuizPreview() {
  const { cid, quizId } = useParams();
  const [message, setMessage] = useState("");
  const loginId = localStorage.getItem("loginId");
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quizAnswers, setQuizAnswers] = useState("");
  let newAnswers: { id: string; answer: string[] }[] = [];
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const questions = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );
  const [userAnswers, setUserAnswers] = useState<{
    [key: string]: string | string[];
  }>({});

  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      try {
        const fetchedQuiz = await client.getQuiz(quizId!);
        dispatch(setQuiz(fetchedQuiz));
        const fetchedQuestions = await client.findQuestionsForQuiz(quizId!);
        dispatch(setQuestions(fetchedQuestions));
      } catch (error) {
        console.error("Error fetching quiz and questions:", error);
      }
    };

    fetchQuizAndQuestions();
  }, [dispatch, quizId]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const isQuiz = await userClient.fetchQuiz(loginId, quizId);

        if (isQuiz && isQuiz.quiz) {
          setMessage("Quiz has been already submitted by the user");

          for (var i = 0; i < isQuiz.quiz.length; i++) {
            const quizItem = isQuiz.quiz[0];
            setQuizAnswers(quizItem);
            console.log("quizItem ::", JSON.stringify(quizItem));
            if (quizItem && typeof quizItem === "object") {
              const key = Object.keys(quizItem)[0];
              const value = quizItem[key];
              newAnswers.push({ id: key, answer: value });
              console.log(`Key: ${key}`);
              console.log(`Value: ${value}`);

              const answer = value as string;
              handleAnswerChange(key, answer);
            }
          }
        }
        console.log("newAnswers:", newAnswers);
        console.log("quizAnswers:", quizAnswers);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [loginId, quizId]);

  const handleAnswerChange = (
    questionId: string,
    answer: string | string[]
  ) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmitQuiz = async () => {
    try {
      const fetchedQuiz = await client.getQuiz(quizId!);

      const points = calculatePoints(questions, userAnswers);
      console.log("userAnswers:", userAnswers);
      console.log("calculated points:", points);
      const req = {
        id: quizId,
        points: points,
        quiz: userAnswers,
      };
      const loginId = localStorage.getItem("loginId");
      const quiz = await userClient.submitQuiz(loginId, req);
      alert("Quiz submitted successfully!");
      navigate(`/Kanbas/Courses/${cid}/quizzes`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("An error occurred while submitting the quiz.");
    }
  };

  type Question = {
    _id: string;
    type: string;
    options: string[];
    blanks: string[];
    correctAnswer: number;
    points: number;
  };
  const calculatePoints = (
    questions: Question[],
    userAnswers: Record<string, string | string[]>
  ): number => {
    let totalPoints = 0;
    questions.forEach((question) => {
      const userAnswer = userAnswers[question._id];

      if (
        question.type === "multiple_choice" ||
        question.type === "true_false"
      ) {
        const correctChoice = question.options[question.correctAnswer];
        if (userAnswer == correctChoice) {
          totalPoints += question.points;
          console.log("totalPoints:", totalPoints);
        }
      } else if (question.type === "fill_in_the_blanks") {
        const correctAnswers = question.blanks;
        const userAnswersArray = userAnswer as string[];
        if (
          correctAnswers.length === userAnswersArray.length &&
          correctAnswers.every((ans, index) => ans === userAnswersArray[index])
        ) {
          totalPoints += question.points;
        }
      }
    });

    return totalPoints;
  };
  const renderQuestionContent = (question: any) => {
    switch (question.type) {
      case "multiple_choice":
        return (
          <ul className="list-group">
            {question.options?.map((choice: string, index: number) => (
              <li key={index} className="list-group-item">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${question._id}`}
                    id={`choice-${question._id}-${index}`}
                    value={choice}
                    checked={
                      quizAnswers
                        ? quizAnswers[question._id]?.[0] === choice
                        : userAnswers[question._id]?.[0] === choice ||
                          (userAnswers[question._id] === undefined &&
                            question.correctAnswer === choice)
                    }
                    // defaultChecked={question.correctAnswer === index}
                    disabled={message ? true : false}
                    onChange={() => handleAnswerChange(question._id, [choice])}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`choice-${question._id}-${index}`}
                  >
                    {String.fromCharCode(65 + index)}. {choice}
                    {role == "STUDENT" && message && (
                      <span style={{ marginLeft: 15 }}>
                        {question.correctAnswer === index && (
                          <FaLongArrowAltLeft color="green" />
                        )}
                      </span>
                    )}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        );
      case "true_false":
        return (
          <ul className="list-group">
            {question.options?.map((choice: string, index: number) => (
              <li key={index} className="list-group-item">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${question._id}`}
                    id={`choice-${question._id}-${index}`}
                    value={choice}
                    checked={
                      quizAnswers
                        ? quizAnswers[question._id]?.[0] === choice
                        : userAnswers[question._id]?.[0] === choice ||
                          (userAnswers[question._id] === undefined &&
                            question.correctAnswer === choice)
                    }
                    disabled={message ? true : false}
                    // defaultChecked={question.correctAnswer === index}
                    onChange={() => handleAnswerChange(question._id, [choice])}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`choice-${question._id}-${index}`}
                  >
                    {choice}
                    {role == "STUDENT" && message && (
                      <span style={{ marginLeft: 15 }}>
                        {question.correctAnswer === index && (
                          <FaLongArrowAltLeft color="green" />
                        )}
                      </span>
                    )}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        );
      case "fill_in_the_blanks":
        return (
          <div>
            {question.options?.map((blank: any, index: number) => (
              <div key={index} className="mb-3">
                <label htmlFor={`blank-${index}`} className="form-label">
                  Blank {index + 1}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`blank-${question._id}-${index}`}
                  placeholder="Enter your answer"
                  disabled={message ? true : false}
                  // value={question.blanks[index] || ""}
                  value={
                    quizAnswers
                      ? ((quizAnswers[question._id] as unknown as string[]) ||
                          [])[index] || ""
                      : ((userAnswers[question._id] as string[]) || [])[
                          index
                        ] || ""
                  }
                  onChange={(e) => {
                    const updatedAnswer = [
                      ...((userAnswers[question._id] as string[]) ||
                        Array(question.blanks.length).fill("")),
                    ];
                    updatedAnswer[index] = e.target.value;
                    handleAnswerChange(question._id, updatedAnswer);
                  }}
                />{" "}
                {role == "STUDENT" && message && (
                  <span style={{ marginLeft: 15, color: "green" }}>
                    Correct Answer : {question.blanks[index]}
                  </span>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-100 px-5 mt-5">
      <h2>{quiz?.title}</h2>
      <p>
        <strong>Due:</strong> {dayjs(quiz?.due).format("MMMM D, YYYY")} at{" "}
        {dayjs(quiz?.due).format("h:mm A")}
      </p>
      <p>
        <strong>Instructions:</strong> {quiz?.description} <br />
        <strong>Total points:</strong> {quiz?.points}
      </p>

      <h3>Questions</h3>
      {questions.map((question) => (
        <div key={question._id} className="card mb-3">
          <div className="card-header">
            <h5 className="mb-0">
              {question.title}{" "}
              {role == "STUDENT" &&
                message &&
                question.type != "fill_in_the_blanks" &&
                quizAnswers[question._id]?.[0] ==
                  question.options[question.correctAnswer] && (
                  <span style={{ color: "green" }}>
                    <GreenCheckmark />
                  </span>
                )}
              {role == "STUDENT" &&
                message &&
                question.type != "fill_in_the_blanks" &&
                quizAnswers[question._id]?.[0] !=
                  question.options[question.correctAnswer] && (
                  <span style={{ color: "red" }}> X</span>
                )}
              {role == "STUDENT" &&
                message &&
                question.type == "fill_in_the_blanks" &&
                question.blanks.every(
                  (ans: any, index: any) =>
                    ans === quizAnswers[question._id]?.[index]
                ) && (
                  <span style={{ color: "green" }}>
                    <GreenCheckmark />
                  </span>
                )}
              {role == "STUDENT" &&
                message &&
                question.type == "fill_in_the_blanks" &&
                question.blanks.every(
                  (ans: any, index: any) =>
                    ans != quizAnswers[question._id]?.[index]
                ) && <span style={{ color: "red" }}> X</span>}
            </h5>
            <span>Points: {question.points}</span>
          </div>
          <div className="card-body">
            <p
              dangerouslySetInnerHTML={{
                __html: question.question,
              }}
            />
            {renderQuestionContent(question)}
          </div>
        </div>
      ))}
      {!message && (
        <button className="btn btn-danger" onClick={handleSubmitQuiz}>
          Submit Quiz
        </button>
      )}
    </div>
  );
}

export default QuizPreview;
