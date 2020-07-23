import React, { Fragment } from 'react';
import { Row, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Moment from 'moment';

function ListNotes(props) {
    return (
        <Fragment>
            <Row>
                <h4 className="float-left">{props.notes.length} Notes</h4>
                <Button variant="outline-primary" size="sm" className="float-rigth" onClick={() => props.createNotes()}>Note +</Button>{' '}
            </Row>
            <Row>
                <ListGroup>
                    {props.notes.map((item, key) =>
                        <ListGroup.Item key={key} action accessKey={key} onClick={() => props.selectNote(item)}>
                            <h5>{item.title.replace(/(<([^>]+)>)/ig, "").substring(0, 15)}</h5>
                            <p>{item.body.replace(/(<([^>]+)>)/ig, "").substring(0, 30)}</p>
                            <p>{Moment(item.created_at).format('DD/MM')}</p>
                            <p>
                                <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() => props.deleteNotes(item)}
                                color="red"
                                />
                            </p>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Row>
        </Fragment>
    )
}

export default ListNotes;