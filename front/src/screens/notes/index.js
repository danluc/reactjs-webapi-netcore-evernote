import React, { Fragment, useState } from "react";
import HeaderLogged from '../../components/header_logged'
import NotesComponent from '../../components/notes'

const Notes = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Fragment>
            <HeaderLogged setIsOpen={setIsOpen} />
            <NotesComponent setIsOpen={setIsOpen} isOpen={isOpen} />
        </Fragment>
    )
};

export default Notes;
