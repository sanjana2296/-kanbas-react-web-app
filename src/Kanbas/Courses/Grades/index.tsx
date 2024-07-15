import { IoSettingsSharp } from "react-icons/io5";
import { FaFileExport } from "react-icons/fa6";
import { TbFileArrowLeft } from "react-icons/tb";
import { BsSearch } from 'react-icons/bs';
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
export default function Grades() {
  return (
    <div>
      Grades
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
      </div>
      <div className="col-6">
        <h3>Assignment Names</h3>
      </div>
      <div className="col-6">
        <div className="input-group">
          <span className="input-group-text">
            <BsSearch />
          </span>
          <input type="text" className="form-control" placeholder="Search for Students" id="wd-search-students" />
        </div>
      </div>
      <div className="col-6">
        <div className="input-group">
          <span className="input-group-text">
            <BsSearch />
          </span>
          <input type="text" className="form-control" placeholder="Search for Assignments" id="wd-search-assignments" />
        </div>
      </div>
    </div>
    <br/>
    <div>
    <button className="btn btn-light me-2 px-3 py-2 text-dark">
    <CiFilter /> Apply Filters
      </button>
    </div>
    <br/>
    <br/>
    <br/>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>A1 setup out of 100</th>
            <th>A2 HTML out of 100</th>
            <th>A3 CSS out of 100</th>
            <th>A1 BOOTSTRAP out of 100</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ color: 'red' }}>A</td>
            <td>100%</td>
            <td>96.67%</td>
            <td>100%</td>
            <td>100%</td>
          </tr>
          <tr>
            <td style={{ color: 'red' }}>B</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            <td>67%</td>
          </tr>
          <tr>
            <td style={{ color: 'red' }}>C</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            <td>95%</td>
          </tr>
          <tr>
            <td style={{ color: 'red' }}>D</td>
            <td>100%</td>
            <td>96.67%</td>
            <td>92%</td>
            <td>100%</td>
          </tr>
          <tr>
            <td style={{ color: 'red' }}>E</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
          </tr>
          <tr>
            <td style={{ color: 'red' }}>F</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
          </tr>
          <tr>
            <td style={{ color: 'red' }}>G</td>
            <td>100%</td>
            <td>100%</td>
            <td>98%</td>
            <td>100%</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
}
