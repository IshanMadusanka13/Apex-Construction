import mongoose from 'mongoose';

const employeeSalarySchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  basicSalary: { type: Number, default: 0 },
  allowance: { type: Number, default: 0 },
  performanceBasedSalary: { type: Number, default: 0 },
  assignedMonth: { type: String, default: Date.now },
});

const EmployeeSalary = mongoose.model('EmployeeSalary', employeeSalarySchema);

export default EmployeeSalary;
