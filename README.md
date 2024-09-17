Employee Management System
Introduction
The Employee Management System is a web application designed to help organizations manage their employee data efficiently. This system offers features such as employee record management, dynamic payroll processing, leave tracking, and detailed reporting. Built using a combination of front-end (React) and back-end (Spring Boot) technologies, this system streamlines HR tasks by providing a user-friendly interface and reliable functionality.

Live Demo: Deployed App
Blog Article: Final Project Blog Article
Author LinkedIn:
Joshua Chifura




Installation
Prerequisites
Node.js (for the React frontend)
Java JDK 11+ (for the Spring Boot backend)
MySQL (for the database)
Instructions
Clone the repository:
bash
Copy code
git clone https://github.com/joshchif3/employee-management-system.git
cd employee-management-system
Install frontend dependencies:
bash
Copy code
cd frontend
npm install
Start the frontend:
bash
Copy code
npm start
Configure the backend:
Update the MySQL credentials in application.properties.
Run the Spring Boot application from the backend directory.
bash
Copy code
cd backend
./mvnw spring-boot:run
Usage
Add Employees: Easily add new employees with their personal details.
Manage Payroll: Automatically calculate salaries and deductions.
Track Leave: Track employee leave days, including paid and unpaid leave.
Generate Reports: Access detailed reports on employee and payroll data.
Contributing
We welcome contributions to improve this project. Here's how you can contribute:

Fork the repository.
Create a feature branch:
bash
Copy code
git checkout -b new-feature
Commit your changes:
bash
Copy code
git commit -m 'Add some feature'
Push to the branch:
bash
Copy code
git push origin new-feature
Open a pull request.
Related Projects
Payroll Management System
Employee Data Tracker
License
This project is licensed under the MIT License - see the LICENSE file for details.

