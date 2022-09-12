import React from "react";

const Division = ({ item, activeDivision, onClick }) => {
  let itemClasses = "item division";

  if (item === activeDivision) {
    itemClasses += " active";
  }

  return (
    <div className={itemClasses} key={item} onClick={() => onClick(item)}>
      {item}
    </div>
  );
};

export default Division;
