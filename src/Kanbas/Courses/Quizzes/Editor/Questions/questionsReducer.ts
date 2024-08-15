import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionsState {
  questions: any[];
  question: any;
}

const initialState: QuestionsState = {
  questions: [],
  question: {
    title: "",
    points: 0,
    questionType: "Multiple Choice",
    question: "",
    choices: [],
    correctAnswer: [],
    blanks: [],
    userAnswer: "",
    course: "",
    quiz: "",
  },
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<any[]>) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action: PayloadAction<any>) => {
      state.questions = [action.payload, ...state.questions];
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter(
        (question) => question._id !== action.payload
      );
    },
    updateQuestion: (state, action: PayloadAction<any>) => {
      state.questions = state.questions.map((question) => {
        if (question._id === action.payload._id) {
          return action.payload;
        } else {
          return question;
        }
      });
    },
    selectQuestion: (state, action: PayloadAction<any>) => {
      state.question = action.payload;
    },
    resetQuestions: (state) => {
      state.questions = [];
      state.question = initialState.question;
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  selectQuestion,
  resetQuestions,
} = questionsSlice.actions;

export const selectTotalPoints = (state: {
  questionsReducer: QuestionsState;
}) => {
  return state.questionsReducer.questions.reduce(
    (total, question) => total + question.points,
    0
  );
};

export default questionsSlice.reducer;
