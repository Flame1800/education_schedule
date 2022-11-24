import React from "react";

const Division = ({item, activeDivision, onClick = () => null}) => {
    let itemClasses = "item division";

    if (item === activeDivision) {
        itemClasses += " active";
    }

    return (
        <div className={itemClasses} onClick={() => onClick(item)}>
            {item.name}
        </div>
    );
};

export default Division;
