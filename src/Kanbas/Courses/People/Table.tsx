import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link } from "react-router-dom";
import { FaUserCircle, FaPlus } from "react-icons/fa";
import PeopleDetails from "./Details";
export default function PeopleTable() {
  const [users, setUsers] = useState<any[]>([]);

  const [role, setRole] = useState("");
  const roleName = localStorage.getItem("role");
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  const [name, setName] = useState("");
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      section: "S101",
      role: "STUDENT",
      email: "abc@abc.com",
      loginId: generateLoginId(),
    });
    setUsers([...users, user]);
  };
  const generateLoginId = () => {
    const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
    const formattedNumber = String(randomNumber).padStart(9, "0");
    const loginId = formattedNumber + "S";
    return loginId;
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div id="wd-people-table">
      {roleName != "STUDENT" && (
        <button
          onClick={createUser}
          className="float-end btn btn-danger wd-add-people"
        >
          <FaPlus className="me-2" />
          People
        </button>
      )}
      <input
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="form-control float-start w-25 me-2 wd-filter-by-name"
      />
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>{" "}
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>{" "}
        <option value="FACULTY">Faculty</option>
      </select>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Email</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td style={{ color: "red" }} className="wd-full-name text-nowrap">
                {roleName != "STUDENT" && (
                  <Link to={`${user.loginId}`}>
                    <FaUserCircle className="text-secondary me-2 fs-1" />
                  </Link>
                )}

                {roleName == "STUDENT" && (
                  <FaUserCircle className="text-secondary me-2 fs-1" />
                )}
                <span className="wd-first-name">{user.firstName} </span>

                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-email">{user.email}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PeopleDetails fetchUsers={fetchUsers} />
    </div>
  );
}
