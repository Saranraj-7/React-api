import React, { useState, useEffect } from "react";
import { Modal, Table,Button } from 'react-bootstrap';
import './UserForm.css';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import DeleteButton from "./Delete";
import { MdEditSquare } from "react-icons/md";
import Swal from 'sweetalert2';
import Api from "../Constant/api";

const Fetchdata = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchInput, setSearchInput] = useState("");


    const getUsers = async () => {
        try {
            const response = await Api.getCustomersData()
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    };

    const addUser = async (userData) => {
        try {
            const response = await Api.addCustomer(userData)
            return response.data;
        } catch (error) {
            console.error("Error adding user:", error);
            throw error;
        }
    };
    
     const editUser = async (userId, userData) => {
        try {
            const response = await Api.editCustomer()
            return response.data;
        } catch (error) {
            console.error("Error editing user:", error);
            throw error;
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
            }
        };
        fetchData();
    }, []);

    const handleAddUser = async (formData) => {
        try {
            const newUser = await addUser(formData);
            setUsers([...users, newUser]);
        } catch (error) {
        }
    };
    
    const handleEditUser = async (formData) => {
        try {
            const updatedUser = await editUser(editingUser.id, formData);
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
            setShow(false);
        } catch (error) {
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const confirmed = await Swal.fire({
                title: "Are you sure?",
                text: `You won't be able to revert this userid ${userId}`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
            if (confirmed.isConfirmed) {
                setUsers(users.filter(user => user.id !== userId));
                Swal.fire('Deleted!', 'Your ID has been deleted.', 'success');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSearchChange = (value) => {
        setSearchInput(value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleEdit = (user) => {
        setEditingUser(user);
        setShow(true);
    };

    return (
        <div className="pe-5">
            <h2 className="pt-4 pb-3 ps-4">Dashboard</h2>
            <div className="row align-items-center mb-3">
                <div className="col-md-auto mb-3 mb-md-0">
                </div>
                <div className="row flex-row justify-content-between">
                    <div className="col-3">
                        <div className="input-search input-wrapper">
                            <input
                                className="input-search"
                                placeholder="Type to Search... "
                                value={searchInput}
                                onChange={(e) => handleSearchChange(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className="col-2"><AddUserForm onAdd={handleAddUser} /></div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
                {editingUser && (
                    <EditUserForm user={editingUser} onSave={handleEditUser} onClose={handleClose} />
                )}
            </Modal>

            <div className="table-responsive ps-4">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th className="fs-4 fw-semibold">Edit</th>
                            <th className="fs-4  fw-semibold">Id</th>
                            <th className="fs-4  fw-semibold">Name</th>
                            <th className="fs-4  fw-semibold">Email</th>
                            <th className="fs-4  fw-semibold">Gender</th>
                            <th className="fs-4  fw-semibold">Status</th>
                            <th className="fs-4 fw-semibold">Delete</th>
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
                                    <DeleteButton id={user.id} onDelete={handleDeleteUser} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
            </div>
        </div>
    );
};

export default Fetchdata;
