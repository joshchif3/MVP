import React, { useEffect, useState } from 'react';
import { createEmploye, getEmployeeById, updateEmployee } from '../services/employeeservice';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [company, setCompany] = useState('');
    const [companyTerm, setCompanyTerm] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [role, setRole] = useState('');
    const [salary, setSalary] = useState('');
    const [startDate, setStartDate] = useState('');
    const [status, setStatus] = useState('');

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        company: '',
        companyTerm: '',
        endDate: '',
        location: '',
        role: '',
        salary: '',
        startDate: '',
        status: ''
    });

    useEffect(() => {
        if (id) {
            getEmployeeById(id).then((response) => {
                const data = response.data;
                setFirstName(data.name);
                setLastName(data.surname);
                setEmail(data.email);
                setAddress(data.address);
                setCompany(data.company);
                setCompanyTerm(data.companyTerm);
                setEndDate(data.endDate);
                setLocation(data.location);
                setRole(data.role);
                setSalary(data.salary);
                setStartDate(data.startDate);
                setStatus(data.status);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function saveOrUpdateEmployee(e) {
        e.preventDefault();
    
        if (validateForm()) {
            const employee = { 
                name: firstname, 
                surname: lastname, 
                address, 
                company, 
                companyTerm, 
                email, 
                endDate, 
                location, 
                role, 
                salary, 
                startDate, 
                status 
            };
    
            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createEmploye(employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

    function cancel() {
        navigate('/employees'); // Navigate to the employee list or another desired page
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstname.trim()) {
            errorsCopy.firstname = '';
        } else {
            errorsCopy.firstname = 'First name is required';
            valid = false;
        }

        if (lastname.trim()) {
            errorsCopy.lastname = '';
        } else {
            errorsCopy.lastname = 'Last name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if (address.trim()) {
            errorsCopy.address = '';
        } else {
            errorsCopy.address = 'Address is required';
            valid = false;
        }

        if (company.trim()) {
            errorsCopy.company = '';
        } else {
            errorsCopy.company = 'Company is required';
            valid = false;
        }

        if (companyTerm.trim()) {
            errorsCopy.companyTerm = '';
        } else {
            errorsCopy.companyTerm = 'Company term is required';
            valid = false;
        }

        if (endDate.trim()) {
            errorsCopy.endDate = '';
        } else {
            errorsCopy.endDate = 'End date is required';
            valid = false;
        }

        if (location.trim()) {
            errorsCopy.location = '';
        } else {
            errorsCopy.location = 'Location is required';
            valid = false;
        }

        if (role.trim()) {
            errorsCopy.role = '';
        } else {
            errorsCopy.role = 'Role is required';
            valid = false;
        }

        // Handle salary validation
        if (salary || salary === 0) {
            errorsCopy.salary = '';
        } else {
            errorsCopy.salary = 'Salary is required';
            valid = false;
        }

        if (startDate.trim()) {
            errorsCopy.startDate = '';
        } else {
            errorsCopy.startDate = 'Start date is required';
            valid = false;
        }

        if (status.trim()) {
            errorsCopy.status = '';
        } else {
            errorsCopy.status = 'Status is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        return id ? <h2 className='text-center'>Update Employee</h2> : <h2 className='text-center'>Add Employee</h2>;
    }

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form onSubmit={saveOrUpdateEmployee}>
                            {/* Input fields */}
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    name='firstname'
                                    value={firstname}
                                    className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    name='lastname'
                                    value={lastname}
                                    className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email</label>
                                <input
                                    type='email'
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Address</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Address'
                                    name='address'
                                    value={address}
                                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Company</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Company'
                                    name='company'
                                    value={company}
                                    className={`form-control ${errors.company ? 'is-invalid' : ''}`}
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                                {errors.company && <div className='invalid-feedback'>{errors.company}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Company Term</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Company Term'
                                    name='companyTerm'
                                    value={companyTerm}
                                    className={`form-control ${errors.companyTerm ? 'is-invalid' : ''}`}
                                    onChange={(e) => setCompanyTerm(e.target.value)}
                                />
                                {errors.companyTerm && <div className='invalid-feedback'>{errors.companyTerm}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>End Date</label>
                                <input
                                    type='date'
                                    name='endDate'
                                    value={endDate}
                                    className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                                {errors.endDate && <div className='invalid-feedback'>{errors.endDate}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Location</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Location'
                                    name='location'
                                    value={location}
                                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                {errors.location && <div className='invalid-feedback'>{errors.location}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Role</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Role'
                                    name='role'
                                    value={role}
                                    className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                {errors.role && <div className='invalid-feedback'>{errors.role}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Salary</label>
                                <input
                                    type='number'
                                    placeholder='Enter Employee Salary'
                                    name='salary'
                                    value={salary}
                                    className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                                {errors.salary && <div className='invalid-feedback'>{errors.salary}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Start Date</label>
                                <input
                                    type='date'
                                    name='startDate'
                                    value={startDate}
                                    className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                {errors.startDate && <div className='invalid-feedback'>{errors.startDate}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Status</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Status'
                                    name='status'
                                    value={status}
                                    className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                {errors.status && <div className='invalid-feedback'>{errors.status}</div>}
                            </div>
                            <button type='submit' className='btn btn-primary'>Save</button>
                            <button type='button' className='btn btn-secondary ms-2' onClick={cancel}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
