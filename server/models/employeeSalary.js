import mongoose from 'mongoose';

const employeeSalarySchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  role: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  basicSalary: { type: Number, default: 0 },
  allowance: { type: Number, default: 0 },
  performanceBasedSalary: { type: Number, default: 0 },
  assignedMonth: { type: String },
});

module.exports = mongoose.model('EmployeeSalary', employeeSalarySchema);
