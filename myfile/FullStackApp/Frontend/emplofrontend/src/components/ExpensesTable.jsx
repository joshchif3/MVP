import React, { useEffect, useState } from 'react';
import { listExpenses, deleteExpenseById } from '../services/ExpensesService';
import { useNavigate } from 'react-router-dom';

const ExpensesTable = () => {
    const [expenses, setExpenses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        listExpenses().then(response => setExpenses(response.data)).catch(error => console.error(error));
    }, []);

    const handleUpdate = (id) => {
        navigate(`/edit-expense/${id}`);
    };

    const handleDelete = (id) => {
        deleteExpenseById(id).then(() => {
            listExpenses().then(response => setExpenses(response.data)).catch(error => console.error(error));
        }).catch(error => console.error(error));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredExpenses = expenses.filter(expense =>
        expense.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.amount.toString().includes(searchTerm)
    );

    return (
        <div className='container'>
            <h2>Company Expenses</h2>
            <button className='btn btn-primary mb-2' onClick={() => navigate('/add-expense')}>ADD EXPENSE</button>
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
                        <th>Company</th>
                        <th>Service</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Date Due</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredExpenses.map(expense =>
                        <tr key={expense.id}>
                            <td>{expense.company}</td>
                            <td>{expense.service}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.date}</td>
                            <td>{expense.dateDueForPayment}</td>
                            <td className="action-buttons">
                                <button className='btn btn-info' onClick={() => handleUpdate(expense.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => handleDelete(expense.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ExpensesTable;
