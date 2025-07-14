import leaveRequestsData from "@/services/mockData/leaveRequests.json";

// Create a copy of the data to avoid mutations
let leaveRequests = [...leaveRequestsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const leaveService = {
  async getAll() {
    await delay(300);
    return [...leaveRequests];
  },

  async getById(id) {
    await delay(250);
    const request = leaveRequests.find(req => req.Id === parseInt(id));
    if (!request) {
      throw new Error("Leave request not found");
    }
    return { ...request };
  },

  async create(requestData) {
    await delay(400);
    const newId = Math.max(...leaveRequests.map(req => req.Id)) + 1;
    const newRequest = {
      ...requestData,
      Id: newId,
    };
    leaveRequests.push(newRequest);
    return { ...newRequest };
  },

  async update(id, requestData) {
    await delay(350);
    const index = leaveRequests.findIndex(req => req.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Leave request not found");
    }
    leaveRequests[index] = { ...leaveRequests[index], ...requestData };
    return { ...leaveRequests[index] };
  },

  async delete(id) {
    await delay(300);
    const index = leaveRequests.findIndex(req => req.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Leave request not found");
    }
    leaveRequests.splice(index, 1);
    return { success: true };
  },
};