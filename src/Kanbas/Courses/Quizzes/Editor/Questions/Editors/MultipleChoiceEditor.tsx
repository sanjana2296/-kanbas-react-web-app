// MultipleChoiceEditor.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { KanbasState } from "../../../../../store";
import { selectQuestion, updateQuestion } from "../questionsReducer";
import * as client from "../../../client";
import ReactQuill from "react-quill";

function MultipleChoiceEditor() {
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
          dispatch(selectQuestion(fetchedQuestion));
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
        correctAnswer: question.options.indexOf(question.correctAnswer),
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

  const handleAddChoice = () => {
    dispatch(
      selectQuestion({ ...question, options: [...question.options, ""] })
    );
  };

  const handleRemoveChoice = (index: number) => {
    const updatedOptions = [...question.options];
    updatedOptions.splice(index, 1);
    dispatch(selectQuestion({ ...question, options: updatedOptions }));
  };

  return (
    <div className="p-4 mt-3">
      <h2>Multiple Choice Question Editor</h2>
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
        <label>Choices</label>
        {question.options?.map((choice: any, index: any) => {
          return (
            <div key={index} className="mb-2">
              <div className="input-group">
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => {
                    const updatedOptions = [...question.options];
                    updatedOptions[index] = e.target.value;
                    dispatch(
                      selectQuestion({ ...question, options: updatedOptions })
                    );
                  }}
                  className="form-control"
                />
                <button
                  onClick={() => handleRemoveChoice(index)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
        <button onClick={handleAddChoice} className="btn btn-primary">
          Add Choice
        </button>
      </div>
      <div className="mb-3">
        <label>Correct Answer</label>
        <select
          value={
            question?.options?.length
              ? question?.options[question?.correctAnswer]
              : ""
          }
          onChange={(e) =>
            dispatch(
              selectQuestion({ ...question, correctAnswer: e.target.value })
            )
          }
          className="form-control"
        >
          <option value="">Select correct answer</option>
          {question.options?.map((choice: any, index: any) => {
            return (
              <option key={index} value={choice.toString()}>
                {choice}
              </option>
            );
          })}
        </select>
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

export default MultipleChoiceEditor;
