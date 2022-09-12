import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/schedule/api`,
  timeout: 3000,
});

const API = {};

export const getWeek = (date) => instance(`/weeks/date/${date}`);
API.getLessonsForWeek = (weekId) => instance(`/lessons/week/${weekId}`);

export default API;