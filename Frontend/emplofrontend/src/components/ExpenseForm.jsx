import React, { useEffect, useState } from 'react';
import { createExpense, getExpenseById, updateExpense } from '../services/ExpensesService';
import { useNavigate, useParams } from 'react-router-dom';

const ExpenseForm = () => {
    const [expense, setExpense] = useState({
        company: '',
        service: '',
        amount: '',
        date: '',
        dateDueForPayment: ''
    });
    const [isUpdate, setIsUpdate] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setIsUpdate(true);
            getExpenseById(id).then(response => setExpense(response.data)).catch(error => console.error(error));
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExpense(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isUpdate) {
            updateExpense(id, expense).then(() => navigate('/expenses')).catch(error => console.error(error));
        } else {
            createExpense(expense).then(() => navigate('/expenses')).catch(error => console.error(error));
        }
    };

    const handleCancel = () => {
        navigate('/expenses'); // Navigate back to the expenses list or another desired route
    };

    return (
        <div className='container'>
            <h2>{isUpdate ? 'Update Expense' : 'Add Expense'}</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Company:</label>
                    <input
                        type="text"
                        name="company"
                        value={expense.company}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Service:</label>
                    <input
                        type="text"
                        name="service"
                        value={expense.service}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={expense.date}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Date Due For Payment:</label>
                    <input
                        type="date"
                        name="dateDueForPayment"
                        value={expense.dateDueForPayment}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group d-flex">
                    <button type="submit" className='btn btn-primary me-2'>{isUpdate ? 'Update' : 'Add'} Expense</button>
                    <button type="button" className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;
