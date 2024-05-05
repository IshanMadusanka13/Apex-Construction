import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Function to generate PDF report
exports.generatePDF = (employeeData) => {
  const documentDefinition = {
    content: [
      { text: 'Employee Salary Report', style: 'header' },
      { text: `Employee Name: ${employeeData.firstName} ${employeeData.lastName}`, style: 'subheader' },
      { text: `Employee ID: ${employeeData.employeeId}`, style: 'subheader' },
      { text: `Basic Salary: ${employeeData.basicSalary}`, style: 'subheader' },
      { text: `Allowance: ${employeeData.allowance}`, style: 'subheader' },
      { text: `Performance Based Salary: ${employeeData.performanceBasedSalary}`, style: 'subheader' },
      { text: `Assigned Month: ${employeeData.assignedMonth}`, style: 'subheader' },
    ],
    styles: {
      header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
      subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] }
    }
  };

  const pdfDoc = pdfMake.createPdf(documentDefinition);
  return pdfDoc;
};

