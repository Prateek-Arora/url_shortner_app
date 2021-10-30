import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

const Login = (props) => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [errors, seterrors] = useState({})

    // useEffect(() => {
    //     if (props.auth.isAuthenticated) {
    //         props.history.push("/dashboard");
    //     }
    // }, [])

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push("/dashboard");
        }
    }, [props.auth.isAuthenticated, props.history])

    useEffect(() => {
        seterrors(props.errors);
    }, [props.errors])

    const handleEmailChange = e => {
        setemail(e.target.value)
        // console.log(email);
    };
    const handlePasswordChange = e => {
        setpassword(e.target.value)
        // console.log(password);
    };
    const onSubmit = e => {
        console.log('xyzz')
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        };
        props.loginUser(userData);
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
                    <form noValidate onSubmit={(e) => onSubmit(e)}>
                        <div className="input-field col s12">
                            <input
                                onChange={(e) => handleEmailChange(e)}
                                value={email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                    invalid: errors.email || errors.emailnotfound
                                })}
                            />
                            <label htmlFor="email">Email</label>
                            <span className="red-text">
                                {errors.email}
                                {errors.emailnotfound}
                            </span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={(e) => handlePasswordChange(e)}
                                value={password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                            />
                            <label htmlFor="password">Password</label>
                            <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
