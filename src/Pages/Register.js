import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";

function Register() {
  const firebase = useFirebase();
  //   console.log(firebase);
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleClick = async (e) => {
    e.preventDefault();
    console.log("Sigining user...");
    const reslt = await firebase.signupUserWithEmailandPassword(
      email,
      password
    );
    console.log("signed up");
    console.log(reslt);
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
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
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
            Create Account
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Register;
