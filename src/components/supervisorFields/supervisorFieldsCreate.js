import React, { Component } from "react";
import axios from "../../action/axios";
import swal from "sweetalert";
import BG from "../../images/sup1.png";

export default class supervisorFieldsCreate extends Component {
  //intialization

  constructor(props) {
    super(props);
    this.state = {
      supName: "",
      researchFieldT: "",
      supervisorEmail: "",
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

    const { supName, researchFieldT, supervisorEmail } = this.state;

    const data = {
      supName: supName,
      researchFieldT: researchFieldT,
      supervisorEmail: supervisorEmail,
    };

    console.log(data);

    //validation

    if (supName == "" || researchFieldT == "" || supervisorEmail == "") {
      swal(
        "Please fill the form correctly",
        "Form values cannot be empty",
        "error"
      );
    } else if (researchFieldT.length < 2) {
      swal(
        "Invalid Research Field",
        "Length should be greater than 2",
        "error"
      );
    } else if (supervisorEmail.length < 2) {
      swal(
        "Invalid Students' Group ID",
        "Length should be greater than 2",
        "error"
      );
    } else {
      swal({
        title: "Are you sure?",
        text: `Supervisor Name: ${this.state.supName} | Research Field: ${this.state.researchFieldT} | Supervisor Email: ${this.state.supervisorEmail} `,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.post("/api/v1/postSupervisorField/save", data).then((res) => {
            if (res.data.success) {
              this.setState({
                supName: "",
                researchFieldT: "",
                supervisorEmail: "",
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
      supName: "N. Amali",
    });

    this.setState({
      researchFieldT: "Data Warehousing",
    });

    this.setState({
      supervisorEmail: "namalistaff@gmail.com",
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <img
              className="sup1.png"
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
                          <b>Supervisor Name: </b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="supName"
                          placeholder="Enter Name"
                          value={this.state.supName}
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
                          name="researchFieldT"
                          placeholder="Enter Your Research Field"
                          value={this.state.researchFieldT}
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
                            name="supervisorEmail"
                            placeholder="Enter Email"
                            value={this.state.supervisorEmail}
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
