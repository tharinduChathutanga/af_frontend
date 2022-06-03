import React, { Component } from "react";
import axios from "../../action/axios";
import swal from "sweetalert";

export default class editStudentGrp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderName: "",
      leaderID: "",
      leaderEmail: "",
      member1Name: "",
      member1ID: "",
      member1Email: "",
      member2Name: "",
      member2ID: "",
      member2Email: "",
      member3Name: "",
      member3ID: "",
      member3Email: "",
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
      leaderName,
      leaderID,
      leaderEmail,
      member1Name,
      member1ID,
      member1Email,
      member2Name,
      member2ID,
      member2Email,
      member3Name,
      member3ID,
      member3Email,
    } = this.state;

    const data = {
      leaderName: leaderName,
      leaderID: leaderID,
      leaderEmail: leaderEmail,
      member1Name: member1Name,
      member1ID: member1ID,
      member1Email: member1Email,
      member2Name: member2Name,
      member2ID: member2ID,
      member2Email: member2Email,
      member3Name: member3Name,
      member3ID: member3ID,
      member3Email: member3Email,
    };

    console.log(data);

    if (
      leaderName === "" ||
      leaderID === "" ||
      leaderEmail === "" ||
      member1Name === "" ||
      member1ID === "" ||
      member1Email === "" ||
      member2Name === "" ||
      member2ID === "" ||
      member2Email === "" ||
      member3Name === "" ||
      member3ID === "" ||
      member3Email === ""
    ) {
      swal(
        "Please fill the form correctly",
        "Form values cannot be empty",
        "error"
      );
    } else {
      swal({
        title: "Are you sure?",
        text: `Leader Name: ${this.state.leaderName} | Leader ID: ${this.state.leaderID} | Leader Email: ${this.state.leaderEmail} 
        Member 2 Name: ${this.state.member2Name} | Member 2 ID: ${this.state.member2ID} | Member 3 Email: ${this.state.member3Email}
        Member 2 Name: ${this.state.member2Name} | Member 2 ID: ${this.state.member2ID} | Member 3 Email: ${this.state.member3Email}
        Member 2 Name: ${this.state.member2Name} | Member 2 ID: ${this.state.member2ID} | Member 3 Email: ${this.state.member3Email}`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.put(`/studentGrps/update/${id}`, data).then((res) => {
            if (res.data.success) {
              this.setState({
                leaderName: "",
                leaderID: "",
                leaderEmail: "",
                member1Name: "",
                member1ID: "",
                member1Email: "",
                member2Name: "",
                member2ID: "",
                member2Email: "",
                member3Name: "",
                member3ID: "",
                member3Email: "",
              });
            }
          });
          swal("Student Group Details Updated Successfully!", {
            icon: "success",
          });
        } else {
          swal("Group registration is not completed!");
        }
      });
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/studentGrps/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          leaderName: res.data.studentGrp.leaderName,
          leaderID: res.data.studentGrp.leaderID,
          leaderEmail: res.data.studentGrp.leaderEmail,
          member1Name: res.data.studentGrp.member1Name,
          member1ID: res.data.studentGrp.member1ID,
          member1Email: res.data.studentGrp.member1Email,
          member2Name: res.data.studentGrp.member2Name,
          member2ID: res.data.studentGrp.member2ID,
          member2Email: res.data.studentGrp.member2Email,
          member3Name: res.data.studentGrp.member3Name,
          member3ID: res.data.studentGrp.member3ID,
          member3Email: res.data.studentGrp.member3Email,
        });
        console.log(this.state.studentGrp);
      }
    });
  }

  render() {
    return (
      <div className="container" style={{ width: "540px" }}>
        <h1
          className="text-center"
          style={{
            borderStyle: "solid",
            backgroundColor: "MidnightBlue",
            color: "orange",
          }}
        >
          Update Student Group Registration
        </h1>
        <br></br>
        <form>
          <h5 className="text-center">Details of the Leader</h5>
          <div className="form-group">
            <div className="form-group">
              <label for="exampleInputPassword1">
                Name(As per the name in Student ID):
              </label>
              <input
                type="text"
                className="form-control"
                name="leaderName"
                placeholder="eg:  Romeshika H.D.S"
                value={this.state.leaderName}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <label for="exampleInputEmail1">Student Registration Number:</label>
            <input
              type="text"
              class="form-control"
              name="leaderID"
              aria-describedby="emailHelp"
              placeholder="eg: IT20133625"
              value={this.state.leaderID}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Student Email:</label>
            <input
              type="text"
              className="form-control"
              name="leaderEmail"
              placeholder="eg: IT20133625@my.sliit.lk"
              value={this.state.leaderEmail}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <br></br>
          <h5 className="text-center">Details of Member 1</h5>
          <div className="form-group">
            <div className="form-group">
              <label for="exampleInputPassword1">
                Name(As per the name in Student ID):
              </label>
              <input
                type="text"
                className="form-control"
                name="member1Name"
                placeholder="eg:  Romeshika H.D.S"
                value={this.state.member1Name}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <label for="exampleInputEmail1">Student Registration Number:</label>
            <input
              type="text"
              class="form-control"
              name="member1ID"
              aria-describedby="emailHelp"
              placeholder="eg: IT20133625"
              value={this.state.member1ID}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Student Email:</label>
            <input
              type="text"
              className="form-control"
              name="member1Email"
              placeholder="eg: IT20133625@my.sliit.lk"
              value={this.state.member1Email}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <br></br>
          <h5 className="text-center">Details of Member 2</h5>
          <div className="form-group">
            <div className="form-group">
              <label for="exampleInputPassword1">
                Name(As per the name in Student ID):
              </label>
              <input
                type="text"
                className="form-control"
                name="member2Name"
                placeholder="eg:  Romeshika H.D.S"
                value={this.state.member2Name}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <label for="exampleInputEmail1">Student Registration Number:</label>
            <input
              type="text"
              class="form-control"
              name="member2ID"
              aria-describedby="emailHelp"
              placeholder="eg: IT20133625"
              value={this.state.member2ID}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Student Email:</label>
            <input
              type="text"
              className="form-control"
              name="member2Email"
              placeholder="eg: IT20133625@my.sliit.lk"
              value={this.state.member2Email}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <br></br>
          <h5 className="text-center">Details of Member 3</h5>
          <div className="form-group">
            <div className="form-group">
              <label for="exampleInputPassword1">
                Name(As per the name in Student ID):
              </label>
              <input
                type="text"
                className="form-control"
                name="member3Name"
                placeholder="eg:  Romeshika H.D.S"
                value={this.state.member3Name}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <label for="exampleInputEmail1">Student Registration Number:</label>
            <input
              type="text"
              class="form-control"
              name="member3ID"
              aria-describedby="emailHelp"
              placeholder="eg: IT20133625"
              value={this.state.member3ID}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Student Email:</label>
            <input
              type="text"
              className="form-control"
              name="member3Email"
              placeholder="eg: IT20133625@my.sliit.lk"
              value={this.state.member3Email}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <br></br>
          <div className="container" style={{ width: "170px" }}>
            <button
              type="submit"
              onClick={this.onSubmit}
              className="btn btn-primary"
              style={{
                width: "150px",
                fontSize: "large",
                backgroundColor: "MidnightBlue",
              }}
            >
              Update
            </button>
          </div>
        </form>
        <br></br>
      </div>
    );
  }
}
