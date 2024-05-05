import EmployeeSalary from '../models/employeeSalary'; // Assuming this is the correct import for the EmployeeSalary model
import { generatePDF } from '../utils/pdfGenerator'; // Assuming this is the correct import for the generatePDF function

// Controller function to assign salary to an employee
export const assignSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowance, performanceBasedSalary } = req.body;

    // Find the employee by employeeId
    const employee = await EmployeeSalary.findOne({ employeeId });

    // If employee not found, return error
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Update salary details
    employee.basicSalary = basicSalary;
    employee.allowance = allowance;
    employee.performanceBasedSalary = performanceBasedSalary;
    employee.assignedMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

    // Save updated employee
    await employee.save();

    // Generate PDF report
    const pdfDoc = generatePDF(employee);
    
    // Collect PDF content into a buffer
    const pdfBuffer = await new Promise((resolve, reject) => {
      const buffers = [];
      pdfDoc.on('data', (chunk) => buffers.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(buffers)));
      pdfDoc.on('error', reject);
    });

    // Send PDF in response
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment; filename="salary_report.pdf"');
    res.send(pdfBuffer);

    // Send success response
    res.status(200).json({ message: 'Salary assigned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
