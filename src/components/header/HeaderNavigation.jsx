import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const HeaderNavigation = ({ onTodayWeek, onPrevWeek, onNextWeek, weekDates }) => {
  const currentMonth = format(weekDates[0], 'MMMM');
  const nextMonth = format(weekDates[weekDates.length - 1], 'MMMM');
  const showMonth = currentMonth === nextMonth ? currentMonth : `${currentMonth} - ${nextMonth}`;
  const showYear = format(weekDates[6], 'yyyy');

  return (
    <div className="navigation">
      <button className="navigation__today-btn button" onClick={onTodayWeek}>
        Today
      </button>
      <button className="icon-button navigation__nav-icon" onClick={onPrevWeek}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <span className="navigation__displayed-month">
        {showMonth} {showYear}
      </span>
      <button className="icon-button navigation__nav-icon" onClick={onNextWeek}>
        <i className="fas fa-chevron-right"></i>
      </button>
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
