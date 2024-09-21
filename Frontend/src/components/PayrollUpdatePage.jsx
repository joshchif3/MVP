import React, { useEffect, useState } from 'react';
import { getPayrollById, updatePayroll, updateEmployee } from '../services/payrollService'; // Adjust import path as needed
import { useNavigate, useParams } from 'react-router-dom';

const MAX_LEAVE_DAYS_PER_MONTH = 1.5;

const PayrollUpdatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // State variables for form fields
    const [payroll, setPayroll] = useState({
        name: '',
        surname: '',
        company: '',
        salary: '',
        leaveStartDate: '',
        leaveEndDate: '',
        leaveStatus: '',
        deductions: '',
        rebate: ''
    });

    // State variable for form errors
    const [errors, setErrors] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);

    // Fetch payroll data if id is provided
    useEffect(() => {
        if (id) {
            setIsUpdate(true);
            getPayrollById(id).then((response) => {
                const data = response.data;
                setPayroll({
                    name: data.name || '',
                    surname: data.surname || '',
                    company: data.company || '',
                    salary: data.salary || '',
                    leaveStartDate: data.leaveStartDate || '',
                    leaveEndDate: data.leaveEndDate || '',
                    deductions: data.deductions || '',
                    rebate: data.rebate || ''
                });
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    // Handle form field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPayroll(prevState => ({ ...prevState, [name]: value }));
    };

    // Calculate leave status based on leave dates
    const calculateLeaveStatus = (startDate, endDate) => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const leaveDays = (end - start) / (1000 * 60 * 60 * 24) + 1; // Adding 1 to include the end day
            setPayroll(prev => ({ ...prev, leaveStatus: leaveDays > MAX_LEAVE_DAYS_PER_MONTH ? 'Unpaid' : 'Paid' }));
        } else {
            setPayroll(prev => ({ ...prev, leaveStatus: '' }));
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form fields
        const newErrors = {};
        if (!payroll.name) newErrors.name = 'Name is required';
        if (!payroll.surname) newErrors.surname = 'Surname is required';
        if (!payroll.company) newErrors.company = 'Company is required';
        if (!payroll.salary || isNaN(payroll.salary) || payroll.salary <= 0) newErrors.salary = 'Salary must be a positive number';
        if (!payroll.leaveStartDate) newErrors.leaveStartDate = 'Leave Start Date is required';
        if (!payroll.leaveEndDate) newErrors.leaveEndDate = 'Leave End Date is required';
        if (!payroll.deductions || isNaN(payroll.deductions) || payroll.deductions < 0) newErrors.deductions = 'Deductions must be a non-negative number';
        if (!payroll.rebate || isNaN(payroll.rebate) || payroll.rebate < 0) newErrors.rebate = 'Rebate must be a non-negative number';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            // Update payroll and employee
            await updatePayroll(id, payroll);
            await updateEmployee(id, payroll); // Assuming employee data also needs to be updated
            navigate('/payroll'); // Redirect to payroll page or wherever appropriate
        } catch (error) {
            console.error('Error updating payroll:', error);
        }
    };

    // Handle leave dates change
    useEffect(() => {
        calculateLeaveStatus(payroll.leaveStartDate, payroll.leaveEndDate);
    }, [payroll.leaveStartDate, payroll.leaveEndDate]);

    const handleCancel = () => {
        navigate('/payroll'); // Navigate back to the payroll list or another desired route
    };

    return (
        <div className='container'>
            <h2>{isUpdate ? 'Update Payroll' : 'Add Payroll'}</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={payroll.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {errors.name && <p className='text-danger'>{errors.name}</p>}
                </div>
                <div className='form-group'>
                    <label>Surname:</label>
                    <input
                        type="text"
                        name="surname"
                        value={payroll.surname}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {errors.surname && <p className='text-danger'>{errors.surname}</p>}
                </div>
                <div className='form-group'>
                    <label>Company:</label>
                    <input
                        type="text"
                        name="company"
                        value={payroll.company}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {errors.company && <p className='text-danger'>{errors.company}</p>}
                </div>
                <div className='form-group'>
                    <label>Salary:</label>
                    <input
                        type="number"
                        name="salary"
                        value={payroll.salary}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {errors.salary && <p className='text-danger'>{errors.salary}</p>}
                </div>
                <div className='form-group'>
                    <label>Leave Start Date:</label>
                    <input
                        type="date"
                        name="leaveStartDate"
                        value={payroll.leaveStartDate}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {errors.leaveStartDate && <p className='text-danger'>{errors.leaveStartDate}</p>}
                </div>
                <div className='form-group'>
                    <label>Leave End Date:</label>
                    <input
                        type="date"
                        name="leaveEndDate"
                        value={payroll.leaveEndDate}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {errors.leaveEndDate && <p className='text-danger'>{errors.leaveEndDate}</p>}
                </div>
                <div className='form-group'>
                    <label>Leave Status:</label>
                    <input
                        type="text"
                        name="leaveStatus"
                        value={payroll.leaveStatus}
                        readOnly
                        className="form-control"
                    />
                </div>
                <div className='form-group'>
                    <label>Deductions:</label>
                    <input
                        type="number"
                        name="deductions"
                        value={payroll.deductions}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {errors.deductions && <p className='text-danger'>{errors.deductions}</p>}
                </div>
                <div className='form-group'>
                    <label>Rebate:</label>
                    <input
                        type="number"
                        name="rebate"
                        value={payroll.rebate}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {errors.rebate && <p className='text-danger'>{errors.rebate}</p>}
                </div>
                <div className="form-group d-flex">
                    <button type="submit" className='btn btn-primary me-2'>{isUpdate ? 'Update Payroll' : 'Add Payroll'}</button>
                    <button type="button" className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default PayrollUpdatePage;
