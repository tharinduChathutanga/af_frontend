import React, { Fragment, useState } from "react";
import "./Header.css";
import Backdrop from "@material-ui/core/Backdrop";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PublishIcon from "@mui/icons-material/Publish";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../action/userAction";
import { useDispatch } from "react-redux";
import AddTaskIcon from "@mui/icons-material/AddTask";
import BadgeIcon from "@mui/icons-material/Badge";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmetReturnedIcon from "@mui/icons-material/AssignmentReturned";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift(
      {
        icon: <DashboardIcon />,
        name: "Dashboard",
        func: dashboard,
      },
      {
        icon: <UploadFileIcon />,
        name: "Upload Template",
        func: template,
      }
    );
  }

  if (user.role === "staff") {
    options.unshift(
      {
        icon: <BadgeIcon />,
        name: "Add Supervisor",
        func: addsup,
      },
      {
        icon: <AssignmentIndIcon />,
        name: "Add Co-Supervisor",
        func: addCoSup,
      }
    );
  }
  if (user.role === "admin" || user.role === "staff") {
    options.unshift(
      {
        icon: <PageviewIcon />,
        name: "All Submitions",
        func: allsubmitions,
      },
      {
        icon: <AssignmentIcon />,
        name: "Add Eveluation",
        func: evalu,
      }
    );
  }

  if (user.role === "student") {
    options.unshift(
      {
        icon: <PublishIcon />,
        name: "Submit File",
        func: submitform,
      },
      {
        icon: <AddTaskIcon />,
        name: "Create Research Topic",
        func: ctreatetopic,
      },
      {
        icon: <AppRegistrationIcon />,
        name: "Co-Supervisor Research Field",
        func: coSupervisorhome,
      },
      {
        icon: <GroupAddIcon />,
        name: "Register Groups",
        func: stdgrpadd,
      },
      {
        icon: <AssignmetReturnedIcon />,
        name: "Topic Report",
        func: topicsReport,
      }
    );
  }

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function topicsReport() {
    history.push("/topicsReport");
  }

  function evalu() {
    history.push("/evalu");
  }

  function stdgrpadd() {
    history.push("/stdgrpadd");
  }

  function coSupervisorhome() {
    history.push("/coSupervisorhome");
  }

  function addCoSup() {
    history.push("/addCoSup");
  }
  function addsup() {
    history.push("/addSup");
  }
  function ctreatetopic() {
    history.push("/addresearchTopic");
  }

  function template() {
    history.push("/admin/uploadT");
  }
  function allsubmitions() {
    history.push("/staff/readSubmission");
  }

  function account() {
    history.push("/account");
  }

  function submitform() {
    history.push("/submitform");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={<AccountCircleIcon className="speedDialIcon" />}
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
