import ModuleControlButtons from "./ModuleControlButtons";
import ModuleControlChecks from "./ModuleControlChecks";
import { BsGripVertical } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import "../../styles.css";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { useParams } from "react-router";
import * as db from "../../Database";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { deleteAssignment } from "./reducer";
import { useNavigate } from "react-router-dom";
export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();
  function getAssignmentsForCourse(cid: String) {
    return assignments.filter((assignment: any) => assignment.course === cid);
  }

  const navigate = useNavigate();

  const navigateToEditAssignment = () => {
    let id = new Date().getTime().toString();
    navigate(`${id}`);
  };

  const results = getAssignmentsForCourse(cid + "");
  return (
    <div id="wd-assignments" className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <div className="input-group w-50">
          <span className="input-group-text">
            <BsSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            id="wd-search-assignment"
          />
        </div>
        <div>
          <button className="btn btn-light me-2" id="wd-add-assignment-group">
            <FaPlus className="me-2" />
            Group
          </button>
          <button
            className="btn btn-danger"
            id="wd-add-assignment"
            onClick={navigateToEditAssignment}
          >
            <FaPlus className="me-2" />
            Assignment
          </button>
        </div>
      </div>
      <h3
        id="wd-assignments-title"
        className="wd-title p-3 ps-2 bg-light d-flex align-items-center"
      >
        <BsGripVertical className="me-2 fs-3" />
        ASSIGNMENTS
        <button
          className="btn bg-light ms-auto"
          style={{ borderRadius: "1rem", borderColor: "darkgray" }}
        >
          40% of Total
        </button>
        <div className="float-end">
          <BsPlus className="fs-4" />
          <IoEllipsisVertical className="fs-4" />
        </div>
        {/* <ModuleControlButtons /> */}
      </h3>
      <ul id="wd-assignment-list" className="list-group rounded-0">
        {results.map((assignment: any) => (
          <li
            key={assignment?._id}
            className="wd-assignment-list-item list-group-item p-0 fs-5 border-gray d-flex align-items-center"
          >
            <BsGripVertical className="me-2 fs-3" />
            <IoNewspaperSharp />
            <div className="p-3 flex-grow-1">
              <a
                className="wd-assignment-link"
                href={`#/Kanbas/Courses/${cid}/Assignments/${assignment?._id}`}
              >
                {assignment && assignment.title}
              </a>
              <br />
              <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
              <b>Not Available until</b> May 6 at 12:00am | <br />
              <b>Due</b> May 13 at 11:59pm | {assignment && assignment.points}{" "}
              pts
            </div>
            <ModuleControlChecks
              assignmentId={assignment._id}
              deleteAssignment={(assignmentId) => {
                dispatch(deleteAssignment(assignmentId));
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
