import React, { useEffect, useState } from 'react';
import { deleteEmployeeById, listEmployees } from '../services/employeeservice';
import { useNavigate } from 'react-router-dom';

export const getAllEmployees = () => {
    return listEmployees().then(response => response.data).catch(error => {
        console.error(error);
        return [];
    });
};

const Table = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees().then(data => {
            // Sort employees by ID in descending order
            const sortedEmployees = data.sort((a, b) => b.id - a.id);
            setEmployees(sortedEmployees);
        });
    }, []);

    function handleGeneratePayslip(id) {
        navigator(`/payslip/${id}`);
    }

    function handleGenerateReport(id) {
        navigator(`/report/${id}`);
    }

    function addNewEmployee() {
        navigator('/add-employee');
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function deleteEmployee(id) {
        console.log(id);
        deleteEmployeeById(id).then(() => {
            getAllEmployees().then(data => setEmployees(data));
        }).catch(error => console.error(error));
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container'>
            <h2>Employee Details</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>ADD EMPLOYEE</button>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control mb-3"
            />
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Address</th>
                        <th>Company</th>
                        <th>Company Term</th>
                        <th>Email</th>
                        <th>End Date</th>
                        <th>Location</th>
                        <th>Role</th>
                        <th>Salary</th>
                        <th>Start Date</th>
                        <th>Status</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredEmployees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.surname}</td>
                                <td>{employee.address}</td>
                                <td>{employee.company}</td>
                                <td>{employee.companyTerm}</td>
                                <td>{employee.email}</td>
                                <td>{employee.endDate}</td>
                                <td>{employee.location}</td>
                                <td>{employee.role}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.startDate}</td>
                                <td>{employee.status}</td>
                                <td className='action-buttons'>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-secondary' onClick={() => handleGeneratePayslip(employee.id)}>Payslip</button>
                                    <button className='btn btn-warning' onClick={() => handleGenerateReport(employee.id)}>Report</button>
    
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Table;
