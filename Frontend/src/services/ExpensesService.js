import axios from "axios";

const BASE_URL = 'http://localhost:8080/expenses';

// Updated API endpoints to match the Spring Boot controller
export const listExpenses = () => axios.get(BASE_URL); // Matches @GetMapping in ExpensesController
export const createExpense = (expense) => axios.post(BASE_URL, expense); // Matches @PostMapping in ExpensesController
export const getExpenseById = (id) => axios.get(`${BASE_URL}/${id}`); // Matches @GetMapping("/{id}") in ExpensesController
export const updateExpense = (id, expense) => axios.put(`${BASE_URL}/${id}`, expense); // Matches @PutMapping("/{id}") in ExpensesController
export const deleteExpenseById = (id) => axios.delete(`${BASE_URL}/${id}`); // Matches @DeleteMapping("/{id}") in ExpensesController
