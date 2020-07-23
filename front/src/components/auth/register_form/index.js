import React, { Fragment, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import UserService from "../../../services/users";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [error, setError] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await UserService.register({
        name: name,
        email: email,
        password: password,
      });
      setRedirectToLogin(true);
    } catch (err) {
      setError(true);
    }
  };

  if (redirectToLogin) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return (
    <Fragment>
      <Form onSubmit={HandleSubmit}>
        <Form.Group controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
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
            <a onClick={(e) => setRedirectToLogin(true)}>Login</a> or
          </Col>
          <Col>
            <Button type="submit" variant="primary" block>
              Register
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

export default RegisterForm;
