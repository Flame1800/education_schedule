import React from 'react';
import './navWeek.scss';

function NawWeek() {
  return (
    <div className="nav-week d-flex">
        <div className="item item-active">
          <div className="num">31 августа</div>
          <div className="day">Пн</div>
        </div>
        <div className="item">
          <div className="num">1 сентября</div>
          <div className="day">Вт</div>
        </div>
        <div className="item">
          <div className="num">2 сентября</div>
          <div className="day">Ср</div>
        </div>
        <div className="item">
          <div className="num">3 сентября</div>
          <div className="day">Чт</div>
        </div>
        <div className="item">
          <div className="num">4 сентября</div>
          <div className="day">Пт</div>
        </div>
        <div className="item last">
          <div className="num">5 сентября</div>
          <div className="day">Сб</div>
        </div>
    </div>
  );
}

export default NawWeek;