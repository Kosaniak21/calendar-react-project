import React from 'react';
import PropTypes from 'prop-types';

import Day from '../day/Day';
import './week.scss';

const Week = ({ weekDates, events, onDeleteEvent }) => (
  <div className="calendar__week">
    {weekDates.map((dayStart) => {
      const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);
      const dayEvents = events.filter(
        (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
      );

      return (
        <Day
          key={dayStart.getDate()}
          dataDay={dayStart.getDate()}
          dayStart={dayStart}
          dayEvents={dayEvents}
          onDeleteEvent={onDeleteEvent}
        />
      );
    })}
  </div>
);

Week.propTypes = {
  weekDates: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
};

export default Week;
