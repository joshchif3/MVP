import React from 'react';
import { useParams } from 'react-router-dom';
import { getPayrollById } from '../services/payrollService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './PayslipPage.css'; // Ensure this path is correct

const PayslipPage = () => {
    const { id } = useParams();
    const [payroll, setPayroll] = React.useState(null);

    React.useEffect(() => {
        fetchPayrollData();
    }, [id]);

    const fetchPayrollData = async () => {
        try {
            const response = await getPayrollById(id);
            setPayroll(response.data);
        } catch (error) {
            console.error('Error fetching payroll data:', error);
        }
    };

    if (!payroll) {
        return <div>Loading...</div>;
    }

    const formatNumber = (num) => (num != null ? num.toFixed(2) : 'N/A');

    const calculateTaxDeducted = (grossSalary, netSalary) => {
        if (grossSalary != null && netSalary != null) {
            return grossSalary - netSalary;
        }
        return null;
    };

    const taxDeducted = calculateTaxDeducted(payroll.salary, payroll.salaryAfterTax);

    const handleDownload = () => {
        const input = document.getElementById('payslip-content');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        html2canvas(input, {
            scale: 2, // Increase scale for better quality
            useCORS: true, // Ensure CORS settings if you are using external resources
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            
            let position = 0;

            // Add the first page
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            // Add more pages if needed
            while (heightLeft > 0) {
                position -= pageHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('payslip.pdf');
        });
    };

    return (
        <div className="payslip-container">
            <div className="payslip-header">
                <h2>Employee Payslip</h2>
                <p className="confidential">CONFIDENTIAL</p>
                <p>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
            <div id="payslip-content">
                <div className="payslip-info">
                    <div className="info-row">
                        <div className="info-label">Name:</div>
                        <div className="info-value">{payroll.name} {payroll.surname}</div>
                    </div>
                    <div className="info-row">
                        <div className="info-label">Employee ID:</div>
                        <div className="info-value">{payroll.id}</div>
                    </div>
                    <div className="info-row">
                        <div className="info-label">Title:</div>
                        <div className="info-value">{payroll.role}</div> {/* Display role as Title */}
                    </div>
                </div>
                <div className="payslip-table">
                    <div className="table-header">
                        <div className="description">Description</div>
                        <div className="earnings">Earnings</div>
                        <div className="deductions">Deductions</div>
                    </div>
                    <div className="table-row">
                        <div className="description">Basic Salary</div>
                        <div className="earnings">{formatNumber(payroll.salary)}</div>
                        <div className="deductions"></div>
                    </div>
                    <div className="table-row">
                        <div className="description">Tax</div>
                        <div className="earnings"></div>
                        <div className="deductions">-{formatNumber(taxDeducted)}</div>
                    </div>
                    <div className="table-footer">
                        <div className="description">Total</div>
                        <div className="earnings">{formatNumber(payroll.salary)}</div>
                        <div className="deductions">-{formatNumber(taxDeducted)}</div>
                    </div>
                </div>
                <div className="payslip-footer">
                    <div className="footer-row net-pay">
                        <div className="footer-label">NET PAY</div>
                        <div className="footer-value">{formatNumber(payroll.salaryAfterTax)}</div>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleDownload}>Download PDF</button>
        </div>
    );
};

export default PayslipPage;
