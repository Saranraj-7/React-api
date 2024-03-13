import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import { Row, Col } from 'react-bootstrap';
import './App.css';
import UsersTable from './Components/Fetchdata';
import Nopage from './Components/Nopage';
import Userdetails from './Components/Userdetails';
import LoginPage from './Components/Loginpage';
import Fetchdata from './Components/Fetchdata';
import PrivateRoutes from './Components/Privateroute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);
  return (
    <div className='App'>
      
      
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/fetchdata" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>

      {isLoggedIn && (
        <Row>
          <Col xs={2} className=''><Sidebar /></Col>
          <Col xs={10} className=''>
            <Routes>
              <Route path="/fetchdata" element={<PrivateRoutes isLoggedIn={isLoggedIn}> <Fetchdata setIsLoggedIn={setIsLoggedIn} /> </PrivateRoutes>} />
              <Route path="/Userdetails/:userId" element={<PrivateRoutes isLoggedIn={isLoggedIn}> <Userdetails /> </PrivateRoutes> } />
              <Route path="*" element={<Nopage />} />
            </Routes>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default App;
