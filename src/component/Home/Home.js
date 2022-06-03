import React, { Fragment } from "react";
import { FaInfoCircle } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Project Management</p>
        <h1>Your Path To Greatness STARTS HERE</h1>

        <a href="/About">
          <button>
            About <FaInfoCircle />
          </button>
        </a>
      </div>

      <h2 className="homeHeading1">"Your Path To Greatness</h2>
      <h2 className="homeHeading2">STARTS HERE"</h2>

      <p className="container">
        We are a leading non-state degree awarding institute approved by the
        University Grants Commission (UGC) under the Universities Act. We are
        also members of the Association of Commonwealth Universities (ACU), as
        well as the International Association of Universities (IAU), and the
        first Sri Lankan institute to be accredited by the Institution of
        Engineering & Technology, UK. We are proud to be listed as a leading and
        formidable awarding institute authorised and approved by the University
        Grants Commission (UGC) under the Universities Act, and the
        International Association of Universities (IAU). Furthermore, not only
        are we the first Sri Lankan institute to be accredited by the
        Institution of Engineering & Technology (IET.), UK, our IT degrees are
        also in turn accredited by the Engineering Council, UK.
      </p>
    </Fragment>
  );
};

export default Home;
