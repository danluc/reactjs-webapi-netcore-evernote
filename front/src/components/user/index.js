import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

import UserService from '../../services/users'

function UserComponent(props) {
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);

    async function GetUser() {
        const res = await UserService.index();
        setName(res.data.name);
        setEmail(res.data.email);
        setId(res.data.id);
    }

    useEffect(() => {
        GetUser()
    }, []);


    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UserService.update(id, {
                name: name,
                email: email,
                password: password,
            });
        } catch (err) {
            setError(true);
        }
    };

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
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Row>

                    <Col>
                        <Button type="submit" variant="primary" block>
                            Save
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {error && <Form.Text muted> Password or Email invalid </Form.Text>}
                </Row>
            </Form>
        </Fragment>
    )
}

export default UserComponent;