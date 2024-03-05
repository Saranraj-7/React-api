import React, { useState, useEffect } from "react";
import { Modal, Container, Form, Button } from 'react-bootstrap';
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import './UserForm.css';
import { Navigate, useNavigate } from "react-router-dom";
import { getUsers } from './api'; // Import API functions

const Id = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    const handleClose = () => setShow(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userData = await getUsers(); 
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleShow = () => setShow(true);
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleUserSelect = (userId) => {
        setSelectedUserId(userId);
        navigate(`/Userdetails/${userId}`);
    };

    const handleSearchChange = (value) => {
        setSearchInput(value);
    };

    return (
        <Container>
            <div className="row align-items-center mb-3">
                <div className="col">
                    <Accordion defaultActiveKey="0" className="custom-accordion">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header className="accordion-header">Select User ID</Accordion.Header>
                            <Accordion.Body>
                                {filteredUsers.map(user => (
                                    <Form.Check
                                        type="radio"
                                        id={`user-${user.id}`}
                                        key={user.id}
                                        label={`User ID: ${user.id}`}
                                        value={user.id}
                                        checked={selectedUserId === user.id}
                                        onChange={() => handleUserSelect(user.id)}
                                        className="user-radio"
                                    />
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </Container>
    );
}

export default Id;
