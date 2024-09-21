import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Add any custom styles for this page

const LandingPage = () => {
    const navigate = useNavigate();

    const handleNavigateToEmployees = () => {
        navigate('/employees');
    };

    const handleNavigateToPayroll = () => {
        navigate('/payroll');
    };

    const handleNavigateToExpenses = () => {
        navigate('/expenses');
    };

    return (
        <div className="landing-page">
            <header className="header text-center">
                <h1>Welcome to the Employee and Payroll Management System</h1>
                <p>Manage your employee records and payroll effortlessly.</p>
            </header>
            <div className="content">
                <div className="card-deck">
                    <div className="card">
                        <h2>Employee Management</h2>
                        <p>View, add, update, and manage your employees' details.</p>
                        <button className="btn btn-primary" onClick={handleNavigateToEmployees}>
                            Manage Employees
                        </button>
                    </div>
                    <div className="card">
                        <h2>Payroll Management</h2>
                        <p>Handle payroll information, including salary details and leave days.</p>
                        <button className="btn btn-primary" onClick={handleNavigateToPayroll}>
                            Manage Payroll
                        </button>
                    </div>
                    <div className="card">
                        <h2>Expenses</h2>
                        <p>Track your company expenses efficiently.</p>
                        <button className="btn btn-primary" onClick={handleNavigateToExpenses}>
                            Manage Expenses
                        </button>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <p>&copy; 2024 Employee and Payroll Management System. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
