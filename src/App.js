import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/footer/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Webfont from "webfontloader";
import Home from "./component/Home/Home.js";
import React from "react";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./action/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import usersHome from "./components/usersHome";
import editUser from "./components/editUser";
import SubmissionForm from "./component/Submition/SubmissionForm";
import MarkingSchem from "./component/Submition/MarkingSchem";
import AdminFileUpload from "./component/Submition/AdminFileUpload";
import ReadAllSubmissionSupervi from "./component/Submition/ReadAllSubmissionSupervi";

import createResearchTopic from "./components/createResearchTopic";
import researchTopicDetails from "./components/researchTopicDetails";
import researchTopicHome from "./components/researchTopicHome";
import editResearchTopic from "./components/editResearchTopic";
import supervisorEmailer from "./components/supervisorEmailer";
import researchTopicReport from "./components/researchTopicReport";
import supervisorFieldsCreate from "./components/supervisorFields/supervisorFieldsCreate";
import supFieldsRetrieve from "./components/supervisorFields/supFieldsRetrieve";
import coSupFieldsCreate from "./components/coSupervisorFields/coSupFieldsCreate";
import coSupervisorRetrieve from "./components/coSupervisorFields/coSupervisorRetrieve";
import Dashboard from "./component/Dashboard/Dashboard";
import EvaluationAdmin from "./component/Submition/EvaluationAdmin";

import createStudentGrp from "./component/studentGrps/createStudentGrp";
import studentGrps from "./component/studentGrps/studentGrps";
import editStudentGrp from "./component/studentGrps/editStudentGrp";
import studentGrpsDetails from "./component/studentGrps/studentGrpsDetails";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={LoginSignUp} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

      <Route path="/admin/users" exact component={usersHome}></Route>
      <Route path="/admin/edit/:id" exact component={editUser}></Route>
      <Route path="/admin/dashboard" exact component={Dashboard}></Route>

      <Route exact path="/submitform" component={SubmissionForm} />
      <Route path="/adminMarkingS" component={MarkingSchem} />
      <Route path="/admin/uploadT" component={AdminFileUpload} />
      <Route path="/readSubmission" component={ReadAllSubmissionSupervi} />

      <Route
        path="/staff/readSubmission"
        component={ReadAllSubmissionSupervi}
      />

      <Route
        path="/admin/researchTopicHome"
        exact
        component={researchTopicHome}
      />
      <Route path="/addresearchTopic" exact component={createResearchTopic} />
      <Route
        path="/admin/editresearchTopic/:id"
        exact
        component={editResearchTopic}
      />
      <Route
        path="/postresearchTopic/:id"
        exact
        component={researchTopicDetails}
      />
      <Route path="/email" exact component={supervisorEmailer} />
      <Route path="/topicsReport" exact component={researchTopicReport} />
      <Route path="/addSup" exact component={supervisorFieldsCreate} />
      <Route path="/supervisorhome" exact component={supFieldsRetrieve} />
      <Route path="/addCoSup" exact component={coSupFieldsCreate} />
      <Route path="/coSupervisorhome" exact component={coSupervisorRetrieve} />

      <Route path="/admin/studentGrps" component={studentGrps} />
      <Route path="/stdgrpadd" component={createStudentGrp} />
      <Route path="/update/:id" component={editStudentGrp} />
      <Route path="/evalu" component={EvaluationAdmin} />
      <Route path="/studentGrp/:id" component={studentGrpsDetails} />

      <Footer />
    </Router>
  );
}

export default App;
