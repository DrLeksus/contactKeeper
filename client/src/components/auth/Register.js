import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    isAuthenticated && props.history.push("/");

    if (error === "User already taken") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, props.history, isAuthenticated]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = user;

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (name === "" || email === "" || password === "" || password2 === "") {
      setAlert("Please fill out all fields.", "danger");
    } else if (password.length < 6 || password2.length < 6) {
      setAlert("Your password has to be at least 6 characters.", "danger");
    } else if (password !== password2) {
      setAlert("Your passwords don't match", "danger");
    } else {
      // console.log("Register Submit");
      register({ name, email, password });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Sign up"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
