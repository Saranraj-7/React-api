// AddUserForm.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const AddUserForm = ({ onAdd }) => {
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
              email: '',
              gender: '',
              status: ''
            }}
            validate={values => {
              const errors = {};
              if (!values.name) {
                errors.name = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, { }) => {
              onAdd(values);
              handleClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <h5>Name</h5>
                  <Field className="input-field" type="text" name="name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div>
                  <h5>Email</h5>
                  <Field className="input-field" type="email" name="email" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div>
                  <h5>Gender</h5>
                  <Field as="select" className="input-field" name="gender">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="error" />
                </div>
                <div>
                  <h5>Status</h5>
                  <Field as="select" className="input-field" name="status">
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="error" />
                </div>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    Add User
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddUserForm;
