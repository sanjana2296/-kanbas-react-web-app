import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
export default function Modules() {
  return (
    <div>
      <div id="wd-modules">
        <ModulesControls />
        <br />
        <br />
        <br />
        <br />
        <ul id="wd-modules" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title bg-light p-3 ps-2 ">
              <BsGripVertical className="me-2 fs-3" />
              Week 1
              <ModuleControlButtons />
            </div>
            <ul className="custom-border-left wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">
                  LEARNING OBJECTIVES <LessonControlButtons />
                </span>
                <ul className="wd-content">
                  <li className="ps-5 wd-content-item">
                    Introduction to the course <LessonControlButtons />
                  </li>
                  <li className="ps-5 wd-content-item">
                    Learn what is Web Development <LessonControlButtons />
                  </li>
                </ul>
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">
                  Reading <LessonControlButtons />
                </span>
                <ul className="wd-content">
                  <li className="ps-5 wd-content-item">
                    Full Stack Developer Chapter -1 - Introduction{" "}
                    <LessonControlButtons />
                  </li>
                  <li className="ps-5 wd-content-item">
                    Full Stack Developer Chapter -1 - Creating US{" "}
                    <LessonControlButtons />
                  </li>
                </ul>
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">
                  Slides <LessonControlButtons />
                </span>
                <ul className="wd-content">
                  <li className="ps-5 wd-content-item">
                    Introduction to web Development <LessonControlButtons />
                  </li>
                  <li className="ps-5 wd-content-item">
                    Creating an HTTP server with Node.js{" "}
                    <LessonControlButtons />
                  </li>
                  <li className="ps-5 wd-content-item">
                    Creating a React Application <LessonControlButtons />
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-light">
              <BsGripVertical className="me-2 fs-3" />
              Week2 <ModuleControlButtons />
            </div>
            <ul className="custom-border-left wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">
                  LEARNING OBJECTIVES <LessonControlButtons />
                </span>
                <ul className="wd-content">
                  <li className="ps-5 wd-content-item">
                    Learn how to create User Interfaces with HTML{" "}
                    <LessonControlButtons />
                  </li>
                  <li className="ps-5 wd-content-item">
                    Deploy the assignment to Netlify <LessonControlButtons />
                  </li>
                </ul>
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">
                  Slides <LessonControlButtons />
                </span>
                <ul className="wd-content">
                  <li className="ps-5 wd-content-item">
                    Introduction to HTML and the DOM <LessonControlButtons />
                  </li>
                  <li className="ps-5 wd-content-item">
                    Formatting Web content with headings and{" "}
                    <LessonControlButtons />
                  </li>
                  <li className="ps-5 wd-content-item">
                    Formatting content with Lists and Tables{" "}
                    <LessonControlButtons />
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
