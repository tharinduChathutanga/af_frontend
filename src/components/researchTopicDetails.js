import React, { Component } from "react";
import axios from "axios";

class researchTopicDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
    };
  }

  //retriew data of specific form
  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/api/v1/postsTopic/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          post: res.data.post,
        });
        console.log(this.state.post);
      }
    });
  }
  render() {
    const {
      studentsGrpId,
      researchField,
      supervisorName,
      selectedTopic,
      grpLeaderName,
      grpLeaderEmail,
    } = this.state.post;
    return (
      <div>
        <div className="container">
          <div class="row">
            <div class="col-6">
              <div style={{ marginTop: "20px" }}>
                <h1>{studentsGrpId}</h1>

                <hr />
                <dl className="row">
                  <dt className="col-sm-3">Students' Group ID</dt>
                  <dd className="col-sm-9">{studentsGrpId}</dd>
                  <dt className="col-sm-3">Research Field</dt>
                  <dd className="col-sm-9">{researchField}</dd>
                  <dt className="col-sm-3">Supervisor Name</dt>
                  <dd className="col-sm-9">{supervisorName}</dd>
                  <dt className="col-sm-3">Selected Research Topic</dt>
                  <dd className="col-sm-9">{selectedTopic}</dd>
                  <dt className="col-sm-3">Name Of Group Leader</dt>
                  <dd className="col-sm-9">{grpLeaderName}</dd>
                  <dt className="col-sm-3">Email Of Group Leader</dt>
                  <dd className="col-sm-9">{grpLeaderEmail}</dd>
                </dl>
              </div>
            </div>
            <div class="col-6">
              <div className="imageprofile">
                <img
                  src=" "
                  alt="..."
                  className="rounded-circle"
                  style={{ marginLeft: "20%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default researchTopicDetails;
