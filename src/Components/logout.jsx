import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LogoutButton({handleLogout}) {


  return (
    <Button className='btn btn-dark' onClick={handleLogout}>Logout</Button>
  );
}

export default LogoutButton;
