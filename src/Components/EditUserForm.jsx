import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditUserForm = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        status: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        setFormData({ ...user }); 
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value); // Validate the field on change
    };

    const validateField = (name, value) => {
        let errorMessage = '';
        switch (name) {
            case 'name':
                errorMessage = value.trim() === '' ? 'Name is required' : '';
                break;
            case 'email':
                errorMessage = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format';
                break;
            default:
                break;
        }
        setErrors({ ...errors, [name]: errorMessage });
    };

    const handleSave = () => {
        if (Object.values(errors).every(error => error === '')) {
            onSave(formData);
            onClose();
        }   
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
                        {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} />
                        {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="text" name="gender" value={formData.gender} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control type="text" name="status" value={formData.status} onChange={handleInputChange} />
                    </Form.Group>
                </Form>
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
