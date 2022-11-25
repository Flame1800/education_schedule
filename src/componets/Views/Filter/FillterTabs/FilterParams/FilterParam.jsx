import React from "react";
import {FilterParamWrapper} from "../FilterTabs.styled";

const FilterParam = ({item, activeDivision, onClick = () => null}) => {

    return (
        <FilterParamWrapper active={item === activeDivision} onClick={() => onClick(item)}>
            {item.name}
        </FilterParamWrapper>
    );
};

export default FilterParam;
