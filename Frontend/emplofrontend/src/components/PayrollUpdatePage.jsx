import React, { useEffect, useState } from 'react'; 
import { getPayrollById, updatePayroll, updateEmployee } from '../services/payrollService'; // Adjust import path as needed
import { useNavigate, useParams } from 'react-router-dom';

const MAX_LEAVE_DAYS_PER_MONTH = 1.5;

const PayrollUpdatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // State variables for form fields
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [company, setCompany] = useState('');
    const [salary, setSalary] = useState('');
    const [leaveStartDate, setLeaveStartDate] = useState('');
    const [leaveEndDate, setLeaveEndDate] = useState('');
    const [leaveStatus, setLeaveStatus] = useState('');
    const [deductions, setDeductions] = useState('');
    const [rebate, setRebate] = useState('');

    // State variable for form errors
    const [errors, setErrors] = useState({});

    // Fetch payroll data if id is provided
    useEffect(() => {
        if (id) {
            getPayrollById(id).then((response) => {
                const data = response.data;
                setName(data.name || '');
                setSurname(data.surname || '');
                setCompany(data.company || '');
                setSalary(data.salary || '');
                setLeaveStartDate(data.leaveStartDate || '');
                setLeaveEndDate(data.leaveEndDate || '');
                setDeductions(data.deductions || '');
                setRebate(data.rebate || '');
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    // Calculate leave status based on leave dates
    function calculateLeaveStatus(startDate, endDate) {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const leaveDays = (end - start) / (1000 * 60 * 60 * 24) + 1; // Adding 1 to include the end day
            setLeaveStatus(leaveDays > MAX_LEAVE_DAYS_PER_MONTH ? 'Unpaid' : 'Paid');
        } else {
            setLeaveStatus('');
        }
    }

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form fields
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!surname) newErrors.surname = 'Surname is required';
        if (!company) newErrors.company = 'Company is required';
        if (!salary || isNaN(salary) || salary <= 0) newErrors.salary = 'Salary must be a positive number';
        if (!leaveStartDate) newErrors.leaveStartDate = 'Leave Start Date is required';
        if (!leaveEndDate) newErrors.leaveEndDate = 'Leave End Date is required';
        if (!deductions || isNaN(deductions) || deductions < 0) newErrors.deductions = 'Deductions must be a non-negative number';
        if (!rebate || isNaN(rebate) || rebate < 0) newErrors.rebate = 'Rebate must be a non-negative number';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        // Prepare the payroll data to update
        const payrollData = {
            name,
            surname,
            company,
            salary: parseFloat(salary),
            leaveStartDate,
            leaveEndDate,
            leaveStatus,
            deductions: parseFloat(deductions),
            rebate: parseFloat(rebate),
        };

        try {
            // Update payroll and employee
            await updatePayroll(id, payrollData);
            await updateEmployee(id, payrollData); // Assuming employee data also needs to be updated
            navigate('/payroll'); // Redirect to payroll page or wherever appropriate
        } catch (error) {
            console.error('Error updating payroll:', error);
        }
    };

    // Handle leave dates change
    useEffect(() => {
        calculateLeaveStatus(leaveStartDate, leaveEndDate);
    }, [leaveStartDate, leaveEndDate]);

    return (
        <div>
            <h2>Update Payroll</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label>Surname</label>
                    <input 
                        type="text" 
                        value={surname} 
                        onChange={(e) => setSurname(e.target.value)} 
                    />
                    {errors.surname && <p>{errors.surname}</p>}
                </div>
                <div>
                    <label>Company</label>
                    <input 
                        type="text" 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                    />
                    {errors.company && <p>{errors.company}</p>}
                </div>
                <div>
                    <label>Salary</label>
                    <input 
                        type="number" 
                        value={salary} 
                        onChange={(e) => setSalary(e.target.value)} 
                    />
                    {errors.salary && <p>{errors.salary}</p>}
                </div>
                <div>
                    <label>Leave Start Date</label>
                    <input 
                        type="date" 
                        value={leaveStartDate} 
                        onChange={(e) => setLeaveStartDate(e.target.value)} 
                    />
                    {errors.leaveStartDate && <p>{errors.leaveStartDate}</p>}
                </div>
                <div>
                    <label>Leave End Date</label>
                    <input 
                        type="date" 
                        value={leaveEndDate} 
                        onChange={(e) => setLeaveEndDate(e.target.value)} 
                    />
                    {errors.leaveEndDate && <p>{errors.leaveEndDate}</p>}
                </div>
                <div>
                    <label>Leave Status</label>
                    <input 
                        type="text" 
                        value={leaveStatus} 
                        readOnly
                    />
                </div>
                <div>
                    <label>Deductions</label>
                    <input 
                        type="number" 
                        value={deductions} 
                        onChange={(e) => setDeductions(e.target.value)} 
                    />
                    {errors.deductions && <p>{errors.deductions}</p>}
                </div>
                <div>
                    <label>Rebate</label>
                    <input 
                        type="number" 
                        value={rebate} 
                        onChange={(e) => setRebate(e.target.value)} 
                    />
                    {errors.rebate && <p>{errors.rebate}</p>}
                </div>
                <button type="submit">Update Payroll</button>
            </form>
        </div>
    );
};

export default PayrollUpdatePage;
