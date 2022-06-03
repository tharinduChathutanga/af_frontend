import React, { Component } from "react";
import axios from "../action/axios";
import swal from "sweetalert";
import jsPdf from "jspdf";
import "jspdf-autotable";

export default class researchTopicHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("/api/v1/postsTopic").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts,
        });
        console.log(this.state.posts);
      }
    });
  }

  onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/api/v1/postTopic/delete/${id}`).then((res) => {
          swal(
            "Deleted Successful",
            "Research Topic Details Are Removed",
            "success"
          );

          this.retrievePosts();
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  filterData(posts, searchKey) {
    const result = posts.filter(
      (post) =>
        post.studentsGrpId.toLowerCase().includes(searchKey) ||
        post.researchField.toLowerCase().includes(searchKey) ||
        post.supervisorName.toLowerCase().includes(searchKey) ||
        post.selectedTopic.toLowerCase().includes(searchKey) ||
        post.grpLeaderName.toLowerCase().includes(searchKey) ||
        post.grpLeaderEmail.toLowerCase().includes(searchKey)
    );
    this.setState({ posts: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/api/v1/postsTopic").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey);
      }
    });
  };

  //Report pdf generating
  jsPdfGenerator = () => {
    //new document in jspdf
    var doc = new jsPdf("l", "pt", "a3");

    doc.text(600, 20, "Research Topic Details Report", { align: "center" });
    doc.autoTable({ html: "#topics-table" });

    doc.autoTable({
      columnStyles: { europe: { halign: "center" } },
      margin: { top: 10 },
    });

    //save the pdf
    doc.save("Research Topic Details.pdf");
  };

  render() {
    return (
      <div>
        <br></br>
        <div className="text-center">
          <h1 className="adminletter" style={{ color: "navy" }}>
            <b>All Research Topic Details </b>
          </h1>
        </div>
        <div className="col-md-6 mb-4">
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
          <br></br>
        </div>
        <table className="table table-striped" style={{ color: "#362419" }}>
          <thead>
            <tr>
              <th scope="col">
                <b>Topic ID</b>
              </th>
              <th scope="col">
                <b>Students' Group ID</b>
              </th>
              <th scope="col">
                <b>Research Field</b>
              </th>
              <th scope="col">
                <b>Supervisor Name</b>
              </th>
              <th scope="col">
                <b>Selected Research Topic</b>
              </th>
              <th scope="col">
                <b>Name Of Group Leader</b>
              </th>
              <th scope="col">
                <b>Email Of Group Leader</b>
              </th>
              <th scope="col">
                <b>Status</b>
              </th>
              <th scope="col">
                <b>Action</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a
                    href={`/api/v1/postTopic/${posts._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {posts.studentsGrpId}
                  </a>
                </td>
                <td>{posts.researchField}</td>
                <td>{posts.supervisorName}</td>
                <td>{posts.selectedTopic}</td>
                <td>{posts.grpLeaderName}</td>
                <td>{posts.grpLeaderEmail}</td>
                <td>{posts.status}</td>

                <td>
                  <a
                    className="btn btn-warning"
                    href={`/admin/editresearchTopic/${posts._id}`}
                  >
                    <i className="fas fa-edit"></i>&nbsp;EDIT
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => this.onDelete(posts._id)}
                  >
                    <i className="fas fa-trash-alt"></i>&nbsp;DELETE
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn-primary" onClick={this.jsPdfGenerator}>
          Generate Report PDF
        </button>
      </div>
    );
  }
}
