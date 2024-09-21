import axios from 'axios';

// Payroll-related endpoints
const PAYROLL_API_URL = 'http://localhost:8080/payroll';

// Tax and salary-related endpoints
const TAX_N_PAY_API_URL = 'http://localhost:8080/taxNpay';

export const getAllPayrolls = () => axios.get(`${PAYROLL_API_URL}/getAll`);
export const getPayrollById = (id) => axios.get(`${PAYROLL_API_URL}/${id}`);
export const updatePayroll = (id, payroll) => axios.put(`${PAYROLL_API_URL}/update/${id}`, payroll);
export const deletePayrollById = (id) => axios.delete(`${PAYROLL_API_URL}/delete/${id}`);

// New endpoints for tax, UIF, gross salary, net salary, and unpaid leave calculations
export const calculateTax = (salary) => axios.get(`${TAX_N_PAY_API_URL}/taxCalculator`, { params: { salary } });
export const calculateUIF = (salary) => axios.get(`${TAX_N_PAY_API_URL}/uif`, { params: { salary } });
export const getGrossSalary = (id) => axios.get(`${TAX_N_PAY_API_URL}/grossSalary/${id}`);
export const getNetSalary = (id) => axios.get(`${TAX_N_PAY_API_URL}/netSalary/${id}`);
export const getUnpaidLeave = (id) => axios.get(`${TAX_N_PAY_API_URL}/unpaidLeave/${id}`);

// Endpoints for leave days calculations
export const calculateLeaveDaysLeft = (id) => axios.get(`${PAYROLL_API_URL}/calculateLeaveDaysLeft/${id}`);
export const calculateLeaveDaysTaken = (id) => axios.get(`${PAYROLL_API_URL}/calculateLeaveDaysTaken/${id}`);
export const calculateLeaveDaysInMonth = (id) => axios.get(`${PAYROLL_API_URL}/calculateLeaveDaysInMonth/${id}`);
