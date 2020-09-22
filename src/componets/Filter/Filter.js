import React from 'react';
import './filter.scss';

function Filter() {
  return (
    <div className="filter col-10">
      <div className="header">
        <div className="switch-head">
          <div className="active-item">Преподаватель</div>
          <div className="passive-item">Студент</div>
        </div>
        <div className="search">
          <label htmlFor="search" className="label-input">Введите группу:</label>
          <input type="text" placeholder="Поиск" />
        </div>
      </div>
      <div className="items-list">
        <div className="column">
          <div className="item">СП-1</div>
          <div className="item">СП-2</div>
          <div className="item">СП-3</div>
          <div className="item active">СП-4</div>
        </div>
        <div className="column">
          <div className="item">1 Курс</div>
          <div className="item">2 Курс</div>
          <div className="item">3 Курс</div>
          <div className="item active">4 Курс</div>
        </div>
        <div className="column">
          <div className="item">054 группа</div>
          <div className="item">055 группа</div>
          <div className="item">056 группа</div>
          <div className="item">082 группа</div>
          <div className="item">711 группа</div>
          <div className="item">712 группа</div>
          <div className="item">713 группа</div>
          <div className="item">714 группа</div>
          <div className="item active">715 группа</div>
        </div>
      </div>
    </div>
  );
}

export default Filter;