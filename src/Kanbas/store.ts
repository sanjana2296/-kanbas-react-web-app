import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";
import { Assignment, Module } from '../types';
import quizzesReducer from "./Courses/Quizzes/reducer";
import questionsReducer from './Courses/Quizzes/Editor/Questions/questionsReducer';

export interface KanbasState {
  modulesReducer: {
    modules: Module[];
    module: Module;
  };

  assignmentsReducer: {
    assignments: Assignment[];
    assignment: Assignment;
  };

  quizzesReducer: {
    quizzes: any[];
    quiz: any;
    isEditMode: boolean;
  };

  questionsReducer: {
    questions: any[];
    question: any;
  };
}


const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentReducer,
    accountReducer,
    quizzesReducer,
    questionsReducer
  },
});
export default store;