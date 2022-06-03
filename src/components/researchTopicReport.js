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
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <br></br>{" "}
            <center>
              <h4>All Research Topic Details</h4>
            </center>
          </div>
          <div className="col-lg-9 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="search"
              name="search"
              onChange={this.handleSearchArea}
            ></input>
          </div>
        </div>
        <table
          Id="topics-table"
          className="table table-hover"
          style={{ marginTop: "40px", color: "#362419" }}
        >
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
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>

                <td>{posts.studentsGrpId}</td>
                <td>{posts.researchField}</td>
                <td>{posts.supervisorName}</td>
                <td>{posts.selectedTopic}</td>
                <td>{posts.grpLeaderName}</td>
                <td>{posts.grpLeaderEmail}</td>
                <td>{posts.status}</td>
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
