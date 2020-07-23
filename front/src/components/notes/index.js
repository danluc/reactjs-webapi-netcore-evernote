import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { push as Menu } from 'react-burger-menu'

import NoteService from '../../services/notes'
import ListNotes from './list'
import Editor from './editor'

import './index.css'


const Notes = (props) => {

    const [notes, setNotes] = useState([])
    const [current_notes, setCurrentNotes] = useState({ title: "", body: "", id: "" })

    async function fetchNotes() {
        const res = await NoteService.index();
        if (res.data.length > 0) {
            setNotes(res.data.reverse())
            setCurrentNotes(res.data[0])
        }else{
            setNotes([])
        }
    }

    const selectNote = (id) => {

        setCurrentNotes(id)
    }

    const createNotes = async () => {
        await NoteService.create();
        fetchNotes();
    }

    const deleteNotes = async (note) => {
        await NoteService.delete(note.id);
        fetchNotes();
    }

    const updateNotes = async (old, note) => {
        const update =  await NoteService.update(old.id, note);
        const index = notes.indexOf(old);
        const newnotes = notes;
        newnotes[index] = update.data;
        setNotes(newnotes);
        setCurrentNotes(update.data)
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <Fragment>
            <Container fluid>
                <Row className="notes" id="notes">
                    <Menu
                        pageWrapId={"notes-editor"}
                        isOpen={props.isOpen}
                        onStateChange={(state) => props.setIsOpen(state.isOpen)}
                        disableAutoFocus
                        outerContainerId={"notes"}
                        customBurgerIcon={false}
                        customCrossIcon={false}
                    >
                        <Container>
                            <p>Search</p>
                            <p>
                                <ListNotes
                                    notes={notes}
                                    selectNote={selectNote}
                                    current_notes={current_notes}
                                    createNotes={createNotes}
                                    deleteNotes={deleteNotes}
                                />
                            </p>
                        </Container>
                    </Menu>

                    <Col sm={12} className="notes-editor" id="notes-editor">
                        <Editor 
                        note={current_notes}
                        updateNotes={updateNotes}
                        />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Notes