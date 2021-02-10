import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const HeaderNavigation = ({ onTodayWeek, onPrevWeek, onNextWeek, weekDates }) => {
  const currentMonth = format(weekDates[0], 'MMMM');
  const nextMonth = format(weekDates[weekDates.length - 1], 'MMMM');
  const showMonth =
    currentMonth === nextMonth ? currentMonth : `${currentMonth} - ${nextMonth}`;

  return (
    <div className="navigation">
      <button className="navigation__today-btn button" onClick={onTodayWeek}>
        Today
      </button>
      <button className="icon-button navigation__nav-icon" onClick={onPrevWeek}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="icon-button navigation__nav-icon" onClick={onNextWeek}>
        <i className="fas fa-chevron-right"></i>
      </button>
      <span className="navigation__displayed-month">{showMonth}</span>
    </div>
  );
};

HeaderNavigation.propTypes = {
  onPrevWeek: PropTypes.func.isRequired,
  onNextWeek: PropTypes.func.isRequired,
  onTodayWeek: PropTypes.func.isRequired,
  weekDates: PropTypes.array.isRequired,
};

export default HeaderNavigation;