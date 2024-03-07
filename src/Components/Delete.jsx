import React from 'react';
import { Button } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";

const DeleteButton = ({ id, onDelete }) => {
    const handleClick = () => {
        onDelete(id);
    };


    return (
        <Button variant="danger" onClick={handleClick}>
            <MdDelete />
        </Button>
    );
};

export default DeleteButton;
