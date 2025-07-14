import departmentsData from "@/services/mockData/departments.json";

// Create a copy of the data to avoid mutations
let departments = [...departmentsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const departmentService = {
  async getAll() {
    await delay(300);
    return [...departments];
  },

  async getById(id) {
    await delay(250);
    const department = departments.find(dept => dept.Id === id);
    if (!department) {
      throw new Error("Department not found");
    }
    return { ...department };
  },

  async create(departmentData) {
    await delay(400);
    const newId = (Math.max(...departments.map(dept => parseInt(dept.Id))) + 1).toString();
    const newDepartment = {
      ...departmentData,
      Id: newId,
      employeeCount: 0,
    };
    departments.push(newDepartment);
    return { ...newDepartment };
  },

  async update(id, departmentData) {
    await delay(350);
    const index = departments.findIndex(dept => dept.Id === id);
    if (index === -1) {
      throw new Error("Department not found");
    }
    departments[index] = { ...departments[index], ...departmentData };
    return { ...departments[index] };
  },

  async delete(id) {
    await delay(300);
    const index = departments.findIndex(dept => dept.Id === id);
    if (index === -1) {
      throw new Error("Department not found");
    }
    departments.splice(index, 1);
    return { success: true };
  },
};