import React, { Fragment } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Header from "../../../components/header";
import RegisterForm from "../../../components/auth/register_form";
import "./index.css";
import Logo from "../../../assets/images/logo.png";

const Register = () => (
  <Fragment>
    <Header />
    <Container fluid className="auth">
      <Row>
        <Col>
          <Card className="centro">
            <Card.Img variant="top" src={Logo} />
            <Card.Body>
              <Card.Title className="text-center">Register</Card.Title>
              <Fragment>
                <RegisterForm />
              </Fragment>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </Fragment>
);

export default Register;
