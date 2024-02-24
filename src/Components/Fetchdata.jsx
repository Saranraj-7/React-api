import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Modal, Container, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import './UserForm.css';
import { MdEditSquare, MdOutlineAutoDelete } from "react-icons/md";
import AddUserForm from './AddUserForm';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from "react-router-dom";

const App = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        gender: "",
        status: "",
    });
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); 

    const handleClose = () => setShow(false);

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

    const handleFormSubmit = async (e) => {
        console.log("Form data:", formData); // Log form data before submission

        try {
            const response = await axios.post(
                "https://gorest.co.in/public/v2/users",
                formData,
                {
                    headers: {
                        Authorization: `Bearer 79a3b1d569005f3bb059d351efbfc433938986d1c759d0c23bee1a7f32e8d27f`,
                    },
                }
            );
            console.log("API Response:", response.data)

            // Reset form data after successful submission
            setFormData({
                id: "",
                name: "",
                email: "",
                gender: "",
                status: "",
            });
            setShow(false);
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    setShow(false);
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

    const handleSearchChange = (value) => {
        setSearchInput(value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const indexOfLastUser = currentPage * pageSize;
    const indexOfFirstUser = indexOfLastUser - pageSize;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / pageSize);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container>
            <h4 className="pt-3 pb-2">Dashboard</h4>
            <div className="row align-items-center mb-3">
                <div className="col-md-auto mb-3 mb-md-0">
                </div>
                <div className="row flex-row justify-content-between">
                    <div className="col-3">
                    <div className="input-search input-wrapper">
    <FaSearch id="search-icon" />
    <input
        className="input-search"
        placeholder="Type to Search... "
        value={searchInput}
        onChange={(e) => handleSearchChange(e.target.value)}
    />
</div>

                    </div>
                    <div className="col-2"><AddUserForm /></div>
                </div>
            </div>


            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingUser && 'Edit User'}</Modal.Title>
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
                    <Button variant="success" onClick={editingUser ? handleSave : handleFormSubmit}>
                        {editingUser ? 'Save Changes' : 'Add User'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="table-responsive">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Edit</th>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                            <th>gender</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <Button variant="success" onClick={() => handleEdit(user)}><MdEditSquare /></Button>
                                </td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.status}</td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteStudent(user.id)}><MdOutlineAutoDelete /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div>
                {/* <div className='pt-3 col-1  d-flex justify-content-center'>
                    {[...Array(totalPages).keys()].map((page) => (
                        <Pagination>
                        {[...Array(totalPages).keys()].map((page) => (
                            <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => handlePageChange(page + 1)}>
                                {page + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>                   
                     ))}
                </div> */}
            </div>
        </Container>

    );
}

export default App;
