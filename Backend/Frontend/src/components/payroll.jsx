import React, { useEffect, useState } from 'react';
import { getAllPayrolls, calculateUIF } from '../services/payrollService';
import { useNavigate } from 'react-router-dom';


const MAX_LEAVE_DAYS_PER_MONTH = 1.5;

const PayrollTable = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllPayrolls();
    }, []);

    async function fetchAllPayrolls() {
        try {
            const response = await getAllPayrolls();
            const payrollsWithUIF = await Promise.all(response.data.map(async (payroll) => {
                try {
                    const uifResponse = await calculateUIF(payroll.salaryPerMonth);
                    return {
                        ...payroll,
                        uiF: uifResponse.data,
                        leaveStatus: payroll.leaveDaysTakenPerMonth > MAX_LEAVE_DAYS_PER_MONTH ? 'Unpaid' : 'Paid'
                    };
                } catch (error) {
                    console.error(error);
                    return payroll; // Return the original payroll in case of error
                }
            }));
            setPayrolls(payrollsWithUIF);
        } catch (error) {
            console.error(error);
        }
    }

    function handleAddNewPayroll() {
        navigate('/add-payroll');
    }

    function handleUpdatePayroll(id) {
        navigate(`/edit-payroll/${id}`);
    }

    function handleGeneratePayslip(id) {
        navigate(`/payslip/${id}`);
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPayrolls = payrolls.filter(payroll => {
        const fields = [
            payroll.name || '',
            payroll.surname || '',
            payroll.company || '',
            payroll.salary || '',
            payroll.salaryAfterTaxPerYear || '',
            payroll.salaryPerMonth || '',
            payroll.salaryAfterTaxPerMonth || '',
            payroll.leaveStartDate || '',
            payroll.leaveEndDate || '',
            payroll.leaveDaysTaken || '',
            payroll.leaveDaysLeft || '',
            payroll.isLeavePaid ? 'Paid' : 'Unpaid',
            payroll.deductions || '',
            payroll.rebate || '',
            payroll.uiF || ''
        ];
        return fields.some(field => field.toString().toLowerCase().includes(searchTerm.toLowerCase()));
    });

    const totalEmployees = payrolls.length;
    const accumulatedSalaries = payrolls.reduce((total, payroll) => total + (parseFloat(payroll.salary) || 0), 0);

    return (
        <div className='container'>
            <br />
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="info-box">
                        <strong>Total Number of Employees: </strong>{totalEmployees}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="info-box">
                        <strong>Accumulated Salaries: </strong>R{accumulatedSalaries.toFixed(2)}
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control mb-3"
                />
            </div>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Company</th>
                        <th>Salary (Yearly)</th>
                        <th>Salary After Tax (Yearly)</th>
                        <th>Salary (Monthly)</th>
                        <th>Salary After Tax (Monthly)</th>
                        <th>Leave Start Date</th>
                        <th>Leave End Date</th>
                        <th>Leave Days Taken</th>
                        <th>Leave Days Left</th>
                        <th>Leave Status</th>
                        <th>Deductions</th>
                        <th>Rebate</th>
                        <th>UIF</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPayrolls.map(payroll => (
                        <tr key={payroll.id}>
                            <td>{payroll.name || 'N/A'}</td>
                            <td>{payroll.surname || 'N/A'}</td>
                            <td>{payroll.company || 'N/A'}</td>
                            <td>{payroll.salary ? `R${payroll.salary}` : 'N/A'}</td>
                            <td>{payroll.salaryAfterTaxPerYear ? `R${payroll.salaryAfterTaxPerYear}` : 'N/A'}</td>
                            <td>{payroll.salaryPerMonth ? `R${payroll.salaryPerMonth}` : 'N/A'}</td>
                            <td>{payroll.salaryAfterTaxPerMonth ? `R${payroll.salaryAfterTaxPerMonth}` : 'N/A'}</td>
                            <td>{payroll.leaveStartDate ? new Date(payroll.leaveStartDate).toLocaleDateString() : 'N/A'}</td>
                            <td>{payroll.leaveEndDate ? new Date(payroll.leaveEndDate).toLocaleDateString() : 'N/A'}</td>
                            <td>{payroll.leaveDaysTaken || 'N/A'}</td>
                            <td>{payroll.leaveDaysLeft || 'N/A'}</td>
                            <td>{payroll.isLeavePaid ? 'Paid' : 'Unpaid'}</td>
                            <td>{payroll.deductions ? `R${payroll.deductions}` : 'N/A'}</td>
                            <td>{payroll.rebate ? `R${payroll.rebate}` : 'N/A'}</td>
                            <td>{payroll.uiF ? `R${payroll.uiF}` : 'N/A'}</td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={() => handleUpdatePayroll(payroll.id)}>
                                    Update
                                </button>
                                <button className="btn btn-secondary btn-sm mx-2" onClick={() => handleGeneratePayslip(payroll.id)}>
                                    Generate Payslip
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-success" onClick={handleAddNewPayroll}>
                Add New Payroll
            </button>
        </div>
    );
};

export default PayrollTable;
