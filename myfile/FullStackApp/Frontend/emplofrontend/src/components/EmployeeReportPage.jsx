import React from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById } from '../services/employeeservice'; // Function to fetch employee data
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './EmployeeReportPage.css'; // Ensure this CSS file is created for styling

const EmployeeReportPage = () => {
    const { id } = useParams();
    const [employee, setEmployee] = React.useState(null);

    React.useEffect(() => {
        fetchEmployeeData();
    }, [id]);

    const fetchEmployeeData = async () => {
        try {
            const response = await getEmployeeById(id);
            setEmployee(response.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    const handleDownloadReport = () => {
        const input = document.getElementById('report-content');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        html2canvas(input, {
            scale: 2,
            useCORS: true,
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft > 0) {
                position -= pageHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('employee_report.pdf');
        });
    };

    return (
        <div className="employee-report-container">
            <div id="report-content" className="employee-report">
                <h2 className="report-title">Employee Report</h2>
                <h3>{employee.name} {employee.surname}</h3>
                <div className="employee-details">
                    <p><strong>Name:</strong> {employee.name}</p>
                    <p><strong>Surname:</strong> {employee.surname}</p>
                    <p><strong>Address:</strong> {employee.address}</p>
                    <p><strong>Location:</strong> {employee.location}</p>
                    <p><strong>Company:</strong> {employee.company}</p>
                    <p><strong>Company Term:</strong> {employee.companyTerm}</p>
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Start Date:</strong> {employee.startDate}</p>
                    <p><strong>End Date:</strong> {employee.endDate}</p>
                    <p><strong>Role:</strong> {employee.role}</p>
                  
                    <p><strong>Start Date:</strong> {employee.startDate}</p>
                    <p><strong>Status:</strong> {employee.status}</p>
                </div>
            </div>
            <button onClick={handleDownloadReport} className="download-button">Download Report as PDF</button>
        </div>
    );
};

export default EmployeeReportPage;
