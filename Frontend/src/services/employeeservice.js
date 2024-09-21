import axios from "axios";

const GETALL_REST_API_BASE_URL = 'http://localhost:8080/employee/getAll';
const CREATE_REST_API_BASE_URL = 'http://localhost:8080/employee/add';
const GET_REST_API_BASE_URL = 'http://localhost:8080/employee/get';
const UPDATE_REST_API_BASE_URL = 'http://localhost:8080/employee/update';
const DELETE_REST_API_BASE_URL = 'http://localhost:8080/employee/delete';

export const listEmployees = () => axios.get(GETALL_REST_API_BASE_URL);
export const createEmploye = (employee) => axios.post(CREATE_REST_API_BASE_URL, employee);
export const getEmployeeById = (employeeId)=> axios.get(GET_REST_API_BASE_URL+'/'+employeeId);
export const updateEmployee = (employeeId, employee) => axios.put(`${UPDATE_REST_API_BASE_URL}/${employeeId}`, employee);
export const deleteEmployeeById = (employeeId) => axios.delete(DELETE_REST_API_BASE_URL + '/' + employeeId);
