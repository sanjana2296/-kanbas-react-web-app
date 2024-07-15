import ModulesControls from "./ModulesControls"
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from 'react-icons/bs';
import GreenCheckmark from './GreenCheckmark'
export default function Modules() {
    return (
      <div>
        <div id="wd-modules">
        <ModulesControls /><br /><br /><br /><br />
        <ul id="wd-modules" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray" > 
            <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3" />Week 1
            <ModuleControlButtons /></div>
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
                <LessonControlButtons />
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">Reading</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Full Stack Developer Chapter -1 - Introduction</li>
                  <li className="wd-content-item">Full Stack Developer Chapter -1 - Creating US</li>
                </ul>
                <LessonControlButtons />
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">Slides</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to web Development</li>
                  <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                  <li className="wd-content-item">Creating a React Application</li>
                </ul>
                <LessonControlButtons />
              </li>
            </ul>
          </li>
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3" />Week2 <ModuleControlButtons /></div>
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Learn how to create User Interfaces with HTML</li>
                  <li className="wd-content-item">Deploy the assignment to Netlify</li>
                </ul>
                <LessonControlButtons />
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">Slides</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to HTML and the DOM</li>
                  <li className="wd-content-item">Formatting Web content with headings and</li>
                  <li className="wd-content-item">Formatting content with Lists and Tables</li>
                </ul>
                <LessonControlButtons />
              </li>
            </ul>
          </li>
        </ul>
      </div>
      </div>
  );}
  