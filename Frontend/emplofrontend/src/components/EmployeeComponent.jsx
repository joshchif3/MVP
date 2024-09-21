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
        navigate('/employees');
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
        return id ? <h2 style={styles.title}>Update Employee</h2> : <h2 style={styles.title}>Add Employee</h2>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {pageTitle()}
                <div style={styles.cardBody}>
                    <form onSubmit={saveOrUpdateEmployee}>
                        {/* Input fields */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>First Name</label>
                            <input
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='firstname'
                                value={firstname}
                                style={errors.firstname ? styles.invalidInput : styles.input}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {errors.firstname && <div style={styles.invalidFeedback}>{errors.firstname}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Last Name</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Last Name'
                                name='lastname'
                                value={lastname}
                                style={errors.lastname ? styles.invalidInput : styles.input}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {errors.lastname && <div style={styles.invalidFeedback}>{errors.lastname}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                type='email'
                                placeholder='Enter Employee Email'
                                name='email'
                                value={email}
                                style={errors.email ? styles.invalidInput : styles.input}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div style={styles.invalidFeedback}>{errors.email}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Address</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Address'
                                name='address'
                                value={address}
                                style={errors.address ? styles.invalidInput : styles.input}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {errors.address && <div style={styles.invalidFeedback}>{errors.address}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Company</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Company'
                                name='company'
                                value={company}
                                style={errors.company ? styles.invalidInput : styles.input}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                            {errors.company && <div style={styles.invalidFeedback}>{errors.company}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Company Term</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Company Term'
                                name='companyTerm'
                                value={companyTerm}
                                style={errors.companyTerm ? styles.invalidInput : styles.input}
                                onChange={(e) => setCompanyTerm(e.target.value)}
                            />
                            {errors.companyTerm && <div style={styles.invalidFeedback}>{errors.companyTerm}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>End Date</label>
                            <input
                                type='date'
                                name='endDate'
                                value={endDate}
                                style={errors.endDate ? styles.invalidInput : styles.input}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            {errors.endDate && <div style={styles.invalidFeedback}>{errors.endDate}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Location</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Location'
                                name='location'
                                value={location}
                                style={errors.location ? styles.invalidInput : styles.input}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            {errors.location && <div style={styles.invalidFeedback}>{errors.location}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Role</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Role'
                                name='role'
                                value={role}
                                style={errors.role ? styles.invalidInput : styles.input}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            {errors.role && <div style={styles.invalidFeedback}>{errors.role}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Salary</label>
                            <input
                                type='number'
                                placeholder='Enter Employee Salary'
                                name='salary'
                                value={salary}
                                style={errors.salary ? styles.invalidInput : styles.input}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                            {errors.salary && <div style={styles.invalidFeedback}>{errors.salary}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Start Date</label>
                            <input
                                type='date'
                                name='startDate'
                                value={startDate}
                                style={errors.startDate ? styles.invalidInput : styles.input}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            {errors.startDate && <div style={styles.invalidFeedback}>{errors.startDate}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Status</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Status'
                                name='status'
                                value={status}
                                style={errors.status ? styles.invalidInput : styles.input}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            {errors.status && <div style={styles.invalidFeedback}>{errors.status}</div>}
                        </div>

                        <div style={styles.buttonContainer}>
                            <button type='submit' style={styles.saveButton}>Save</button>
                            <button type='button' style={styles.cancelButton} onClick={cancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '20px'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px',
        padding: '20px'
    },
    cardBody: {
        marginTop: '20px'
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333'
    },
    formGroup: {
        marginBottom: '15px'
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box'
    },
    invalidInput: {
        width: '100%',
        padding: '10px',
        border: '1px solid red',
        borderRadius: '4px',
        boxSizing: 'border-box'
    },
    invalidFeedback: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    saveButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    cancelButton: {
        backgroundColor: '#6c757d',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default EmployeeComponent;
