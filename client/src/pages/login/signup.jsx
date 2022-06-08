import React, { useState } from "react";
import loginImg from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";
import "../toast.scss";


export function SignUp(props) {
    const navigate = useNavigate();
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");


    const signUp = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(regEmail)) {
            return M.toast({ html: "Email is not valid", classes: "#c62828 red darken-3" });
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: regName,
                email: regEmail,
                password: regPassword
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" });
                } else {
                    M.toast({ html: data.msg, classes: "#43a047 green darken-1" });
                    navigate('/login');
                }
            })
    }


    return (
        <>
            <div className="cover-login">
                <br />
                <br />
                <div className="size-login">
                    <br />
                    <div className="base-container App">
                        <h1 className="header">
                            <strong>Sign up</strong>
                        </h1>
                        <div className="content">
                            <div className="image">
                                <img width="100px" src={loginImg} alt="logo" />
                            </div>
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="password">Name</label>
                                    <input
                                        type="text"
                                        placeholder="name"
                                        value={regName}
                                        onChange={(e) => setRegName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Email">Email</label>
                                    <input
                                        type="text"
                                        placeholder="email"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        placeholder="password"
                                        value={regPassword}
                                        onChange={(e) => setRegPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <Link
                                to="/login"
                                style={{ textDecoration: "none", color: "#3498db" }}
                            >
                                Login instead
                            </Link>
                            <button type="button" className="btnN" onClick={() => signUp()}>
                                Create
                            </button>
                        </div>
                        <br />
                    </div>
                </div>
            </div>

        </>
    );
}
