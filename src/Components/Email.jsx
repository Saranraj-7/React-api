
import React, { useState, useEffect } from "react";
import { Container, Form } from 'react-bootstrap';
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import './UserForm.css';
import {  useNavigate } from "react-router-dom";

const Id = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    // const handleClose = () => setShow(false);

    useEffect(() => {
        axios.get('https://gorest.co.in/public/v2/users', {
            headers: {
                Authorization: `Bearer 79a3b1d569005f3bb059d351efbfc433938986d1c759d0c23bee1a7f32e8d27f`
            }
        })
            .then(res => {
                setUsers(res.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
                            <Accordion.Header className="accordion-header">Email</Accordion.Header>
                            <Accordion.Body>
                                {filteredUsers.map(user => (
                                    <Form.Check
                                        className="overflow-x-hidden"
                                        type="radio"
                                        id={`user-${user.email}`}
                                        key={user.email}
                                        label={user.email}
                                        value={user.id}
                                        checked={selectedUserId === user.email}
                                        onChange={() => handleUserSelect(user.id)}
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



