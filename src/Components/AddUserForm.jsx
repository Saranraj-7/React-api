import React, { useState } from "react";
import axios from "axios";

const UserForm = ({ authToken }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

      // Reset form data after successful 
      setFormData({
        name: "",
        email: "",
        gender: "",
        status: "",
      });
    } catch (error) {
      console.error("Error adding user:", error); 
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="row g-3">
      <div className="col-md-6 mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
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
          onChange={handleChange}
          className="form-select"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </div>
    </form>
  );
};

export default UserForm;
