import { IoSettingsSharp } from "react-icons/io5";
import { FaFileExport } from "react-icons/fa6";
import { TbFileArrowLeft } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { useParams } from "react-router-dom";
import * as db from "../../Database";

export default function Grades() {
  const { cid } = useParams();
  function getEnrollmentsForCourse(courseId: any) {
    return db.enrollments.filter(
      (enrollment) => enrollment.course === courseId
    );
  }
  function getCourseDetails(courseId: any) {
    return db.courses.find((course) => course._id === courseId);
  }
  const enrollments = getEnrollmentsForCourse(cid);
  const courseDetails = getCourseDetails(cid);

  const assignmentsList = db.assignments.filter(
    (assignment) => assignment.course === cid
  );

  function getNameForUserId(uid: any) {
    const user = db.users.find((user) => user._id === uid);
    return user ? `${user.firstName} ${user.lastName}` : "Unknown";
  }

  function getGradeForAssignment(assignmentId: any, studentId: any) {
    const grade = db.grades.find(
      (grade) =>
        grade.assignment === assignmentId && grade.student === studentId
    );
    return grade ? `${grade.grade}%` : "Not Graded";
  }

  return (
    <div>
      <h2>Grades for {courseDetails ? courseDetails.name : "Course"}</h2>
      <p>
        {courseDetails
          ? courseDetails.description
          : "Course description not available."}
      </p>
      <div className="d-flex justify-content-end p-3">
        <button className="btn btn-light me-2 px-3 py-2 text-dark">
          <FaFileExport /> Import
        </button>
        <button className="btn btn-light me-2 px-3 py-2 text-dark">
          <TbFileArrowLeft /> Export
        </button>
        <button className="btn btn-light px-3 py-2 text-dark">
          <IoSettingsSharp />
        </button>
      </div>
      <div className="row">
        <div className="col-6">
          <h3>Student Names</h3>
          <div className="input-group">
            <span className="input-group-text">
              <BsSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search for Students"
              id="wd-search-students"
            />
          </div>
          <br />
          <button className="btn btn-light me-2 px-3 py-2 text-dark">
            <CiFilter /> Apply Filters
          </button>
        </div>
        <div className="col-6">
          <h3>Assignment Names</h3>
          <div className="input-group">
            <span className="input-group-text">
              <BsSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search for Assignments"
              id="wd-search-assignments"
            />
          </div>
        </div>
      </div>
      <br />
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student Name</th>
              {assignmentsList.map((assignment) => (
                <th key={assignment._id}>{assignment.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment, enrollmentIndex) => (
              <tr key={enrollmentIndex}>
                <td style={{ color: "red" }}>
                  {getNameForUserId(enrollment.user)}
                </td>
                {assignmentsList.map((assignment) => (
                  <td key={assignment._id}>
                    {getGradeForAssignment(assignment._id, enrollment.user)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
