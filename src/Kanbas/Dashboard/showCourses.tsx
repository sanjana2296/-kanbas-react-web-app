import { Link } from "react-router-dom";
import * as client from "../Account/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import * as db from "../Database";
let account: any;
export default function ShowCourses({
  courses,
  enCourses,
}: {
  courses: any[];
  enCourses: any;
}) {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [enCourse, setEnCourse] = useState("");
  const fetchProfile = async () => {
    try {
      account = await client.profile();
      enCourses = account.courses;
      setEnCourse(enCourses);
      setRole(account.role);
    } catch (err: any) {}
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const enrollCourse = async (courseId: any) => {
    await client.enrollCourse(account.loginId, courseId);
    await fetchProfile();
  };
  return (
    <div id="wd-dashboard">
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
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

                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      enrollCourse(course.number);
                    }}
                    className="btn btn-danger float-end"
                    id="wd-delete-course-click"
                    disabled={enCourse.includes(course.number)}
                  >
                    {enCourse.includes(course.number)
                      ? "Already Enrolled"
                      : "Add Course"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
