import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });

  useEffect(() => {
    if (localStorage.getItem("Chat-user")) {
      navigate("/");
    }
  }, []);

  const toastOptions = {
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  /**
   * ! Form validation for login
   */

  const validateForm = () => {
    const { userName, password } = values;

    if (userName === "") {
      toast.error("Please enter your username", toastOptions);
      return false;
    } else if (password === "") {
      toast.error(
        "Password should be greater or equal to 8 characters",
        toastOptions
      );
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const { userName, password } = values;
      const { data } = await axios.post(loginRoute, {
        userName,
        password,
      });
      if (data.success === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.success === true) {
        console.log("Data", data);
        localStorage.setItem("Chat-user", JSON.stringify(data.data));

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <img src="https://www.svgrepo.com/show/6995/chat.svg" alt="logo" />
            <h1>Chat-Mates</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="userName"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            Create a new account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  .submit {
    background-color: red;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 90%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
