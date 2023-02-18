import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";

function Login() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleClick = async (e) => {
    e.preventDefault();
    console.log("Sigining user...");
    const reslt = await firebase.signinUserWithEmailandPassword(
      email,
      password
    );
    console.log("signed in");
    console.log(reslt);
  };

  const HandleGoogleLogin = async (e) => {
    e.preventDefault();
    await firebase.signinWithGoogle();
  };

  useEffect(() => {
    if (firebase.isLoggedIn) {
      //Navigate To Home
      navigate("/");
    }
  }, [firebase, navigate]);

  return (
    <>
      <div className="container mt-5">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={HandleClick}>
            Login
          </Button>
        </Form>
        <div className="mt-5 mb-3">
          <h1 className="mb-4">Or</h1>
          <Button variant="danger" onClick={HandleGoogleLogin}>
            Sign in With Google
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
