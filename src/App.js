import React, { useEffect,useState } from 'react';
import Sidebar from './Components/Sidebar';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import UsersTable from './Components/Fetchdata';
import Nopage from './Components/Nopage';
import Userdetails from './Components/Userdetails';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
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

  return (
    <div className='App'>
   
    <Row>
        <Col xs={2} className=''><Sidebar />
        </Col>
        <Col xs={10} className=''>
        <Routes>
       
        <Route path="/" element={<UsersTable />}/>
        <Route path="/Userdetails/:userId" element={<Userdetails/>}/>
        <Route path="*" element={<Nopage/>}/>
      
      </Routes> 
        </Col>
      </Row>
   
    </div>

  );
}
export default App;






