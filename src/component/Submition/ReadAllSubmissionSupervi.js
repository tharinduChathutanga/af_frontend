import React, { Component } from "react";
import axios from "../../action/axios";

class ReadAllSubmissionSupervi extends Component {
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
    axios.get("/api/v1/file").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts,
        });
        console.log(this.state.posts);
      }
    });
  }

  filterData(posts, searchKey) {
    const result = posts.filter((post) =>
      post.groupId.toLowerCase().includes(searchKey)
    );
    this.setState({ posts: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/api/v1/file").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <br></br>

        <div className="text-center">
          <h1
            className="adminletter"
            style={{ color: "navy", marginLeft: "300px" }}
          >
            <b>All Submission </b>
          </h1>
        </div>
        <div className="col-md-6 mb-4">
          <form class="form-inline">
            <i class="fas fa-search" aria-hidden="true"></i>
            <br></br>

            <input
              className="form-control form-control-sm ml-3 w-75"
              type="search"
              placeholder="Search"
              name="searchQuery"
              style={{ marginLeft: "200px" }}
              onChange={this.handleSearchArea}
            ></input>
          </form>
          <br></br>
        </div>
        <table className="table table-striped" style={{ color: "#362419" }}>
          <thead>
            <tr>
              <th scope="col">
                <b>No: </b>
              </th>
              <th scope="col">
                <b>Group ID</b>
              </th>
              <th scope="col">
                <b>Submission Url</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{posts.groupId}</td>
                <td>
                  <a
                    href={`/file/${posts._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {posts.url}
                  </a>
                </td>

                <td>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReadAllSubmissionSupervi;
