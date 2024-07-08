import React, { useState } from "react";
import FilterParam from "./FilterParams/FilterParam";
import FilterStore from "../../../../store/filterStore";
import { observer } from "mobx-react-lite";
import backImg from "../../../../assets/img/arrow-left.png";
import { Link } from "react-router-dom";
import {
    BackIcon,
    Column,
    FilterItems,
    FilterParamWrapper,
    OverflowColumn,
} from "./FilterTabs.styled";
import { weekStore } from "../../../../store";
import Skeleton from "react-loading-skeleton";

const TeachersFilter = () => {
    const [teachers, setTeachers] = useState([]);
    const { division, setDivision, getTeachers, divisions, loading } =
        FilterStore;

    const {date} = weekStore;

    const isEmpty = teachers.length === 0 && !loading && division;

    const changeDivisionHandle = async (item) => {
        setTeachers([]);
        setDivision(item);
        setTeachers(await getTeachers(item.name));
    };

    const loader = (
        <OverflowColumn>
            {new Array(20).fill().map((item) => {
                return (
                    <Skeleton />
                );
            })}
        </OverflowColumn>
    );

    const teacherComponents = loading ? (
        loader
    ) : (
        <OverflowColumn>
            <BackIcon
                src={backImg}
                alt="назад"
                onClick={() => setDivision(null)}
            />
            {!isEmpty
                ? teachers.map((teacher) => {
                      return (
                          <Link
                              to={`/timetable/teacher/${teacher}?week=${date.toISODate()}`}
                              key={teacher}
                          >
                              <FilterParamWrapper>{teacher}</FilterParamWrapper>
                          </Link>
                      );
                  })
                : "Преподаватели не найдены"}
        </OverflowColumn>
    );

    return (
        <FilterItems>
            <Column>
                {divisions.map((item) => (
                    <FilterParam
                        item={item}
                        key={item._id}
                        activeDivision={division}
                        onClick={() => changeDivisionHandle(item)}
                    />
                ))}
            </Column>
            {division && teacherComponents}
        </FilterItems>
    );
};

export default observer(TeachersFilter);
