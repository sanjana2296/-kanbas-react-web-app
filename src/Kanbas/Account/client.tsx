import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const enrollCourse = async (user: any, course: any) => {
  const response = await axios.post(`${USERS_API}/${user}/addCourse/${course}`);
  return response.data;
};

export const submitQuiz = async (user: any, quiz: any) => {
  const response = await axios.post(`${USERS_API}/${user}/submitQuiz`, quiz);
  return response.data;
};

export const fetchQuiz = async (user: any, quizId: any) => {
  const response = await axios.get(`${USERS_API}/${user}/fetchQuiz/${quizId}`);
  return response.data;
};

export const removeCourse = async (user: any, course: any) => {
  const response = await axios.post(
    `${USERS_API}/${user}/removeCourse/${course}`
  );
  return response.data;
};

const axiosWithCredentials = axios.create({ withCredentials: true });
export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};
