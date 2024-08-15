import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa";
import Grades from "./Grades";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import QuizEditor from "./Quizzes/Editor";
import QuizPreview from "./Quizzes/quizpreview";
import Questions from "./Quizzes/Editor/Questions";
import TrueFalseEditor from "./Quizzes/Editor/Questions/Editors/TrueFalseEditor";
import FillInTheBlankEditor from "./Quizzes/Editor/Questions/Editors/FillInTheBlanksEditor";
import MultipleChoiceEditor from "./Quizzes/Editor/Questions/Editors/MultipleChoiceEditor";
export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course.number === cid);
  const { pathname } = useLocation();
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="People/:uid" element={<PeopleTable />} />
            <Route path="Grades" element={<Grades />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:quizId/Details" element={<QuizDetails />} />
            <Route path="Quizzes/:quizId/editor" element={<QuizEditor />} />
            <Route
              path="Quizzes/:quizId/editor/questions"
              element={<Questions />}
            />
            <Route
              path="Quizzes/:quizId/editor/questions/:questionId/mcq"
              element={<MultipleChoiceEditor />}
            />
            <Route
              path="Quizzes/:quizId/editor/questions/:questionId/true-false"
              element={<TrueFalseEditor />}
            />
            <Route
              path="Quizzes/:quizId/editor/questions/:questionId/fill-in-the-blanks"
              element={<FillInTheBlankEditor />}
            />
            <Route path="Quizzes/:quizId/Preview" element={<QuizPreview />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
