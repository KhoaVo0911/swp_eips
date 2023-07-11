import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { LoginOwner } from "../services/login/loginSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/product");
  };
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, formikHelpers) => {
      console.log(formik.values);

      dispatch(LoginOwner(formik.values));
      formikHelpers.resetForm();
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter your Username"),
      password: Yup.string().required("Please Enter your Password"),
    }),
  });

  return (
    <div>
      <div className="login-box">
        <img
          className="center"
          src="Image/Screenshot_2023-05-24_082524-removebg-preview.png"
          alt="EVENT IMMEDIATE PAYMENT CARD"
        />
        <div className="form-element">
          <h2>
            EVENT IMMEDIATE <br />
            PAYMENT CARD{" "}
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-element">
            <input
              type="text"
              placeholder="USERNAME"
              name="username"
              color="success"
              value={formik.values.username}
              onChange={formik.handleChange}
              className="username"
              style={{ height: "25px" }}
            />
            {formik.errors.username && (
              <p style={{ color: "white", padding: "10px 10px" }}>
                {formik.errors.username}
              </p>
            )}
          </div>
          <div className="form-element">
            <input
              placeholder="PASSWORD"
              name="password"
              type="password"
              color="success"
              value={formik.values.password}
              onChange={formik.handleChange}
              style={{ height: "25px" }}
            />
            {formik.errors.password && (
              <p style={{ color: "white", paddingTop: "10px" }}>
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="form-element" style={{ marginTop: "20px" }}>
            <button
              className="btn-hover color-1"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
        <div
          className="form-element"
          style={{
            marginTop: "10px",
            marginLeft: "25%",
            position: "absolute",
            color: "white",
          }}
        >
          {/* <input type="checkbox" id="remember_checkbox" />
          <label for="remember">Remember</label> */}
        </div>
        <div
          className="form-element"
          style={{ marginTop: "10px", marginLeft: "25%" }}
        >
          {/* <a href="#" style={{ color: "white", textdecoration: "none" }}>
            Forgot password?
          </a> */}
        </div>
        <div
          className="form-element"
          style={{ color: "white", marginTop: "10px" }}
        >
          CREATE ACCOUNT
        </div>
        <div className="form-element" style={{ marginTop: "20px" }}>
          <a href="#">
            <img
              src="Image/Asset 2.png"
              alt="Facebook"
              style={{ width: "50px", marginRight: "10px" }}
            />
          </a>
          <a href="#">
            <img
              src="Image/Asset 3.png"
              alt="Google"
              style={{ width: "50px", marginLleft: "10px" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
