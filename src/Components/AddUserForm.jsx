import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function UserFormModal({ handleChange }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    status: 'active'
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get('https://gorest.co.in/public/v2/users', {
      headers: {
        Authorization: `Bearer 79a3b1d569005f3bb059d351efbfc433938986d1c759d0c23bee1a7f32e8d27f`
      }
    })
      .then(res => {
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log(formData,"ji");

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);

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
      console.log("API Response:", response.data);

      setFormData({
        name: "",
        email: "",
        gender: "",
        status: "active"
      });


      setShow(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <>
      <Button  variant="primary" onClick={handleShow}>
        Add New User
      </Button>

      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit} className="row g-3 ">
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="gender" className="form-label">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleFormChange}
                className="form-select"
                required
              >
                <option value="">Select</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="status" className="form-label">
                Status:
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className="form-select"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-success">
                Add User
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserFormModal;
