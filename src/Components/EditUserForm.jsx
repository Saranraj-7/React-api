import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditUserForm = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        status: ''
    });

    useEffect(() => {
        setFormData({ ...user });
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                    <input className="input-field" type="text" name="gender" value={formData.gender} onChange={handleInputChange} />
                </div>
                <div>
                    <h5>Status</h5>
                    <input className="input-field" type="text" name="status" value={formData.status} onChange={handleInputChange} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserForm;
