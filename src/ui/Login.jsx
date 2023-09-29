import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import Modal from "./Modal";
import { createPortal } from "react-dom";
import { useState } from "react";
import { setLoginToken } from "../features/plant/plantSlice";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../util/constants";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  async function login() {
    const destination = API_BASE_URL + "login/";
    try {
      setError("");
      console.log("loggin in");
      const response = await fetch(destination, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await response.json();
      console.log("login result data", data.token.length);
      if (data.token && data.token.length > 0) {
        console.log("token", data.token);
        dispatch(setLoginToken(data.token));
        navigate("/collection");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      //pass
    } finally {
      //pass
    }
  }

  function onUsernameChange(value) {
    setUsername(value);
  }
  function onPasswordChange(value) {
    setPassword(value);
  }
  function handleCancel() {
    navigate(-1);
  }

  function handleClick() {
    login();
  }
  return createPortal(
    <Modal
      confirmText="Login"
      onCancel={handleCancel}
      onClick={handleClick}
      cancelText="Cancel"
    >
      <LoginForm
        error={error}
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
      />
    </Modal>,
    document.body
  );
}

export default Login;
