import React from 'react';
import Sidebar from './Components/Sidebar';
import { Row, Col } from 'react-bootstrap';
import './App.css';
import UsersTable from './Components/Fetchdata';
import Header from './Components/Header';


function App() {
  return (
<div className='App'>
  <Row>
    <Header/>
        <Col xs={2} className=''><Sidebar/>
        </Col>
        <Col xs={9} className=''><UsersTable/>
        </Col>
        </Row>  
     </div>

  );
}

export default App;
