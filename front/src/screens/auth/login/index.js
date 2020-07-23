import React, { Fragment } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import Header from "../../../components/header";
import LoginForm from "../../../components/auth/login_form";
import "./index.css";
import Logo from "../../../assets/images/logo.png";

const Login = () => (
  <Fragment>
    <Header />
    <Container fluid className="auth">
      <Row>
        <Col>
          <Card className="centro">
            <Card.Img variant="top" src={Logo} />
            <Card.Body>
              <Card.Title className="text-center">Login</Card.Title>
              <Fragment>
                <LoginForm />
              </Fragment>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </Fragment>
);

export default Login;
