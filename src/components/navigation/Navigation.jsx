import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import className from 'classnames';

import { days } from '../../utils/dateUtils.js';
import './navigation.scss';

const Navigation = ({ weekDates }) => (
  <div className="calendar__header">
    {weekDates.map((dayDate) => {
      const isTodayDate = format(dayDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
      const dayClassName = className('calendar__day-label', 'day-label', { today: isTodayDate });

      return isTodayDate ? (
        <div key={dayDate} className={dayClassName}>
          <div className="today_circle">
            <span className="day-label__day-name ">{days[dayDate.getDay()]}</span>
            <span className="day-label__day-number">{dayDate.getDate()}</span>
          </div>
        </div>
      ) : (
        <div key={dayDate} className={dayClassName}>
          <span className="day-label__day-name ">{days[dayDate.getDay()]}</span>
          <span className="day-label__day-number">{dayDate.getDate()}</span>
        </div>
      );
    })}
  </div>
);

Navigation.propTypes = {
  weekDates: PropTypes.array.isRequired,
};

export default Navigation;
