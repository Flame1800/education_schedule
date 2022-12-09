import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/schedule/api`,
    timeout: 3000,
});

export const getWeek = (date) => instance(`/weeks/date/${date}`);
export const getWeekLessons = (weekId) => instance(`/lessons/week/${weekId}`);
export const getGroupWeekLessons = (weekId, groupId) => instance(`/lessons/group/${groupId}?week_id=${weekId}`);
export const getDivisionWeekLessons = (weekId, divisionName) => instance(`/lessons/division?divisionName=${divisionName}&week_id=${weekId}`);
export const getTeacherWeekLessons = (weekId, teacherName) => instance(`/lessons/teacher?teacherName=${teacherName}&week_id=${weekId}`);
export const getGroups = () => instance(`/groups`);
export const getDivisions = () => instance(`/divisions`);


