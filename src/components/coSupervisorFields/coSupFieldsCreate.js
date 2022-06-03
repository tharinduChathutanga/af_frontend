import React, { Component } from "react";
import axios from "../../action/axios";
import swal from "sweetalert";
import BG from "../../images/co1.png";

export default class coSupFieldsCreate extends Component {
  //intialization

  constructor(props) {
    super(props);
    this.state = {
      coSupervisorName: "",
      coResearchField: "",
      coSupervisorEmail: "",
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

    const { coSupervisorName, coResearchField, coSupervisorEmail } = this.state;

    const data = {
      coSupervisorName: coSupervisorName,
      coResearchField: coResearchField,
      coSupervisorEmail: coSupervisorEmail,
    };

    console.log(data);

    //validation

    if (
      coSupervisorName == "" ||
      coResearchField == "" ||
      coSupervisorEmail == ""
    ) {
      swal(
        "Please fill the form correctly",
        "Form values cannot be empty",
        "error"
      );
    } else if (coResearchField.length < 2) {
      swal(
        "Invalid Research Field",
        "Length should be greater than 2",
        "error"
      );
    } else if (coSupervisorEmail.length < 2) {
      swal(
        "Invalid Students' Group ID",
        "Length should be greater than 2",
        "error"
      );
    } else {
      swal({
        title: "Are you sure?",
        text: `Supervisor Name: ${this.state.coSupervisorName} | Research Field: ${this.state.coResearchField} | Supervisor Email: ${this.state.coSupervisorEmail} `,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.post("/api/v1/postCoSupervisorField/save", data).then((res) => {
            if (res.data.success) {
              this.setState({
                coSupervisorName: "",
                coResearchField: "",
                coSupervisorEmail: "",
              });
            }
          });
          swal("Research Fields Added Successfully!", {
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
      coSupervisorName: "Vinu",
    });

    this.setState({
      coResearchField: "Data Warehousing",
    });

    this.setState({
      coSupervisorEmail: "vinustaff@gmail.com",
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <img
              className="co1.png"
              src={BG}
              alt="bg img"
              style={{
                width: "70%",
                height: "70%",
                marginTop: "150px",
                marginLeft: "150px",
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
                      Add Research Fields Of Supervisor
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
                          <b>Co-Supervisor Name: </b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="coSupervisorName"
                          placeholder="Enter Name"
                          value={this.state.coSupervisorName}
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
                          name="coResearchField"
                          placeholder="Enter Your Research Field"
                          value={this.state.coResearchField}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <br></br>

                      <label
                        style={{ marginBottom: "5px", fontSize: "19px" }}
                        className="topic"
                      >
                        <b>Co-Supervisor Email: </b>
                      </label>
                      <div class="row">
                        <div class="col">
                          <input
                            type="text"
                            className="form-control"
                            name="coSupervisorEmail"
                            placeholder="Enter Email"
                            value={this.state.coSupervisorEmail}
                            onChange={this.handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <br></br>

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
                        &nbsp; Post<br></br>
                      </button>
                      <br></br>
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
