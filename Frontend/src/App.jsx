// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeComponent from "./components/EmployeeComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import Table from "./components/Table.jsx";
import Payroll from './components/payroll.jsx';
import PayrollUpdatePage from './components/PayrollUpdatePage.jsx';
import PayslipPage from './components/payslipPage.jsx';
import EmployeeReportPage from './components/EmployeeReportPage.jsx';
import ExpensesTable from './components/ExpensesTable.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import LandingPage from './components/LandingPage'; // Import Landing Page

function App() {
    return (
        <BrowserRouter>
            <HeaderComponent />
            <Routes>
                <Route path="/" element={<Table />} />
                <Route path="/employees" element={<Table />} />
                <Route path="/add-employee" element={<EmployeeComponent />} />
                <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/payrolls" element={<Payroll />} />
                <Route path="/edit-payroll/:id" element={<PayrollUpdatePage />} />
                <Route path="/payslip/:id" element={<PayslipPage />} />
                <Route path="/report/:id" element={<EmployeeReportPage />} />
                <Route path="/expenses" element={<ExpensesTable />} />
                <Route path="/add-expense" element={<ExpenseForm />} />
                <Route path="/edit-expense/:id" element={<ExpenseForm />} />
                <Route path="/landing" element={<LandingPage />} /> {/* New Route */}
            </Routes>
            <FooterComponent />
        </BrowserRouter>
    );
}

export default App;
