import React from 'react';
import './sheduleWeek.scss';
import NavWeek from '../NavWeek';

function SheduleWeek() {
  return (
    <div className="shedule-week col-10 p-0">
      <NavWeek />
      <div className="container-week">
        <div className="nums">
          <div className="num">1</div>
          <div className="num active">2</div>
          <div className="num">3</div>
          <div className="num">4</div>
          <div className="num">5</div>
          <div className="num">6</div>
        </div>
        <div className="content-week">
          <div className="row-items 1">
            <div className="item 1">
              <div className="couple">
                <div className="sub-item">
                  <div className="head-card">
                    <div className="name">Учебная практика .02 Панасеня В.В</div>
                    <div className="cont">
                      <div className="cab">32 каб</div>
                      <div className="sign">1</div>
                    </div>
                  </div>
                </div>
                <div className="sub-item">
                  <div className="head-card">
                    <div className="name">Учебная практика .02 Хамзина Р.Р </div>
                    <div className="cont">
                      <div className="cab">16 каб</div>
                      <div className="sign">2</div>
                    </div>
                  </div>
                  <div className="time">07:00 - 08:00</div>
                </div>
              </div>
            </div>
            <div className="item 2"></div>
            <div className="item 3">
              <div className="couple">
                <div className="sub-item">
                  <div className="head-card">
                    <div className="name">УП.02 / Панасеня В.В</div>
                    <div className="cont">
                      <div className="cab">32 каб</div>
                      <div className="sign">1</div>
                    </div>
                  </div>
                </div>
                <div className="sub-item">
                  <div className="head-card">
                    <div className="name">УП.02 / Хамзина Р.Р </div>
                    <div className="cont">
                      <div className="cab">16 каб</div>
                      <div className="sign">2</div>
                    </div>
                  </div>
                  <div className="time">07:00 - 08:00</div>
                </div>
              </div>
            </div>
            <div className="item 4"></div>
            <div className="item 5"></div>
            <div className="item 6"></div>
          </div>
          <div className="row-items 2">
            <div className="item">
              <div className="couple one-couple">
                <div className="head-card">
                  <div className="name">ОГСЭ.06 Основы деловых коммуникаций Лепина К.А</div>

                  <div className="cont">
                    <div className="cab">32 каб</div>
                    <div className="current-couple">текущая пара</div>
                    <div className="icon-dinner"></div>
                  </div>
                </div>
                <div className="time">08:10 - 09:20</div>
              </div>
            </div>
            <div className="item">
              <div className="couple one-couple">
                <div className="head-card">
                  <div className="name">ОГСЭ.06 Осн.дел.комм Лепина К.А</div>

                  <div className="cont">
                    <div className="cab">32 каб</div>
                  </div>
                </div>
                <div className="time">08:10 - 09:20</div>
              </div>
            </div>
            <div className="item">
              <div className="dinner">
                <div className="title">Обед</div>
                <div className="time">07:00 - 08:00</div>
              </div>
            </div>
            <div className="item">
              <div className="couple one-couple">
                <div className="head-card">
                  <div className="name">ОГСЭ.06 Осн.дел.комм Лепина К.А</div>

                  <div className="cont">
                    <div className="cab">32 каб</div>
                  </div>
                </div>
                <div className="time">08:10 - 09:20</div>
              </div>
            </div>
            <div className="item">
              <div className="no-couple">
                Занятий нет
            </div>
            </div>
            <div className="item">
              <div className="no-couple">
                Занятий нет
            </div>
            </div>
          </div>
          <div className="row-items 3">
            <div className="item">
              <div className="couple one-couple">
                <div className="head-card">
                  <div className="name">ОП.03 Техн. механика Высоцкая Л.В</div>

                  <div className="cont">
                    <div className="cab">32 каб</div>
                  </div>
                </div>
                <div className="time">08:10 - 09:20</div>
              </div>
            </div>
            <div className="item">
              <div className="couple one-couple">
                <div className="head-card">
                  <div className="name">ОГСЭ.06 Осн.дел.комм Лепина К.А</div>

                  <div className="cont">
                    <div className="cab">32 каб</div>
                  </div>
                </div>
                <div className="time">08:10 - 09:20</div>
              </div>
            </div>
            <div className="item">
              <div className="couple one-couple">
                <div className="head-card">
                  <div className="name">ОГСЭ.06 Осн.дел.комм Лепина К.А</div>

                  <div className="cont">
                    <div className="cab">32 каб</div>
                  </div>
                </div>
                <div className="time">08:10 - 09:20</div>
              </div>
            </div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="row-items">
            <div className="item"></div>
            <div className="item">
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
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="row-items">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="row-items">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default SheduleWeek;