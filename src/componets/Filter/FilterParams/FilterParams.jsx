import React from "react";
import _ from "lodash";
import schedule from "../../../store/scheduleStore";
import { observer } from "mobx-react-lite";
import Division from "./Division";
import Course from "./Course";

const divisions = [
  "№1, Маяковского 16/1",
  "№2, Рабочая 43/1",
  "№3, Ивана Захарова 12",
  "№4, Мелик-Карамова 18/1",
];
const courses = [1, 2, 3, 4];

const FilterParams = (props) => {
  const [currDivision, setDivision] = React.useState(null);
  const [currCourse, setCourse] = React.useState(null);
  const [currGroups, setGroups] = React.useState([]);
  const [currTeachers, setTeachers] = React.useState([]);

  const {
    getGroups,
    setLessonsByGroup,
    getTeachers,
    setLessonsByTeacher,
    mode,
  } = schedule;

  const changeDivisionHandle = (division) => {
    setCourse(null);
    setDivision(division);

    if (mode === "teacher") {
      setTeachers(getTeachers(division));
    }
  };

  const findGroupsHandle = (course) => {
    setCourse(course);

    const groups = getGroups(currDivision, course);
    setGroups(groups);
  };

  const emptyComponent = "Ничего не найдено";

  const divisionComponents = (
    <div className="column">
      {divisions.map((item) => (
        <Division
          item={item}
          activeDivision={currDivision}
          onClick={changeDivisionHandle}
        />
      ))}
    </div>
  );

  const courseComponents = (
    <div className="column">
      {courses.map((item) => (
        <Course
          item={item}
          activeCourse={currCourse}
          onClick={() => findGroupsHandle(item)}
        />
      ))}
    </div>
  );

  const groupComponents = currGroups.map((group) => {
    return (
      <div
        className={"item"}
        key={_.uniqueId()}
        onClick={() => setLessonsByGroup(group)}
      >
        {group}
      </div>
    );
  });

  const teacherComponents = (
    <div className="column teacher-groups">
      {currTeachers.map((teacher) => {
        let itemClasses = "item item-teacher";
        if (teacher === currCourse) {
          itemClasses += " active";
        }
        return (
          <div
            className={itemClasses}
            key={_.uniqueId()}
            onClick={() => setLessonsByTeacher(teacher)}
          >
            {teacher}
          </div>
        );
      })}
    </div>
  );

  const filterForStudent = (
    <div className="items-list">
      {divisionComponents}
      {currDivision && courseComponents}
      {currDivision && currCourse && (
        <div className="column groups">
          <div className="arrow-left" onClick={() => setCourse(null)} />
          {currGroups.length === 0 ? emptyComponent : groupComponents}
        </div>
      )}
    </div>
  );

  const filterForTeacher = (
    <div className="items-list">
      {divisionComponents}
      {currDivision && teacherComponents}
    </div>
  );

  return (
    <div className="items-list">
      {schedule.mode === "group" && filterForStudent}
      {schedule.mode === "teacher" && filterForTeacher}
    </div>
  );
};

export default observer(FilterParams);
