import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/schedule/api`,
    timeout: 3000,
});

const API = {};

export const getWeek = (date) => instance(`/weeks/date/${date}`);
API.getLessonsForWeek = (weekId) => instance(`/lessons/week/${weekId}`);
API.getGroupLessonsForWeek = (weekId, groupId) => instance(`/lessons/group/${groupId}?week_id=${weekId}`);
API.getDivisionLessonsForWeek = (weekId, divisionName) => instance(`/lessons/division?divisionName=${divisionName}&week_id=${weekId}`);
API.getTeacherLessonsForWeek = (weekId, teacherName) => instance(`/lessons/teacher?teacherName=${teacherName}&week_id=${weekId}`);
API.getGroups = () => instance(`/groups`);
API.getDivisions = () => instance(`/divisions`);

export default API;

