import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import StopSignMark from "./StopSignMark";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <button
        id="wd-add-module-btn"
        className="btn btn-lg btn-danger me-1 float-end"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </button>
      <div className="dropdown d-inline me-1 float-end">
        <button
          id="wd-publish-all-btn"
          className="btn btn-lg btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          <GreenCheckmark />
          Publish All
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              id="wd-publish-all-modules-and-items-btn"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish all modules and items
            </a>
          </li>
          <li>
            <a
              id="wd-publish-modules-only-button"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish modules only
            </a>
          </li>
          <li>
            <a
              id="wd-publish-all-modules-and-items-btn"
              className="dropdown-item"
              href="#"
            >
              <StopSignMark />
              Unpublish all modules and items
            </a>
          </li>
          <li>
            <a
              id="wd-publish-modules-only-button"
              className="dropdown-item"
              href="#"
            >
              <StopSignMark />
              Unpublish modules only
            </a>
          </li>
        </ul>
      </div>
      <div className="dropdown d-inline me-1 float-end">
        <button
          id=" wd-view-progress"
          className="btn btn-lg btn-secondary"
          type="button"
        >
          View Progress
        </button>
      </div>
      <div className="dropdown d-inline me-1 float-end">
        <button
          id=" wd-collapse-all "
          className="btn btn-lg btn-secondary"
          type="button"
        >
          Collapse All
        </button>
      </div>
    </div>
  );
}