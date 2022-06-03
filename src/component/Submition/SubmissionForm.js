import React, { useState, useEffect } from "react";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";
import axios from "../../action/axios";
import swal from "sweetalert";
import { app } from "../../firebase";
import { useParams } from "react-router-dom";
import BG from "../../images/downloadIcon.jpg";
import BG1 from "../../images/alldoc.png";
import { Button, Form, Input } from "antd";
import Swal from "sweetalert2";

function SubmissionForm() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState();
  const [ConfirmDialog, setConfirmDialog] = useState(0);
  const [setNotify] = useState();
  const { _id } = useState();
  const [viewSubmission, setViewSubmission] = useState([
    {
      file: "",
    },
  ]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`/api/v1/getfile`);
        if (result.status === 200) {
          setViewSubmission(result.data);
        }
        console.log(" Marks get ", result);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const formHandler = (e) => {
    e.preventDefault();

    const fileName = new Date().getTime().toString + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((file) => {
          const newUrl = {
            file,
          };

          console.log(newUrl);
          axios
            .post("/api/v1/addFile", newUrl)
            .then((res) => {
              swal("Submitted!");
              console.log(newUrl);
            })

            .catch((res) => {
              console.log(res);
            });
        });
      }
    );

    console.log(file);
  };

  function deleteFiles(_id) {
    console.log("delete clicked");

    setConfirmDialog({
      ...ConfirmDialog,
      isOpen: false,
    });

    axios
      .delete(`/api/v1/subfile/${_id}`)

      .then((res) => {
        // setNotify({
        //     isOpen: true,
        //     message: "Submission Removed !",
        //     type: "success",

        // });
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "sorry, All this types of rooms reserved in this day!",
        });

        console.log("notifiy");

        setTimeout(window.location.reload.bind(window.location), 3000);
      })

      .catch((err) => {
        // setNotify({
        //     isOpen: true,
        //     message: "can't deleted submission",
        //     type: "error",
        // });
        console.log("notifiy");
      });
  }

  return (
    <div
      className="container border"
      style={{
        marginTop: "50px",

        width: "45%",

        height: "5%",

        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREzY82nCUGNhSBWthTthBxGsFuuV-WYdR45Q&usqp=CAU')`,

        backgroundPosition: "center",

        backgroundSize: "cover",
      }}
    >
      <div className="App">
        <center>
          <div className="col-10 mt-5 ml-5 mr-10">
            <br></br>

            <br></br>
            <center>
              <h1 className="topic" style={{ fontSize: "50px" }}>
                <b>SUBMISSION FORM </b>
              </h1>
              <br></br>
              <h4 style={{ marginRight: "50px" }}>Project Submission</h4>
              <br></br>
            </center>
            <center>
              <div className="submission" style={{ width: "68rem" }}>
                <form>
                  <p style={{ marginRight: "200px" }}>
                    <b>Assignment of research module</b>
                  </p>

                  <div className="form-group">
                    <label style={{ marginRight: "200px" }}>
                      Add Submission:{" "}
                    </label>
                    <br></br>
                    <img
                      className="d1giphy.gif"
                      src={BG1}
                      alt="bg img"
                      style={{
                        width: "15%",
                        height: "5%",
                        marginTop: "10px",
                        marginRight: "200px",
                      }}
                    />
                    &nbsp;
                    <br></br>
                    <br></br>
                    <input
                      type="file"
                      className="input"
                      style={{
                        marginRight: "150px",
                        textDecoration: "none",
                        color: "Black",
                        fontSize: "medium",
                      }}
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <br />
                  </div>
                </form>

                <center>
                  <button
                    className="btn btn-warning"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      width: "13%",
                      marginRight: "200px",
                    }}
                    onClick={formHandler}
                  >
                    Add Submission
                  </button>
                  <h3 style={{ marginRight: "200px" }}>
                    Uploaded {progress} %{" "}
                  </h3>
                  <br></br>
                  <Form.Item
                    name="submitDateTime"
                    label="Submission Date"
                    style={{
                      textDecoration: "none",
                      color: "blue",
                      width: "13%",
                      marginRight: "200px",
                    }}
                  >
                    <Input
                      defaultValue={new Date()}
                      disabled="true"
                      style={{
                        textDecoration: "none",
                        color: "red",
                        marginRight: "150px",
                      }}
                    />
                  </Form.Item>
                  <br></br>
                  {viewSubmission.map((file) => (
                    <button
                      style={{
                        width: "5%",
                        height: "0%",
                        border: "white",
                        marginRight: "140px",
                      }}
                    >
                      <img
                        src={BG}
                        alt="bg img"
                        style={{
                          width: "100%",
                          height: "100%",
                          marginTop: "10px",
                          marginRight: "0px",
                        }}
                        onClick={() => {
                          window.open(file.file);
                        }}
                      />
                    </button>
                  ))}
                  &nbsp; &nbsp;
                  {/* <button style={{ width: "5%", height: "0%", border: "white" }} onClick={() => deleteFiles(_id)}>
                                    <img src={BG1} alt='bg img' style={{ width: "100%", height: "100%", marginTop: "0px", marginRight: "0px" }} />
                                </button> */}
                </center>
              </div>
            </center>

            <div className="form-group"></div>
            <br />
            <br />
          </div>
        </center>
      </div>
    </div>
  );
}

export default SubmissionForm;
