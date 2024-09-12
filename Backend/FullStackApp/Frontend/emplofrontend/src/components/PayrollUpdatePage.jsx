import React, { useEffect, useState } from 'react';
import { getPayrollById, updatePayroll } from '../services/payrollService'; // Adjust import path as needed
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

    // State variable for form errors
    const [errors, setErrors] = useState({
        name: '',
        surname: '',
        company: '',
        salary: '',
        leaveStartDate: '',
        leaveEndDate: '',
        leaveStatus: ''
    });

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
                setLeaveStatus(data.leaveStatus || '');
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

    // Save or update payroll data
    function saveOrUpdatePayroll(e) {
        e.preventDefault();

        if (validateForm()) {
            const payroll = { 
                name, 
                surname, 
                company, 
                salary, 
                leaveStartDate, 
                leaveEndDate,
                leaveStatus
            };

            if (id) {
                updatePayroll(id, payroll).then(() => {
                    navigate('/payrolls');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                // Handle create payroll if necessary
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };
    
        if (name.trim()) {
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Name is required';
            valid = false;
        }
    
        if (surname.trim()) {
            errorsCopy.surname = '';
        } else {
            errorsCopy.surname = 'Surname is required';
            valid = false;
        }
    
        if (company.trim()) {
            errorsCopy.company = '';
        } else {
            errorsCopy.company = 'Company is required';
            valid = false;
        }
    
        if (salary.toString().trim()) {
            errorsCopy.salary = '';
        } else {
            errorsCopy.salary = 'Salary is required';
            valid = false;
        }
    
        if (leaveStartDate.trim()) {
            errorsCopy.leaveStartDate = '';
        } else {
            errorsCopy.leaveStartDate = 'Leave Start Date is required';
            valid = false;
        }
    
        if (leaveEndDate.trim()) {
            errorsCopy.leaveEndDate = '';
        } else {
            errorsCopy.leaveEndDate = 'Leave End Date is required';
            valid = false;
        }

        if (!leaveStatus) {
            errorsCopy.leaveStatus = 'Leave Status is required';
            valid = false;
        } else {
            errorsCopy.leaveStatus = '';
        }
    
        setErrors(errorsCopy);
        return valid;
    }

    return (
        <div className='container'>
            <h2 className='text-center'>{id ? 'Update Payroll' : 'Add Payroll'}</h2>
            <form onSubmit={saveOrUpdatePayroll}>
                {/* Render form fields with validation */}
                <div className='form-group mb-2'>
                    <label className='form-label'>Name</label>
                    <input
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                </div>
                <div className='form-group mb-2'>
                    <label className='form-label'>Surname</label>
                    <input
                        type='text'
                        placeholder='Enter Surname'
                        value={surname}
                        className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    {errors.surname && <div className='invalid-feedback'>{errors.surname}</div>}
                </div>
                <div className='form-group mb-2'>
                    <label className='form-label'>Company</label>
                    <input
                        type='text'
                        placeholder='Enter Company'
                        value={company}
                        className={`form-control ${errors.company ? 'is-invalid' : ''}`}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    {errors.company && <div className='invalid-feedback'>{errors.company}</div>}
                </div>
                <div className='form-group mb-2'>
                    <label className='form-label'>Salary</label>
                    <input
                        type='text'
                        placeholder='Enter Salary'
                        value={salary}
                        className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                    {errors.salary && <div className='invalid-feedback'>{errors.salary}</div>}
                </div>
                <div className='form-group mb-2'>
                    <label className='form-label'>Leave Start Date</label>
                    <input
                        type='date'
                        value={leaveStartDate}
                        className={`form-control ${errors.leaveStartDate ? 'is-invalid' : ''}`}
                        onChange={(e) => {
                            setLeaveStartDate(e.target.value);
                            calculateLeaveStatus(e.target.value, leaveEndDate);
                        }}
                    />
                    {errors.leaveStartDate && <div className='invalid-feedback'>{errors.leaveStartDate}</div>}
                </div>
                <div className='form-group mb-2'>
                    <label className='form-label'>Leave End Date</label>
                    <input
                        type='date'
                        value={leaveEndDate}
                        className={`form-control ${errors.leaveEndDate ? 'is-invalid' : ''}`}
                        onChange={(e) => {
                            setLeaveEndDate(e.target.value);
                            calculateLeaveStatus(leaveStartDate, e.target.value);
                        }}
                    />
                    {errors.leaveEndDate && <div className='invalid-feedback'>{errors.leaveEndDate}</div>}
                </div>
                <div className='form-group mb-2'>
                    <label className='form-label'>Leave Status</label>
                    <select
                        value={leaveStatus}
                        className={`form-control ${errors.leaveStatus ? 'is-invalid' : ''}`}
                        onChange={(e) => setLeaveStatus(e.target.value)}
                    >
                        <option value=''>Select Leave Status</option>
                        <option value='Paid'>Paid</option>
                        <option value='Unpaid'>Unpaid</option>
                    </select>
                    {errors.leaveStatus && <div className='invalid-feedback'>{errors.leaveStatus}</div>}
                </div>
                <button type='submit' className='btn btn-primary'>Save</button>
                <button type='button' className='btn btn-secondary ms-2' onClick={() => navigate('/payrolls')}>Cancel</button>
            </form>
        </div>
    );
}

export default PayrollUpdatePage;
