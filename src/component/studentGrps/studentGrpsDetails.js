import React, { Component } from "react";
import axios from "../../action/axios";

export default class studentGrpsDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentGrp: {},
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/studentGrps/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          studentGrp: res.data.studentGrp,
        });
        console.log(this.state.studentGrp);
      }
    });
  }

  render() {
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
    } = this.state.studentGrp;
    return (
      <div style={{ marginTop: "20px" }}>
        <div className="container" style={{ width: "600px" }}>
          <h1 className="text-center"> Group Details</h1>
          <br></br>
          <table className="table table-sm ">
            <tbody>
              <tr className="table-info">
                <th>Leader Name </th>
                <td>{leaderName}</td>
              </tr>
              <tr className="table-info">
                <th>Leader Student ID </th>
                <td>{leaderID}</td>
              </tr>
              <tr className="table-info">
                <th>Leader Email Address </th>
                <td>{leaderEmail}</td>
              </tr>
              <tr className="table-warning">
                <th>Member 1 Name </th>
                <td>{member1Name}</td>
              </tr>
              <tr className="table-warning">
                <th>Member 1 Student ID </th>
                <td>{member1ID}</td>
              </tr>
              <tr className="table-warning">
                <th>Member 1 Email Address </th>
                <td>{member1Email}</td>
              </tr>
              <tr className="table-info">
                <th>Member 2 Name </th>
                <td>{member2Name}</td>
              </tr>
              <tr className="table-info">
                <th>Member 2 Student ID </th>
                <td>{member2ID}</td>
              </tr>
              <tr className="table-info">
                <th>Member 2 Email Address </th>
                <td>{member2Email}</td>
              </tr>
              <tr className="table-warning">
                <th>Member 3 Name </th>
                <td>{member3Name}</td>
              </tr>
              <tr className="table-warning">
                <th>Member 3 Student ID </th>
                <td>{member3ID}</td>
              </tr>
              <tr className="table-warning">
                <th>Member 3 Email Address </th>
                <td>{member3Email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
