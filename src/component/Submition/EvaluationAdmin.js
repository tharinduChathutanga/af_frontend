import React, { useState } from "react";
import {
    getStorage,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "@firebase/storage";
import axios from "../../action/axios";
import BG1 from "../../images/excel.png";

import swal from "sweetalert";
import { app } from "../../firebase";
import { Button, Form, Input } from "antd";

function AdminFileUpload() {
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState();
    const [upload, setUpload] = useState(null);
    const [loading, setLoading] = useState(true);
    const [template, setTemplate] = useState([]);
    const [form] = Form.useForm();

    //Reset fields
    const onReset = () => {
        form.resetFields();
    };

    //form layout
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
    };

    const formHandler = (e) => {
        e.preventDefault();

        const fileName = new Date().getTime().toString + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, `/admin-evaluation/${file.name}`);
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
                        .post("/api/v1/addevalu", newUrl)
                        .then((res) => {
                            swal("Upload Evaluation");
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

    return (
        <div>
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
                                    <b>EVALUATION FORM </b>
                                </h1>
                                <br></br>

                                <br></br>
                            </center>
                            <center>
                                <div className="submission" style={{ width: "68rem" }}>
                                    <form>
                                        <p style={{ marginRight: "200px" }}>
                                            <b>Student Presentation & Documention Evaluation Submission Form</b>
                                        </p>
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
                                        <div className="form-group">
                                            <br></br>
                                            <label style={{ marginRight: "200px", color: "blue", fontSize: "large", fontFamily: "sans-serif" }}>
                                                Upload Evaluation :{" "}
                                            </label>
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
                                            SUBMIT
                                        </button>
                                        <h3 style={{ marginRight: "200px" }}>
                                            Uploaded {progress} %{" "}
                                        </h3>
                                        <br></br>
                                        <Form.Item
                                            name="submitDateTime"
                                            label="Submit Date"
                                            style={{
                                                textDecoration: "none",
                                                color: "red",
                                                width: "13%",
                                                marginRight: "200px",
                                            }}
                                        >
                                            <Input
                                                defaultValue={new Date()}
                                                disabled="true"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "black",
                                                    marginRight: "200px",
                                                }}
                                            />
                                        </Form.Item>
                                        <br></br>
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
        </div>
    );
}

export default AdminFileUpload;
