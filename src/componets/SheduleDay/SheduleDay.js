import React from 'react';
import './sheduleDay.scss';
import NavWeek from '../NavWeek';

function SheduleDay() {
  return (
    <div className="shedule-day col-10 p-0">
      <NavWeek />
      <div className="content">
        <div className="couples">
          <div className="item">
            <div className="num">1</div>
            <div className="couple">
              <div className="sub-item">
                <div className="head-card">
                  <div className="name">УП.02 / Панасеня В.В</div>
                  <div className="cont">
                    <div className="sign">1</div>
                    <div className="cab">32 каб</div>
                  </div>
                </div>
              </div>
              <div className="sub-item">
                <div className="head-card">
                  <div className="name">УП.02 / Хамзина Р.Р </div>
                  <div className="cont">
                    <div className="sign">2</div>
                    <div className="cab">16 каб</div>
                  </div>
                </div>
                <div className="time">07:00 - 08:00</div>
              </div>
            </div>
          </div>
          <div className="item active-item">
            <div className="num">2</div>
            <div className="couple one-couple">
              <div className="head-card">
                <div className="name">ОГСЭ.06 Осн.дел.комм Лепина К.А</div>

                <div className="cont">
                  <div className="cab">32 каб</div>
                  <div className="icon-dinner"></div>
                </div>
              </div>
              <div className="time">08:10 - 09:20</div>
            </div>
          </div>
          <div className="item">
            <div className="num">3</div>
            <div className="couple  one-couple">
              <div className="head-card">
                <div className="name">ОП.03 Техн. механика Высоцкая Л.В</div>
                <div className="cab">33 каб</div>
              </div>
              <div className="time">09:40 - 10:20</div>
            </div>
          </div>
        </div>
        <div className="info-section">
          <div className="board">
            <div className="name">2 ПАРА</div>
            <div className="text">
              <span className="blue-color">Предмет:</span> ОГСЭ.06 Основы деловых комм.
              </div>
            <div className="text">
              <span className="blue-color">Преподаватель:</span> Лепина К.А
            </div>
            <div className="text">
              <span className="blue-color">Кабинет:</span> 32
            </div>
            <div className="time">08:10 - 09:20</div>
          </div>
          <div className="dinner">
            <div className="icon-dinner"></div>
            <div className="title">- Разрываная пара с обедом с 10:50 по 11:10</div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default SheduleDay;