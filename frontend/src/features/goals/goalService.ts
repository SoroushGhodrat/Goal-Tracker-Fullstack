import axios from "axios";

// set "proxy": "http://localhost:5000" in package.json
// or we can use the full url endpoint: http://localhost:5000/api/goals/
const API_URL = "/api/goals/";

// create a new goal
const createGoal = async (goalData: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

// Get user goals
const getGoals = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("config: ", config);

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Update user goal
const updateGoal = async (goalId: string, goalData: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}${goalId}`, goalData, config);
  return response.data;
};

// Delete user goal
const deleteGoal = async (goalId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + goalId, config);

  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};

export default goalService;
