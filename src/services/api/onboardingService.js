import mockData from '@/services/mockData/onboarding.json';

let data = [...mockData];
let nextId = Math.max(...data.map(item => item.Id)) + 1;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const onboardingService = {
  async getAll() {
    await delay(300);
    return [...data];
  },

  async getById(id) {
    await delay(200);
    const item = data.find(task => task.Id === parseInt(id));
    return item ? { ...item } : null;
  },

  async create(item) {
    await delay(400);
    const newItem = {
      ...item,
      Id: nextId++,
      completed: false
    };
    data.push(newItem);
    return { ...newItem };
  },

  async update(id, updates) {
    await delay(350);
    const index = data.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Task not found');
    }
    
    data[index] = { ...data[index], ...updates };
    return { ...data[index] };
  },

  async delete(id) {
    await delay(300);
    const index = data.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Task not found');
    }
    
    const deletedItem = data[index];
    data.splice(index, 1);
    return { ...deletedItem };
  },

  async toggleCompletion(id) {
    await delay(250);
    const index = data.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Task not found');
    }
    
    data[index].completed = !data[index].completed;
    return { ...data[index] };
  },

  async getProgress() {
    await delay(200);
    const tasks = [...data];
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      completed,
      total,
      percentage,
      categories: {
        paperwork: {
          completed: tasks.filter(t => t.category === 'Paperwork' && t.completed).length,
          total: tasks.filter(t => t.category === 'Paperwork').length
        },
        training: {
          completed: tasks.filter(t => t.category === 'Training' && t.completed).length,
          total: tasks.filter(t => t.category === 'Training').length
        },
        systemAccess: {
          completed: tasks.filter(t => t.category === 'System Access' && t.completed).length,
          total: tasks.filter(t => t.category === 'System Access').length
        }
      }
    };
  }
};

export default onboardingService;