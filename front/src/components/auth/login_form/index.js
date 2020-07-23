import React, { Fragment, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import UserService from "../../../services/users";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [error, setError] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.login({
        email: email,
        password: password,
      });
      setRedirectToLogin(true);
    } catch (err) {
      setError(true);
    }
  };

  if (redirectToLogin) {
    return <Redirect to={{ pathname: "/notes" }} />;
  }

  return (
    <Fragment>
      <Form onSubmit={HandleSubmit}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Row>
          <Col>
            <a onClick={(e) => setRedirectToLogin(true)}>Register</a> or
          </Col>
          <Col>
            <Button type="submit" variant="primary" block>
              Login
            </Button>
          </Col>
        </Row>
        <Row>
          {error && <Form.Text muted> Password or Email invalid </Form.Text>}
        </Row>
      </Form>
    </Fragment>
  );
}

export default LoginForm;
