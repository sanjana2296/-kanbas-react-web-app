export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses"  className="row">
      <div className="row row-cols-1 row-cols-md-5 g-4">
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        <div className="card">
          <a className="wd-dashboard-course-link text-decoration-none text-dark"
             href="#/Kanbas/Courses/1234/Home">
            <img src="/images/reactjs.jpg" width="100%"/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
                 CS1234 React JS
              </h5>
               <p className="card-text">
                  Full Stack software developer
                </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </a>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        <div className="card">
          <a className="wd-dashboard-course-link text-decoration-none text-dark"
             href="#/Kanbas/Courses/1234/Home">
            <img src="images/TS.png" width="100%"/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS1001 Typescript Basics
              </h5>
               <p className="card-text">
                  Full Stack software developer
                </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </a>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        <div className="card">
          <a className="wd-dashboard-course-link text-decoration-none text-dark"
             href="#/Kanbas/Courses/1234/Home">
            <img src="images/CICD.jpeg" width="100%"/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS1002 CI/CD Pipeline
              </h5>
               <p className="card-text">
                  Full Stack software developer
                </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </a>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        <div className="card">
          <a className="wd-dashboard-course-link text-decoration-none text-dark"
             href="#/Kanbas/Courses/1234/Home">
            <img src="images/TS.png" width="100%"/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS1003 Advanced TypeScript
              </h5>
               <p className="card-text">
                  Full Stack software developer
                </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </a>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        <div className="card">
          <a className="wd-dashboard-course-link text-decoration-none text-dark"
             href="#/Kanbas/Courses/1234/Home">
            <img src="images/Java.jpg" width="100%"/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS1200 Java Programming
              </h5>
               <p className="card-text">
                  Full Stack software developer
                </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </a>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        <div className="card">
          <a className="wd-dashboard-course-link text-decoration-none text-dark"
             href="#/Kanbas/Courses/1234/Home">
            <img src="images/HTMLCSS.jpeg" width="100%"/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS1006 HTML & CSS
              </h5>
               <p className="card-text">
                  Full Stack software developer
                </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </a>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        <div className="card">
          <a className="wd-dashboard-course-link text-decoration-none text-dark"
             href="#/Kanbas/Courses/1234/Home">
            <img src="images/AdvancedCSS.jpeg" width="100%"/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS1205 Advanced CSS
              </h5>
               <p className="card-text">
                  Full Stack software developer
                </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </a>
          </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        <div className="card">
          <a className="wd-dashboard-course-link text-decoration-none text-dark"
             href="#/Kanbas/Courses/1234/Home">
            <img src="images/JSessentials.png" width="100%"/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
              CS1009 JavaScript Essentials
              </h5>
               <p className="card-text">
                  Full Stack software developer
                </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </a>
          </div>
        </div>
        </div>
      </div>
    </div>
);}
