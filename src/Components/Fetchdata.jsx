import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Modal, Container, Table } from 'react-bootstrap';
import axios from "axios";
import './UserForm.css';
import { Searchbar } from "./Searchbar";

const App = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [editingUser, setEditingUser] = useState(null); 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        status: "",
    });

    const handleClose = () => {
        setShow(false);
        setEditingUser(null);
        setFormData({
            name: "",
            email: "",
            gender: "",
            status: "",
        });
    };

    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            id: user.id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            status: user.status,
        });
        handleShow();
    };

    const handleSave = async () => {
        try {
            if (editingUser) {
                const response = await axios.put(`https://gorest.co.in/public/v2/users/${editingUser.id}`, formData, {
                    headers: {
                        Authorization: `Bearer 79a3b1d569005f3bb059d351efbfc433938986d1c759d0c23bee1a7f32e8d27f`
                    }
                });
                if (response.status === 200) {
                    console.log("User updated successfully:", response.data);
                    const updatedUsers = users.map(user => {
                        return user.id === editingUser.id ? { ...user, ...formData } : user;
                    });
                    setUsers(updatedUsers);
                    handleClose();
                } else {
                    console.error("Failed to update user. Please try again later.");
                }
            } else {
                console.error("No user selected for editing.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

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

    const deleteStudent = async (id) => {
        try {
            const response = await axios.delete(`https://gorest.co.in/public/v2/users/${id}`, {
                headers: {
                    Authorization: `Bearer 79a3b1d569005f3bb059d351efbfc433938986d1c759d0c23bee1a7f32e8d27f`
                }
            });
            if (response.status === 200 || response.status === 204) {
                alert("User deleted successfully.");
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            } else {
                handleDeleteError("Failed to delete user. Please try again later.");
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            handleDeleteError("An error occurred while deleting the user. Please try again later.");
        }
    };

    function handleDeleteError(errorMessage) {
        alert(errorMessage);
    }

    return (
        <Container>
            <h3 className="pt-3 pb-2">Dashboard</h3>
            <Button className="mb-3" variant="danger" onClick={handleShow}>
                Add New  User
            </Button>

            <div>
                <Searchbar/>
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingUser ? 'Edit User' : 'New User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
    <div>
        <h5>ID</h5>
        <input className="input-field" type="id" name="id" value={formData.id} onChange={handleInputChange} />
    </div>
    <div>
        <h5>Name</h5>
        <input className="input-field" type="text" name="name" value={formData.name} onChange={handleInputChange} />
    </div>
    <div>
        <h5>Email</h5>
        <input className="input-field" type="email" name="email" value={formData.email} onChange={handleInputChange} />
    </div>
    <div>
        <h5>Gender</h5>
        <input className="input-field" type="gender" name="gender" value={formData.gender} onChange={handleInputChange} />
    </div>
    <div>
        <h5>Status</h5>
        <input className="input-field" type="status" name="status" value={formData.status} onChange={handleInputChange} />
    </div>
</Modal.Body>


                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={editingUser ? handleSave : handleClose}>
                        {editingUser ? 'Save Changes' : 'Add User'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="table-responsive">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                            <th>gender</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.status}</td>
                                <td>
                                    <Button variant="success" onClick={() => handleEdit(user)}>Edit</Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteStudent(user.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default App;
