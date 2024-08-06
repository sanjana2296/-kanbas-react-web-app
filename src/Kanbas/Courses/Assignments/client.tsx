import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const ASSIGNMNET_API_FETCH = `${REMOTE_SERVER}/api/assignment`;
export const fetchAllAssignments = async () => {
    const { data } = await axios.get(ASSIGNMENTS_API);
    return data;
  };
  export const createAssignment = async (assignment: any) => {
    const response = await axios.post(ASSIGNMENTS_API, assignment);
    return response.data;
  };
  
  export const deleteAssignment = async (id: string) => {
    const response = await axios.delete(`${ASSIGNMENTS_API}/${id}`);
    return response.data;
  };
  export const updateAssignment = async (assignment: any) => {
    const response = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return response.data;
  };

  export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axios.get(`${ASSIGNMENTS_API}/${courseId}`);
    return response.data;
  };

  
  export const findAssignmentById = async (aId: string) => {
    const response = await axios.get(`${ASSIGNMNET_API_FETCH}/${aId}`);
    return response.data;
  };