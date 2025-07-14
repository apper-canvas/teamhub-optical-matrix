import employeesData from "@/services/mockData/employees.json";

// Create a copy of the data to avoid mutations
let employees = [...employeesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const employeeService = {
  async getAll() {
    await delay(300);
    return [...employees];
  },

  async getById(id) {
    await delay(250);
    const employee = employees.find(emp => emp.Id === parseInt(id));
    if (!employee) {
      throw new Error("Employee not found");
    }
    return { ...employee };
  },

  async create(employeeData) {
    await delay(400);
    const newId = Math.max(...employees.map(emp => emp.Id)) + 1;
    const newEmployee = {
      ...employeeData,
      Id: newId,
    };
    employees.push(newEmployee);
    return { ...newEmployee };
  },

  async update(id, employeeData) {
    await delay(350);
    const index = employees.findIndex(emp => emp.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Employee not found");
    }
    employees[index] = { ...employees[index], ...employeeData };
    return { ...employees[index] };
  },

  async delete(id) {
    await delay(300);
    const index = employees.findIndex(emp => emp.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Employee not found");
    }
    employees.splice(index, 1);
    return { success: true };
  },
};