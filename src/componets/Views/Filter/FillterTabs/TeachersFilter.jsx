import React from "react";
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
import scheduleStore from "../../../../store/scheduleStore";

const TeachersFilter = () => {
    const [teachers, setTeachers] = React.useState([]);
    const { division, setDivision, getTeachers, divisions, loading } =
        FilterStore;

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
                    // <Skeleton
                    //     key={item}
                    //     variant="rounded"
                    //     width={200 + 50 * Math.random()}
                    //     height={30}
                    //     sx={{ marginTop: "10px" }}
                    // />
                    "загрузка..."
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
                              to={`/timetable/teacher/${teacher}?week=${scheduleStore.weekMode}`}
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
