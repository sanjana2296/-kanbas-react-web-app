import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

export const findQuizzesForCourse = async (courseId: any) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const createQuiz = async (courseId: any, quiz: any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: any) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

export const getQuiz = async (id: string) => {
  const response = await axios.get(`${QUIZZES_API}/${id}`);
  return response.data;
};

export const createQuestion = async (
  courseId: string,
  quizId: string,
  question: any
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/question`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}/${questionId}`);
  return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/question`);
  return response.data;
};

export const getQuestion = async (quizId: string, questionId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/${questionId}`);
  return response.data;
};

export const updateQuestion = async (
  quizId: string,
  questionId: string,
  question: any
) => {
  const response = await axios.put(
    `${QUIZZES_API}/${quizId}/${questionId}`,
    question
  );
  return response.data;
};
