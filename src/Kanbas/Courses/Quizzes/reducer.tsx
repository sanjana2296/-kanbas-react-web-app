import { createSlice } from "@reduxjs/toolkit";

interface Quiz {
  _id?: string;
  title: string;
  instructions: string;
  quizType:
    | "Graded Quiz"
    | "Practice Quiz"
    | "Graded Survey"
    | "Ungraded Survey";
  points: number;
  assignmentGroup: "Quizzes" | "Exams" | "Assignments" | "Project";
  status: boolean;
  shuffleAnswers: boolean;
  timeLimit: string;
  multipleAttempts: boolean;
  noOfAttempts: string;
  showCorrectAnswers?: string;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  due: string;
  availableDate: string;
  untilDate: string;
  course: string;
}

const initialState = {
  isEditMode: false,
  quizzes: [] as {
    _id: string;
    title: string;
    description: string;
    points: string;
    due: string;
    available: string;
    availableUntil: string;
    course: string;
  }[],
  quiz: {
    title: "New Quiz",
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
  },
};

const quizzesState = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [
        { ...action.payload, _id: new Date().getTime().toString() },
        ...state.quizzes,
      ];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setEditMode,
  setQuizzes,
} = quizzesState.actions;

export default quizzesState.reducer;
