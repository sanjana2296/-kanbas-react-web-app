import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import Account from "./Account";
import Calender from "./Calender";
import Inbox from "./Inbox";
export default function Kanbas() {
    return (
      <div id="wd-kanbas">
      <table>
        <tr>
          <td valign="top">
            <KanbasNavigation />
          </td>
          <td valign="top">
          <Routes>
              <Route path="/" element={<Navigate to="Dashboard" />} />
              <Route path="Account" element={<Account/>} />
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Courses/:id/*" element={<Courses />} />
              <Route path="Calendar" element={<Calender/>} />
              <Route path="Inbox" element={<Inbox/>} />
            </Routes>

          </td>
        </tr>
      </table>
      </div>
  );}
  
  