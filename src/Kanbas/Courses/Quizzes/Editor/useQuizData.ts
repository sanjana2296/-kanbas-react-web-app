import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz, setQuiz } from "../reducer";
import { KanbasState } from "../../../store";
import * as client from "../client";

const useQuizData = (
  quizId: string | undefined,
  cid: string | undefined
) => {
  const dispatch = useDispatch();
  const quizzes = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const selectedQuiz = useSelector(
    (state: KanbasState) => state.quizzesReducer.quiz
  );

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const existingQuiz = quizzes.find((q) => q._id === quizId);
        if (existingQuiz) {
          dispatch(setQuiz(existingQuiz));
        } else {
          const fetchedQuiz = await client.getQuiz(quizId!);
          dispatch(setQuiz(fetchedQuiz));
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [dispatch, quizzes, quizId, cid]);

  const updateQuizData = async (updatedQuizData: any) => {
    try {
      const response = await client.updateQuiz(updatedQuizData);
      dispatch(updateQuiz(response));
      dispatch(setQuiz(response)); // Update the selected quiz in the Redux store
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  return { quiz: selectedQuiz, updateQuizData };
};
export default useQuizData;
