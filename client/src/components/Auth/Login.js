import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [errors, seterrors] = useState({})
    const handleEmailChange = e => {
        setemail(e.target.value)
    };
    const handlePasswordChange = e => {
        setpassword(e.target.value)
    };
    const onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(userData);
    };
    return (
        <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
                <div style={{ padding: "2rem" }} className="col s6 offset-s3 z-depth-3">
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
                        home
                    </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Login</b> below
                        </h4>
                        <p className="grey-text text-darken-1">
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </div>
                    <form noValidate onSubmit={(e) => onSubmit}>
                        <div className="input-field col s12">
                            <input
                                onChange={(e) => handleEmailChange}
                                value={email}
                                error={errors.email}
                                id="email"
                                type="email"
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={(e) => handlePasswordChange}
                                value={password}
                                error={errors.password}
                                id="password"
                                type="password"
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login
