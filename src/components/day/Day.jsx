import React from 'react';
import PropTypes from 'prop-types';

import Hour from '../hour/Hour';

const Day = ({ dataDay, dayStart, dayEvents, onDeleteEvent, setModalVisible, setEventVisible }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        const hourEvents = dayEvents.filter((event) => event.dateFrom.getHours() === hour);
        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            onDeleteEvent={onDeleteEvent}
            dayStart={dayStart}
            setModalVisible={setModalVisible}
            setEventVisible={setEventVisible}
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
  onDeleteEvent: PropTypes.func.isRequired,
  setEventVisible: PropTypes.func.isRequired,
};

export default Day;
