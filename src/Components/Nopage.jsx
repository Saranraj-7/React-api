import React from "react";
import './UserForm.css';

const Nopage = () => {
  return (
    <div className="nopage-container">
      <div className="nopage-content">
        <h3>Oops! Page not found</h3>
        <h1 className="page-error">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </h1>
        <h2 >We're sorry, but the page you requested was not found.</h2>
      </div>
    </div>
  );
};

export default Nopage;
