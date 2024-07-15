export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
    <div className="mb-3">
      <label htmlFor="wd-name" className="col-sm-2 col-form-label text-end">Assignment Name</label>
      <input type="text" className="form-control" id="wd-name" value="A1" />
    </div>
      <div className="mb-3">
      <textarea className="form-control" id="wd-description" rows={4}>
        The assignment is available online.
        Submit a link to the landing page.
      </textarea>
    </div>
      <br />
      <div className="row mb-3">
      <label htmlFor="wd-points" className="col-sm-2 col-col-sm-2 col-form-label text-end text-end">Points</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="wd-points" value={100} />
      </div>
    </div>
    <br />
    <div className="row mb-3">
    <label htmlFor="wd-group" className="col-sm-2 col-form-label text-end">Assignment Group</label>
      <div className="col-sm-10">
        <select className="form-select" id="wd-group">
          <option selected value="Assignments">ASSIGNMENTS</option>
          <option value="AssignmentWeb">Web</option>
          <option value="AssignmentWebDev">Web Dev</option>
        </select>
      </div>
      </div>
      <div className="row mb-3">
      <label htmlFor="wd-display-grade-as" className="col-sm-2 col-form-label text-end">Display Grade as</label>
      <div className="col-sm-10">  
        <select className="form-select" id="wd-display-grade-as">
          <option selected value="percentage">PERCENTAGE</option>
          <option value="grade">GRADE</option>
        </select>
      </div>
      </div>
    <div className="row mb-3">
    <label htmlFor="wd-submission-type" className="col-sm-2 col-form-label text-end">Submission Type</label>
    <div className="col-sm-10"> 
    <div className="border p-3">   
        <select className="form-select" id="wd-submission-type">
          <option selected value="online">ONLINE</option>
          <option value="offline">OFFLINE</option>
        </select>
        <br/>
        <h5 id="wd-checkboxes">Online Entry Options</h5>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="wd-text-entry" />
          <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="wd-website-url" />
          <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="wd-media-recordings" />
          <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="wd-student-annotation" />
          <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="wd-file-upload" />
          <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
        </div>
      </div>
    </div>
    </div>
    <div className="row mb-3">
      <label htmlFor="wd-assign-to" className="col-sm-2 col-form-label text-end">Assign</label>
      <div className="col-sm-10"> 
      <div className="border p-3">  
      <label htmlFor="wd-assign-to" className="col-sm-2 col-form-label">Assign to</label>
        <input type="text" className="form-control" id="wd-assign-to" value="Everyone" />
        <label htmlFor="wd-due-date" className="col-sm-2 col-form-label">Due Date</label>
        <input type="date" className="form-control" id="wd-due-date" value="2024-05-13" />
        <label htmlFor="wd-available-from" className="col-sm-2 col-form-label">Available From</label>
        <input type="date" className="form-control" id="wd-available-from" value="2024-05-06" />
        <label htmlFor="wd-available-until" className="col-sm-2 col-form-label">Until</label>
        <input type="date" className="form-control" id="wd-available-until" value="2024-05-20" />
      </div>
      </div>
    </div>
        <hr style={{ width: "350%" }} />
        <div className="row mb-3 justify-content-end">
      <div className="col-auto">
        <button className="btn btn-light me-2" id="wd-assignment-cancel">Cancel</button>
        <button className="btn btn-danger" id="wd-assignment-save">Save</button>
      </div>
    </div>
    </div>
  );
}
