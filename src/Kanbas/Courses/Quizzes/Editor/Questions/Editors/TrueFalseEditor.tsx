// TrueFalseEditor
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { KanbasState } from "../../../../../store";
import { selectQuestion, updateQuestion } from "../questionsReducer";
import * as client from "../../../client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TrueFalseEditor() {
  const { cid, quizId, questionId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const fetchedQuestion = await client.getQuestion(quizId!, questionId!);
        if (fetchedQuestion) {
          const modifiedQueston = {
            ...fetchedQuestion,
            correctAnswer:
              fetchedQuestion.correctAnswer === 0 ? "True" : "False",
          };

          dispatch(selectQuestion(modifiedQueston));
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [dispatch, cid, quizId, questionId]);

  const handleSave = async () => {
    try {
      const moddedQuestion = {
        ...question,
        correctAnswer: question.correctAnswer === "True" ? 0 : 1,
      };

      const updatedQuestion = await client.updateQuestion(
        quizId!,
        moddedQuestion._id,
        moddedQuestion
      );
      dispatch(updateQuestion(updatedQuestion));
      navigate(`/Kanbas/Courses/${cid}/quizzes/${quizId}/editor/questions`);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/quizzes/${quizId}/editor/questions`);
  };

  return (
    <div className="p-4 mt-3">
      <h2>True/False Question Editor</h2>
      <div className="mb-3">
        <label>Title</label>
        <input
          value={question.title}
          onChange={(e) =>
            dispatch(selectQuestion({ ...question, title: e.target.value }))
          }
          className="form-control mb-2"
        />
      </div>
      <div className="mb-3">
        <label>Points</label>
        <input
          type="number"
          value={question.points}
          onChange={(e) =>
            dispatch(
              selectQuestion({ ...question, points: Number(e.target.value) })
            )
          }
          className="form-control mb-2"
        />
      </div>
      <div className="mb-3">
        <label>Question</label>
        <ReactQuill
          theme="snow"
          value={question.question}
          onChange={(text) => {
            if (text === question.question) return;
            dispatch(selectQuestion({ ...question, question: text }));
          }}
        />
      </div>
      <div className="mb-3">
        <label>Correct Answer</label>
        <div>
          {question?.options?.map((choice: any, index: any) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="correctAnswer"
                value={choice}
                checked={question.correctAnswer === choice}
                onChange={(e) =>
                  dispatch(
                    selectQuestion({
                      ...question,
                      correctAnswer: e.target.value,
                    })
                  )
                }
              />
              <label className="form-check-label">{choice}</label>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <button onClick={handleSave} className="btn btn-success float-end">
        Save
      </button>
      <button onClick={handleCancel} className="btn btn-danger float-end me-2">
        Cancel
      </button>
    </div>
  );
}

export default TrueFalseEditor;
