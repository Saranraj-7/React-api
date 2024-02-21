import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';







const Header = ({selectedComponent,setSelectedComponent}) => {
return (
<Row className='m-0 header'>
   <Col xs={10} lg={12} xl={12} className='p-4'>
   <div className='d-flex justify-content-between'>
      <div>
         {/* <img src={fts2} alt="Description of the " style={{ width: '80px', height: '40px'}} /> */}
         <span className='d-lg-none d-xl-inline-flex  fs-3 fw-semibold  ms-2'>SGS</span>
      </div>
    
      <div className='mt-2 d-lg-inline-flex  d-none'>
         <span className='ms-xl-5  fs-5' >What we do</span>
         <span className='ms-xl-5 ms-3 fs-5'>Who we are</span>
         <span className='ms-xl-5 ms-3 fs-5'>Insights</span>
         <span className='ms-xl-5 ms-3 fs-5'>Carrers</span>
         <span className='ms-xl-5 ms-3 fs-5'>Investors</span>
         <span className='ms-xl-5 ms-3 fs-5'>Contact Us</span>
       
         {/* <Icon icon="iconoir:profile-circle"  className='ms-xl-5 ms-3 d-flex justify-content-end'  style={{ fontSize: '28px' }} /> */}
         
         
         
         
      </div>
   </div>
   </Col>
   <Col xs={2} className='p-0 d-block align-items-center d-lg-none d-inline-flex'>
   {/* <Canvas selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent} /> */}
   </Col>
</Row>
);
};
export default Header;