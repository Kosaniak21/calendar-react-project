import React from 'react';
import PropTypes from 'prop-types';
import Hour from '../hour/Hour';

const Day = ({ dataDay, dayStart, dayEvents, getEvents }) => {
  const hours = Array(24)
    .fill()
    .map((_, index) => index);
  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => event.dateFrom.getHours() === hour);
        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            dayStart={dayStart}
            getEvents={getEvents}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayStart: PropTypes.instanceOf(Date).isRequired,
  dayEvents: PropTypes.array.isRequired,
  getEvents: PropTypes.func.isRequired,
};

export default Day;
