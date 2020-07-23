import React, { Fragment } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import ApresentacaoImage from "../../assets/images/presentation.png";
import Header from "../../components/header";
import "./style.css";

const HomeScreen = () => (
  <Fragment>
    <Header />
    <Container fluid className="home">
      <Container>
        <br />
        <br />
        <Row>
          <Col md={5}>
            <h1 className="text-white">
              Create notes easily and access when you wants on the cloud
            </h1>
            <h5 className="text-white">
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs.
              <br />
              <br />
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print.
            </h5>
            <br />
            <Link to="/register" className="btn btn-outline-primary text-white">
              Register for free Now
            </Link>
          </Col>
          <Col md={{ span: 7 }}>
            <Image src={ApresentacaoImage} fluid />
          </Col>
        </Row>
      </Container>
    </Container>
  </Fragment>
);

export default HomeScreen;
