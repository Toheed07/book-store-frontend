import React, { useState } from "react";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetFormFields = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      console.log("login complete");
      navigate("/");
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else if (error.code === "auth/user-not-found") {
        alert("Wrong email or password");
      } else {
        console.log("user creation encountered an error", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/sign-up");
  };

  return (
    <Form onSubmit={handleSubmit} style={{ margin: "auto" }}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="passowrd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        style={{ margin: "10px" }}
        disabled={isLoading}
      >
        {isLoading ? <Spinner animation="border" size="sm" /> : "Sign In"}
      </Button>
      <Button
        variant="secondary"
        style={{ margin: "10px" }}
        onClick={handleRegister}
      >
        Register
      </Button>
    </Form>
  );
};

export default SignInForm;
