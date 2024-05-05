import EmployeeSalary from '../models/employeeSalary.js';

export const assignSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowance, performanceBasedSalary } = req.body;

    const employee = new EmployeeSalary({
      employeeId,
      basicSalary,
      allowance,
      performanceBasedSalary
    });

    await employee.save();

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
