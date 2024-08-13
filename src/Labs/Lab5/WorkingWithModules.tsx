import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER_A;
export default function WorkingWithModules() {
  const [module, setModule] = useState({
    id: 1,
    name: "Module name",
    description: "This is a module",
    course: "This is summer web development course",
  });
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;
  return (
    <>
      <div id="wd-working-with-objects">
        <h3>Working With Objects for module</h3>
        <h4>Modifying Properties</h4>
        <a
          id="wd-update-module-name"
          className="btn btn-primary float-end"
          href={`${MODULE_API_URL}/name/${module.name}`}
        >
          Update Name
        </a>
        <input
          className="form-control w-75"
          id="wd-module-name"
          value={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
        />
        <hr />

        <a
          id="wd-update-module-description"
          className="btn btn-primary float-end"
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Description
        </a>
        <input
          className="form-control w-75"
          id="wd-module-description"
          value={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
        <hr />
        <h4>Retrieving Objects</h4>
        <a
          id="wd-retrieve-modules"
          className="btn btn-primary"
          href={`${REMOTE_SERVER}/lab5/module`}
        >
          Get module
        </a>
        <hr />
        <h4>Retrieving Properties</h4>
        <a
          id="wd-retrieve-module-name"
          className="btn btn-primary"
          href={`${REMOTE_SERVER}/lab5/module/name`}
        >
          Get Name
        </a>
        <hr />
      </div>
    </>
  );
}
