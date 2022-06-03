import React, { Component } from "react";
import axios from "../action/axios";
import swal from "sweetalert";

export default class editResearchTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsGrpId: "",
      researchField: "",
      supervisorName: "",
      selectedTopic: "",
      grpLeaderName: "",
      grpLeaderEmail: "",
      status: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;

    const {
      studentsGrpId,
      researchField,
      supervisorName,
      selectedTopic,
      grpLeaderName,
      grpLeaderEmail,
      status,
    } = this.state;

    const data = {
      studentsGrpId: studentsGrpId,
      researchField: researchField,
      supervisorName: supervisorName,
      selectedTopic: selectedTopic,
      grpLeaderName: grpLeaderName,
      grpLeaderEmail: grpLeaderEmail,
      status: status,
    };

    console.log(data);

    //Validation

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
    } else {
      axios.put(`/api/v1/postTopic/update/${id} `, data).then((res) => {
        if (res.data.success) {
          swal("Successful!", "Research Topic Accepted", "success");
          this.setState({
            studentsGrpId: "",
            researchField: "",
            supervisorName: "",
            selectedTopic: "",
            grpLeaderName: "",
            grpLeaderEmail: "",
            status: "",
          });
        }
      });
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/api/v1//postTopic/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          studentsGrpId: res.data.post.studentsGrpId,
          researchField: res.data.post.researchField,
          supervisorName: res.data.post.supervisorName,
          selectedTopic: res.data.post.selectedTopic,
          grpLeaderName: res.data.post.grpLeaderName,
          grpLeaderEmail: res.data.post.grpLeaderEmail,
          status: res.data.post.status,
        });
      }
    });
  }

  render() {
    return (
      <div
        className="container border"
        style={{
          marginTop: "50px",

          width: "50%",

          backgroundImage: `url('https://previews.123rf.com/images/pospelowa/pospelowa1703/pospelowa170300023/73692302-dry-flowers-on-a-white-wooden-background-wallpaper.jpg')`,

          backgroundPosition: "center",

          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="cardU" style={{ marginTop: "40px" }}>
            <div className="card-body">
              <div className="col-md-8 mt-4 mx-auto">
                <center>
                  <h1
                    className="h3 mb-3 font-weight-normal"
                    style={{
                      backgroundColor: "#d4eff9",
                      marginTop: "40px",
                      color: "navy",
                    }}
                  >
                    <font face="Comic sans MS" size="6">
                      <b>Accept/Reject Reserach Topic Details</b>
                    </font>
                  </h1>
                  <br />
                </center>
                <br />
                <form className="needs-validation" noValidate>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
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

                  <div className="form-group" style={{ marginBottom: "15px" }}>
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
                  <div className="form-group" style={{ marginBottom: "15px" }}>
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

                  <div className="form-group" style={{ marginBottom: "15px" }}>
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

                  <div className="form-group" style={{ marginBottom: "15px" }}>
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

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <br></br>
                    <label
                      style={{ marginBottom: "5px", fontSize: "19px" }}
                      className="topic"
                    >
                      <b>Status:</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="status"
                      placeholder="Enter status"
                      value={this.state.status}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    type="submit"
                    style={{ marginTop: "15px" }}
                    onClick={this.onSubmit}
                  >
                    <i className="far fa-check-square"></i>
                    &nbsp; Update
                  </button>
                </form>
              </div>
            </div>
          </div>

          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
