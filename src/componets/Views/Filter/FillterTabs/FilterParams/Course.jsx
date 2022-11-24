import React from "react";

const Division = ({ item, activeCourse, onClick }) => {
  let itemClasses = "item";
  if (item === activeCourse) {
    itemClasses += " active";
  }

  return (
    <div className={itemClasses} key={item} onClick={() => onClick(item)}>
      {item} Курс
    </div>
  );
};

export default Division;
