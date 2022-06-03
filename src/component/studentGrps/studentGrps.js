import React, { Component } from "react";
import axios from "../../action/axios";
import swal from "sweetalert";

export default class studentGrps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentGrps: [],
    };
  }

  componentDidMount() {
    this.retrieveStudentGrps();
  }

  retrieveStudentGrps() {
    axios.get("/studentGrps").then((res) => {
      console.log("hello3");
      if (res.data.success) {
        this.setState({
          studentGrps: res.data.existingstudentGrps,
        });

        console.log(this.state.studentGrps);
      }
    });
  }

  onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the details of this Student Group!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/studentGrps/delete/${id}`).then((res) => {
          swal(
            "Delete Successfully!",
            "Student details are removed",
            "success"
          );

          this.retrieveStudentGrps();
        });
      } else {
        swal("The Student group is not deleted!");
      }
    });
  };

  filterData(studentGrps, searchKey) {
    const result = studentGrps.filter(
      (studentGrps) =>
        studentGrps.leaderID.toLowerCase().includes(searchKey) ||
        studentGrps.member1ID.toLowerCase().includes(searchKey) ||
        studentGrps.member2ID.toLowerCase().includes(searchKey) ||
        studentGrps.member3ID.toLowerCase().includes(searchKey)
    );
    this.setState({ studentGrps: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/studentGrps").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingstudentGrps, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <h1
          className="text-center"
          style={{
            borderStyle: "solid",
            backgroundColor: "MidnightBlue",
            color: "orange",
          }}
        >
          Student Groups
        </h1>

        <div className="col-md-5 mb-17">
          <form class="form-inline">
            <i class="fas fa-search" aria-hidden="true"></i>
            <input
              className="form-control form-control-sm ml-3 w-75"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input>
          </form>
        </div>

        <br></br>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Group ID</th>
              <th scope="col">Leader</th>

              <th scope="col">Member 1</th>

              <th scope="col">Member 2</th>

              <th scope="col">Member 3</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.studentGrps.map((studentGrps, index) => (
              <tr key={index}>
                <th scope="row">
                  <a
                    href={`/studentGrp/${studentGrps._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Grp_{index + 1}
                  </a>
                </th>
                <td>{studentGrps.leaderID}</td>
                <td>{studentGrps.member1ID}</td>
                <td>{studentGrps.member2ID}</td>
                <td>{studentGrps.member3ID}</td>
                <a
                  className="btn btn-warning"
                  href={`/update/${studentGrps._id}`}
                >
                  <i className="fas fa-edit"> </i>&nbsp; Edit
                </a>
                &nbsp;
                <a
                  className="btn btn-danger"
                  href="#"
                  style={{ color: "black" }}
                  onClick={() => this.onDelete(studentGrps._id)}
                >
                  <i
                    className="far fa-trash-alt"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "medium",
                    }}
                  >
                    {" "}
                  </i>{" "}
                  &nbsp; Delete
                </a>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn btn-primary btn-lg active"
          style={{ backgroundColor: "#c99212" }}
        >
          <a
            href="/add"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "large",
            }}
          >
            Create Student Group
          </a>
        </button>
      </div>
    );
  }
}
