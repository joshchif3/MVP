import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderComponent.css'; // Add this line if you are using a separate CSS file

const HeaderComponent = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Link className="navbar-brand" to="/">Employee Management SYS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
          <li className="nav-item">
              <Link className="nav-link" to="/landing">Landing Page</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Employee Table</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/payroll">Payroll Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/expenses">Expenses</Link>
            </li>
            {/* Add the Landing Page Link here */}
            
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
