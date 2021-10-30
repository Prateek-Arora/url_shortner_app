import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

const Register = (props) => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [password2, setpassword2] = useState("")
    const [errors, seterrors] = useState({})

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push("/dashboard");
        }
    }, [props.auth.isAuthenticated, props.history])

    useEffect(() => {
        seterrors(props.errors);
    }, [props.errors])

    const handleNameChange = e => {
        setname(e.target.value)
    };
    const handleEmailChange = e => {
        setemail(e.target.value)
    };
    const handlePasswordChange = e => {
        setpassword(e.target.value)
    };
    const handlePassword2Change = e => {
        setpassword2(e.target.value)
    };
    const onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: name,
            email: email,
            password: password,
            password2: password2
        };
        props.registerUser(newUser, props.history);
    };
    return (
        <div className="container ">
            <div style={{ marginTop: "4rem" }} className="row">
                <div style={{ padding: "2rem" }} className="col s6 offset-s3 z-depth-3">
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
                        home
                    </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Register</b> below
                        </h4>
                        <p className="grey-text text-darken-1">
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>
                    </div>
                    <form noValidate onSubmit={(e) => onSubmit(e)}>
                        <div className="input-field col s12">
                            <input
                                onChange={(e) => handleNameChange(e)}
                                value={name}
                                error={errors.name}
                                id="name"
                                type="text"
                                className={classnames("", {
                                    invalid: errors.name
                                })}
                            />
                            <label htmlFor="name">Name</label>
                            <span className="red-text">{errors.name}</span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={(e) => handleEmailChange(e)}
                                value={email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                    invalid: errors.email
                                })}
                            />
                            <label htmlFor="email">Email</label>
                            <span className="red-text">{errors.email}</span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={(e) => handlePasswordChange(e)}
                                value={password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password
                                })}
                            />
                            <label htmlFor="password">Password</label>
                            <span className="red-text">{errors.password}</span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={(e) => handlePassword2Change(e)}
                                value={password2}
                                error={errors.password2}
                                id="password2"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password2
                                })}
                            />
                            <label htmlFor="password2">Confirm Password</label>
                            <span className="red-text">{errors.password2}</span>
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
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
