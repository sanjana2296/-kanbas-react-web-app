import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import * as client from "./client";
import { setQuiz } from "./reducer";
import { setQuestions } from "./Editor/Questions/questionsReducer";
import { FaLongArrowAltLeft } from "react-icons/fa";
import dayjs from "dayjs";

function QuizPreview() {
  const { cid, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      alert("Quiz submitted successfully!");
      navigate(`/Kanbas/Courses/${cid}/quizzes`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("An error occurred while submitting the quiz.");
    }
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
                    defaultChecked={question.correctAnswer === index}
                    onChange={() => handleAnswerChange(question._id, [choice])}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`choice-${question._id}-${index}`}
                  >
                    {String.fromCharCode(65 + index)}. {choice}
                    <span style={{ marginLeft: 15 }}>
                      {question.correctAnswer === index && (
                        <FaLongArrowAltLeft color="green" />
                      )}
                    </span>
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
                    defaultChecked={question.correctAnswer === index}
                    onChange={() => handleAnswerChange(question._id, [choice])}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`choice-${question._id}-${index}`}
                  >
                    {choice}

                    <span style={{ marginLeft: 15 }}>
                      {question.correctAnswer === index && (
                        <FaLongArrowAltLeft color="green" />
                      )}
                    </span>
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
                  value={question.blanks[index] || ""}
                  onChange={(e) => {
                    const updatedAnswer = [
                      ...((userAnswers[question._id] as string[]) ||
                        Array(question.blanks.length).fill("")),
                    ];
                    updatedAnswer[index] = e.target.value;
                    handleAnswerChange(question._id, updatedAnswer);
                  }}
                />
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
        <strong>Instructions:</strong> {quiz?.description}
      </p>

      <h3>Questions</h3>
      {questions.map((question) => (
        <div key={question._id} className="card mb-3">
          <div className="card-header">
            <h5 className="mb-0">{question.title}</h5>
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
      <button className="btn btn-danger" onClick={handleSubmitQuiz}>
        Submit Quiz
      </button>
    </div>
  );
}

export default QuizPreview;
