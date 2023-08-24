import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { toastNoti, validateForm } from "../../utils/utils";
import { logIn } from "../../reducer/authReducer";
import Axios from '../../api/Axios'

const initState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [formData, setFormData] = useState(initState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // on submit sign in
  const submit = async () => {
    try {
      const validateData = validateForm(formData, "signin");
      if (validateData) {
        const res = await Axios.post('/auth/sign-in', {
          email: formData.email,
          password: formData.password
        })
        if (res.status === 200) {
          dispatch(logIn(res.data))
          navigate('/')
          toastNoti("Login success!", "success")
        }
      }

    } catch (e) {
      console.error(e);
      toastNoti(e.response?.data?.message, 'error')
    }
  };

  // onchange input
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // on switch sign up
  const onSwitchForm = () => {
    navigate("/register");
  };

  return (
    <div>
      <Navbar />
      <div className="login-page">
        <div className="login-modal">
          <h1>Sign In</h1>

          <div className="login-input">
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
          </div>

          <button type="button" onClick={submit}>
            Sign In
          </button>

          <div className="login-actions">
            <p>
              Create an account?
              <span onClick={onSwitchForm}>Sign up</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
