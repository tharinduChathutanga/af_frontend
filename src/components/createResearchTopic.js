import React, { Component } from "react";
import axios from "../action/axios";
import swal from "sweetalert";
import BG from "../images/r2giphy.gif";

export default class createResearchTopic extends Component {
  //intialization

  constructor(props) {
    super(props);
    this.state = {
      studentsGrpId: "",
      researchField: "",
      supervisorName: "",
      selectedTopic: "",
      grpLeaderName: "",
      grpLeaderEmail: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  //save to db
  onSubmit = (e) => {
    e.preventDefault();

    const {
      studentsGrpId,
      researchField,
      supervisorName,
      selectedTopic,
      grpLeaderName,
      grpLeaderEmail,
    } = this.state;

    const data = {
      studentsGrpId: studentsGrpId,
      researchField: researchField,
      supervisorName: supervisorName,
      selectedTopic: selectedTopic,
      grpLeaderName: grpLeaderName,
      grpLeaderEmail: grpLeaderEmail,
    };

    console.log(data);

    //validation

    //const re = /^[0-9\b]+$/;
    if (
      studentsGrpId == "" ||
      researchField == "" ||
      supervisorName == "" ||
      selectedTopic == "" ||
      grpLeaderName == "" ||
      grpLeaderEmail == ""
    ) {
      swal(
        "Please fill the form correctly",
        "Form values cannot be empty",
        "error"
      );
    } else if (researchField.length < 2) {
      swal(
        "Invalid Research Field",
        "Length should be greater than 2",
        "error"
      );
    } else if (studentsGrpId.length < 2) {
      swal(
        "Invalid Students' Group ID",
        "Length should be greater than 2",
        "error"
      );
    } else if (studentsGrpId.length > 15) {
      swal(
        "Invalid Students' Group ID",
        "Length should not be greater than 15",
        "error"
      );
    } else if (supervisorName.length < 2) {
      swal(
        " Please Enter Supervisor Name Correctly",
        "length should be greater than 2",
        "error"
      );
    }
    //}
    //else if ((!re.test(String(studentsGrpId))) || (studentsGrpId.length !== 10)) {
    //swal("Invaid Contact Number", "There should be a valid pattern for contact number", "error");
    else {
      swal({
        title: "Are you sure?",
        text: `Group Id: ${this.state.studentsGrpId} | Research Field: ${this.state.researchField} | Supervisor Name: ${this.state.supervisorName} | Selected Topic: ${this.state.selectedTopic} | Name Of Group Leader: ${this.state.grpLeaderName} | Email Of Group Leader: ${this.state.grpLeaderEmail}`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.post("/api/v1/postTopic/save", data).then((res) => {
            if (res.data.success) {
              this.setState({
                studentsGrpId: "",
                researchField: "",
                supervisorName: "",
                selectedTopic: "",
                grpLeaderName: "",
                grpLeaderEmail: "",
              });
            }
          });
          swal("Research Topic Details Added Successfully!", {
            icon: "success",
          });
        } else {
          swal("Addition Not completed!");
        }
      });
    }
  };
  //Demo button
  demo = () => {
    //setState
    this.setState({
      studentsGrpId: "SE_WD_REG_021",
    });

    this.setState({
      researchField: "System Architecture",
    });

    this.setState({
      supervisorName: "R. Perera",
    });

    this.setState({
      selectedTopic: "Evolution Of System Architecture",
    });
    this.setState({
      grpLeaderName: "N. Amali",
    });
    this.setState({
      grpLeaderEmail: "it20147414@my.sliit.lk",
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <section id="hire">
              <div className="topic" style={{ marginTop: "5%" }}>
                <div className="container-fluid">
                  <div className="Jumbotron jumbotron-fluid">
                    <div className="container hire">
                      <br />
                      <marquee direction="left">
                        <p className="display-3 " style={{ color: "#8b4513" }}>
                          <b>Register Your Research Topic Today !</b>
                        </p>
                      </marquee>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <img
              className="r2giphy.gif"
              src={BG}
              alt="bg img"
              style={{
                width: "75%",
                height: "50%",
                marginTop: "100px",
                marginLeft: "140px",
              }}
            />
          </div>

          <div className="col-6">
            <div style={{ marginTop: "2%" }}>
              <div
                className="myformstyle"
                style={{ width: "95%", marginLeft: "0px" }}
              >
                <div className="card-body">
                  <div className="col-md-8 mt-4 mx-auto">
                    <h1
                      className="text-center topic"
                      style={{ color: "#00008b" }}
                    >
                      Research Topic Registration Form{" "}
                    </h1>
                    <br></br>

                    <form
                      className="needs-validation"
                      align="center"
                      style={{
                        width: "110%",
                        borderStyle: "solid",
                        borderWidth: "5px",
                        boxShadow: "0 8px 350px 0 rgba(0, 0, 0, 0.5)",
                        alignContent: "center",
                        borderColor: "navy",
                      }}
                      noValidate
                    >
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <br></br>
                        <label
                          style={{ marginBottom: "5px", fontSize: "19px" }}
                          className="topic"
                        >
                          <b>Students' Group ID: </b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="studentsGrpId"
                          placeholder="Enter Your Group Id"
                          value={this.state.studentsGrpId}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>

                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <br></br>
                        <label
                          style={{ marginBottom: "5px", fontSize: "19px" }}
                          className="topic"
                        >
                          <b>Research Field:</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="researchField"
                          placeholder="Enter Your Research Field"
                          value={this.state.researchField}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <br></br>

                      <label
                        style={{ marginBottom: "5px", fontSize: "19px" }}
                        className="topic"
                      >
                        <b>Supervisor Name: </b>
                      </label>
                      <div class="row">
                        <div class="col">
                          <input
                            type="text"
                            className="form-control"
                            name="supervisorName"
                            placeholder="Enter supervisorName"
                            value={this.state.supervisorName}
                            onChange={this.handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <br></br>
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <br></br>
                        <label
                          style={{ marginBottom: "5px", fontSize: "19px" }}
                          className="topic"
                        >
                          <b>Selected Research Topic: </b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="selectedTopic"
                          placeholder="Enter Your Research Topic"
                          value={this.state.selectedTopic}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>

                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <br></br>
                        <label
                          style={{ marginBottom: "5px", fontSize: "19px" }}
                          className="topic"
                        >
                          <b>Name Of Group Leader: </b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="grpLeaderName"
                          placeholder="Enter the group leader's name"
                          value={this.state.grpLeaderName}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>

                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <br></br>
                        <label
                          style={{ marginBottom: "5px", fontSize: "19px" }}
                          className="topic"
                        >
                          <b>Email Of Group Leader: </b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="grpLeaderEmail"
                          placeholder="Enter the group leader's email"
                          value={this.state.grpLeaderEmail}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>

                      <button
                        type="button"
                        class="btn btn-outline-primary"
                        onClick={this.demo}
                      >
                        {" "}
                        Demo{" "}
                      </button>
                      <br />
                      <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ marginTop: "15px" }}
                        onClick={this.onSubmit}
                      >
                        <i className="far fa-check-square"></i>
                        &nbsp; Submit Research Topic Details
                      </button>

                      <br />
                      <button
                        className="btn btn-dark"
                        type="submit"
                        style={{ marginTop: "15px" }}
                      >
                        <a href="/email">
                          {" "}
                          <i
                            className="far fa-check-square"
                            style={{ textDecoration: "none" }}
                          ></i>
                          &nbsp; Request Supervisor Via Email
                        </a>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}
