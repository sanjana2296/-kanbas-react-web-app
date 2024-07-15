import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { IoChevronBackCircle } from "react-icons/io5";
export default function KanbasNavigation() {
    return (
      <div id="wd-kanbas-navigation" className="list-group rounded-0 d-flex flex-column justify-content-center align-items-center">
      <a id="wd-neu-link" target="_blank" href="https://www.northeastern.edu/" className="list-group-item bg-black border-0"><img src="images/NEU.png" width="75px" /></a>
      <a id="wd-account-link" href="#/Kanbas/Account" className="list-group-item text-white bg-black text-center border-0"><FaRegCircleUser className="fs-1 text text-white" /><br />Account</a>
      <a id="wd-dashboard-link" href="#/Kanbas/Dashboard" className="list-group-item text-center border-0 bg-white text-danger"><AiOutlineDashboard className="fs-1 text-danger" /><br />Dashboard</a>
      <a id="wd-course-link" href="#/Kanbas/Courses/1234/Home" className="list-group-item text-white bg-black text-center border-0"><LiaBookSolid className="fs-1 text-danger" /><br />Courses</a>
      <a id="wd-calendar-link" href="#/Kanbas/Calendar" className="list-group-item text-white bg-black text-center border-0"><IoCalendarOutline className="fs-1 text-danger" /><br />Calendar</a>
      <a id="wd-inbox-link" href="#/Kanbas/Inbox" className="list-group-item text-white bg-black text-center border-0"><FaInbox className="fs-1 text-danger" /><br />Inbox</a>
      <a id="wd-labs-link" href="#/Labs" className="list-group-item text-white bg-black text-center border-0"><LiaCogSolid className="fs-1 text-danger" /><br />Labs</a>
      <a id="wd-landing-page" className="list-group-item text-white bg-black text-center border-0" href="/"><IoChevronBackCircle  className="fs-1 text-danger"/><br />Back to landing page</a>
    </div>
  );}
  