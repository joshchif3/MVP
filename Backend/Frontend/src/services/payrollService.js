import axios from 'axios';

// Payroll-related endpoints
const PAYROLL_API_URL = 'http://localhost:8080/payroll';

// Tax and salary-related endpoints
const TAX_N_PAY_API_URL = 'http://localhost:8080/taxNpay';

// Leave-related endpoints
const LEAVE_API_URL = 'http://localhost:8080/leave';

// Employee update endpoint
const UPDATE_EMPLOYEE_API_URL = 'http://localhost:8080/employee/update';

// Rebate calculation function
export const calculateRebate = (salary, deductions) => 
  axios.get(`${TAX_N_PAY_API_URL}/rebateCalculator`, { params: { salary, deductions } });

// Employee update function
export const updateEmployee = (employeeId, employee) => 
  axios.put(`${UPDATE_EMPLOYEE_API_URL}/${employeeId}`, employee);

// Payroll-related functions
export const getAllPayrolls = () => axios.get(`${PAYROLL_API_URL}/getAll`);
export const getPayrollById = (id) => axios.get(`${PAYROLL_API_URL}/${id}`);
export const updatePayroll = (id, payroll) => 
  axios.put(`${PAYROLL_API_URL}/update/${id}`, payroll);
export const deletePayrollById = (id) => axios.delete(`${PAYROLL_API_URL}/delete/${id}`);

// Tax and salary calculation functions
export const calculateTax = (salary, deductions, rebate) => 
  axios.get(`${TAX_N_PAY_API_URL}/taxCalculator`, { params: { salary, deductions, rebate } });
export const calculateUIF = (salary) => axios.get(`${TAX_N_PAY_API_URL}/uif`, { params: { salary } });
export const getGrossSalary = (id) => axios.get(`${TAX_N_PAY_API_URL}/grossSalary/${id}`);
export const getNetSalary = (id) => axios.get(`${TAX_N_PAY_API_URL}/netSalary/${id}`);
export const getUnpaidLeave = (id) => axios.get(`${TAX_N_PAY_API_URL}/unpaidLeave/${id}`);

// Leave days calculation functions
export const calculateLeaveDaysLeft = (id) => 
  axios.get(`${LEAVE_API_URL}/leaveDaysForYear`, { params: { payPersonId: id } });
export const calculateLeaveDaysTaken = (id) => 
  axios.get(`${LEAVE_API_URL}/leaveDaysForMonth`, { params: { payPersonId: id } });
export const calculateLeaveDaysInMonth = () => axios.get(`${LEAVE_API_URL}/leaveDaysPerMonth`);

// Leave update function
export const updateLeave = (payPersonId, leaveStartDate, leaveEndDate, isPaid) => 
  axios.post(`${LEAVE_API_URL}/updateLeave`, null, { params: { payPersonId, leaveStartDate, leaveEndDate, isPaid } });

// Leave payout calculation function
export const calculateLeavePayout = (salary, leaveDaysToPayOut) => 
  axios.get(`${LEAVE_API_URL}/payoutForLeave`, { params: { salary, leaveDaysToPayOut } });
