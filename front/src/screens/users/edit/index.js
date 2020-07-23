import React, { Fragment } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import UserComponent from '../../../components/user/index'
import HeaderLogged from '../../../components/header_logged'

const UserEdit = () => (
    <Fragment>
        <HeaderLogged />
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">Editar user</Card.Title>
                            <Fragment>
                                <UserComponent />
                            </Fragment>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </Fragment>
);

export default UserEdit;
