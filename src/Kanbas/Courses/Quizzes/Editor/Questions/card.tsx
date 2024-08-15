import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

interface QuestionCardProps {
  question: {
    _id?: string;
    title: string;
    points: number;
    type: string;
    question: string;
    options: string[];
    blanks: string[];
    correctAnswer: number;
  };
  handleDelete: (questionId: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  handleDelete,
}) => {
  const { cid, quizId } = useParams();
  const navigate = useNavigate();

  function handleEditClick() {
    navigate(getEditorPath());
  }

  const getEditorPath = () => {
    switch (question.type) {
      case "multiple_choice":
        return `/Kanbas/Courses/${cid}/quizzes/${quizId}/editor/questions/${question._id}/mcq`;
      case "true_false":
        return `/Kanbas/Courses/${cid}/quizzes/${quizId}/editor/questions/${question._id}/true-false`;
      case "fill_in_the_blanks":
        return `/Kanbas/Courses/${cid}/quizzes/${quizId}/editor/questions/${question._id}/fill-in-the-blanks`;
      default:
        return "";
    }
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case "multiple_choice":
        return (
          <ul className="list-group">
            {question.options.map((choice, index) => (
              <li key={index} className="list-group-item">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    defaultChecked={question.correctAnswer === index}
                    name={`question-${question._id}`}
                    id={`choice-${index}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`choice-${index}`}
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
            {question.options.map((choice, index) => (
              <li key={index} className="list-group-item">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    defaultChecked={question.correctAnswer === index}
                    name={`question-${question._id}`}
                    id={`choice-${index}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`choice-${index}`}
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
            {question.options.map((blank, index) => (
              <div key={index} className="mb-3">
                <label htmlFor={`blank-${index}`} className="form-label">
                  Blank {index + 1}
                </label>
                <input
                  disabled
                  type="text"
                  defaultValue={question.blanks[index]}
                  className="form-control"
                  id={`blank-${index}`}
                  placeholder="Enter your answer"
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
    <div className="card mb-3">
      <div className="card-header">
        <h5 className="mb-0">{question.title}</h5>
        <span>Points: {question.points}</span>
        <button
          className="btn btn-danger ms-2 float-end"
          onClick={() => handleDelete(question._id!)}
        >
          Delete
        </button>
        <button
          onClick={handleEditClick}
          className="btn btn-primary float-end ms-1"
        >
          Edit
        </button>
      </div>
      <div className="card-body">
        <p dangerouslySetInnerHTML={{ __html: question.question }} />
        {renderQuestionContent()}
      </div>
    </div>
  );
};

export default QuestionCard;
