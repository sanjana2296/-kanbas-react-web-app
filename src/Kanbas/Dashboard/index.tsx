import { Link } from "react-router-dom";
import ShowCourses from "./showCourses";
import * as client from "../Account/client";
import { useEffect } from "react";
import React, { useState } from "react";
import * as db from "../Database";
let enrolledCourses: any;
let enCourses: any;
export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const [role, setRole] = useState("");
  const [showCourse, setShowCourse] = useState("");
  const [enCourse, setEnCourse] = useState("");
  const fetchProfile = async () => {
    try {
      setShowCourse("");
      const account = await client.profile();
      console.log("acoount", account);
      setRole(account.role);
      enCourses = account.courses;
      console.log("enrolledCourses", enCourses);

      enrolledCourses = courses.filter((course) =>
        enCourses.includes(course.number)
      );
      setEnCourse(enrolledCourses);
      setCourse({ ...course, enrolledCourses });
    } catch (err: any) {}
  };
  const removeCourse = async (courseId: any) => {
    const account = await client.profile();
    console.log("acoount", account);
    await client.removeCourse(account.loginId, courseId);
    await fetchProfile();
  };
  useEffect(() => {
    setShowCourse("");
    fetchProfile();
  }, []);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {role !== "STUDENT" && (
        <>
          {" "}
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              {" "}
              Add{" "}
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </>
      )}
      {role !== "STUDENT" && <hr />}
      <h2 id="wd-dashboard-published">
        {role !== "STUDENT"
          ? `Published Courses (${courses.length})`
          : !showCourse
          ? `Enrolled Courses (${enCourse?.length || 0})`
          : null}
      </h2>{" "}
      {!showCourse && <hr />}
      {showCourse && (
        <button
          id="wd-show-course-click"
          onClick={(event) => {
            event.preventDefault();
            setShowCourse("");
            fetchProfile();
          }}
          className="btn btn-warning me-2"
        >
          Back to enrolled courses
        </button>
      )}
      {role == "STUDENT" && (
        <button
          id="wd-show-course-click"
          onClick={(event) => {
            event.preventDefault();
            setShowCourse("true");
          }}
          className="btn btn-warning me-2 float-end"
        >
          Show Courses to enroll
        </button>
      )}
      {showCourse && <ShowCourses courses={courses} enCourses={enCourses} />}
      {role !== "STUDENT" && (
        <div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {courses.map((course: any) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <Link
                  to={`/Kanbas/Courses/${course.number}/Home`}
                  className="text-decoration-none"
                >
                  <div className="card rounded-3 overflow-hidden">
                    <img src="images/reactjs.jpg" height="{160}" />
                    <div className="card-body">
                      <span
                        className="wd-dashboard-course-link"
                        style={{
                          textDecoration: "none",
                          color: "navy",
                          fontWeight: "bold",
                        }}
                      >
                        {course.name}
                      </span>
                      <p
                        className="wd-dashboard-course-title card-text"
                        style={{ maxHeight: 53, overflow: "hidden" }}
                      >
                        {course.description}
                      </p>
                      <Link
                        to={`/Kanbas/Courses/${course.number}/Home`}
                        className="btn btn-primary"
                      >
                        Go
                      </Link>

                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course.cid);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
                      <button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      {role == "STUDENT" && !showCourse && (
        <div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {enrolledCourses?.map((course: any) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <Link
                  to={`/Kanbas/Courses/${course.number}/Home`}
                  className="text-decoration-none"
                >
                  <div className="card rounded-3 overflow-hidden">
                    <img src="images/reactjs.jpg" height="{160}" />
                    <div className="card-body">
                      <span
                        className="wd-dashboard-course-link"
                        style={{
                          textDecoration: "none",
                          color: "navy",
                          fontWeight: "bold",
                        }}
                      >
                        {course.name}
                      </span>
                      <p
                        className="wd-dashboard-course-title card-text"
                        style={{ maxHeight: 53, overflow: "hidden" }}
                      >
                        {course.description}
                      </p>
                      <Link
                        to={`/Kanbas/Courses/${course.number}/Home`}
                        className="btn btn-primary"
                      >
                        Go
                      </Link>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          removeCourse(course.number);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Unenroll
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
