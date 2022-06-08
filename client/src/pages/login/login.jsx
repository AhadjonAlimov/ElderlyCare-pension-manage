import React, { useState, useContext } from "react";
import loginImg from "../../assets/logo.jpg";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css";
import "../toast.scss";


export function Login(props) {
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const [LogEmail, setLogEmail] = useState("");
    const [LogPassword, setLogPassword] = useState("");


    const LogIn = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(LogEmail)) {
            return M.toast({ html: "Email is not valid", classes: "#c62828 red darken-3" });
        }
        fetch("/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: LogEmail,
                password: LogPassword
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" });
                } else {
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch({type: "USER", payload: data.user});
                    M.toast({ html: "You have logged in successfully", classes: "#43a047 green darken-1" });
                    navigate('/');
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
                            <strong>Login</strong>
                        </h1>
                        <div className="content">
                            <div className="image">
                                <img width="100px" src={loginImg} alt="logo" />
                            </div>
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="Email">Email</label>
                                    <input
                                        type="text"
                                        placeholder="email"
                                        value={LogEmail}
                                        onChange={(e) => setLogEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        placeholder="password"
                                        value={LogPassword}
                                        onChange={(e) => setLogPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <Link
                                to="/signup"
                                style={{ textDecoration: "none", color: "#3498db" }}
                            >
                                Create account
                            </Link>
                            <button type="button" className="btnN" onClick={() => LogIn()}>
                                Login
                            </button>
                        </div>
                        <br />
                    </div>
                </div>
            </div>

        </>
    )
}
