import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../LoginPage/LoginPage.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import {
  toastNoti,
  validateForm,
} from "../../utils/utils";
import Axios from "../../api/Axios";

const initState = {
  fullname: "",
  email: "",
  password: "",
  phone: "",
};

const RegisterPage = () => {
  const [formData, setFormData] = useState(initState);
  const navigate = useNavigate();

  // on submit sign up
  const submit = async () => {
    try {
      const validateData = validateForm(formData, "signup");
      if (validateData) {
        const res = await Axios.post('/auth/sign-up', {
          fullname: formData.fullname,
          password: formData.password,
          email: formData.email,
          phone: formData.phone
        })
        if (res.status === 200) {
          toastNoti("Sign up success!", "success");
          // if user sign up success switch to login
          onSwitchForm();
        }
      }

    } catch (e) {
      if (e.response?.status === 400) {
        toastNoti("Your email already existed!", 'error')
      }
      console.error(e);
    }
  }

  // on change input
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // on switch form sign up
  const onSwitchForm = () => {
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="login-page">
        <div className="login-modal">
          <h1>Sign Up</h1>

          <div className="login-input">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={onChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={onChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={onChange}
            />

            <input
              type="number"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={onChange}
            />
          </div>

          <button type="button" onClick={submit}>
            Sign Up
          </button>

          <div className="login-actions">
            <p>
              Login?
              <span onClick={onSwitchForm}>Sign in</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
