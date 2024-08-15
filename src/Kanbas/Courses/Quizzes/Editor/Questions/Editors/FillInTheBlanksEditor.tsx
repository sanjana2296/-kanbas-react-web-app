// Fill in Blank editor
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { KanbasState } from "../../../../../store";
import { selectQuestion, updateQuestion } from "../questionsReducer";
import * as client from "../../../client";
import ReactQuill from "react-quill";

function FillInTheBlankEditor() {
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
      const updatedQuestion = await client.updateQuestion(
        quizId!,
        question._id,
        question
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

  const handleCorrectAnswerChange = (index: number, value: string) => {
    const updatedBlanks = [...question.blanks];
    updatedBlanks[index] = value;
    dispatch(selectQuestion({ ...question, blanks: updatedBlanks }));
  };

  const handleAddBlank = () => {
    const updatedBlanks = [...question.blanks];
    updatedBlanks.push("");
    dispatch(
      selectQuestion({
        ...question,
        blanks: updatedBlanks,
        options: [...question.options, `Choice ${updatedBlanks.length}`],
      })
    );
  };

  const handleRemoveBlank = (index: number) => {
    const updatedBlanks = [...question.blanks];
    updatedBlanks.splice(index, 1);
    const updatedOptions = [...question.options];
    updatedOptions.splice(index, 1);
    dispatch(
      selectQuestion({
        ...question,
        blanks: updatedBlanks,
        options: updatedOptions,
      })
    );
  };

  return (
    <div className="p-4 mt-3">
      <h2>Fill in the Blank Question Editor</h2>
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
        <label>
          Question{" "}
          <strong>(should have {question.options?.length} blanks</strong>)
        </label>
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
        <label>Correct Answers</label>
        {question.options?.map((_: any, index: any) => (
          <div key={index} className="mb-2">
            <label>Blank {index + 1}</label>
            <div className="input-group">
              <input
                type="text"
                value={question.blanks[index] || ""}
                onChange={(e) =>
                  handleCorrectAnswerChange(index, e.target.value)
                }
                className="form-control"
              />
              <button
                onClick={() => handleRemoveBlank(index)}
                className="btn btn-danger"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button onClick={handleAddBlank} className="btn btn-primary">
          Add Blank
        </button>
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

export default FillInTheBlankEditor;
