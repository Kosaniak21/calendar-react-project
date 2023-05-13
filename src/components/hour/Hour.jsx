import React, { useContext } from 'react';
import { format, getHours } from 'date-fns';
import PropTypes from 'prop-types';

import Event from '../event/Event';
import { formatMins } from '../../utils/dateUtils.js';
import RedLine from './RedLine';
import { DateContext } from '../../context/context';

const Hour = ({
  dayStart,
  dataHour,
  hourEvents,
  onDeleteEvent,
  setModalVisible,
  setEventVisible,
}) => {
  const isToday = format(dayStart, 'MM dd yyyy') === format(new Date(), 'MM dd yyyy');
  const context = useContext(DateContext);

  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      onClick={event => {
        setModalVisible(true);
        context.setDateForHour({
          day: dayStart,
          hour: dataHour,
          target: event,
        });
      }}
    >
      {isToday && dataHour === getHours(new Date()) && <RedLine />}

      {hourEvents.map(({ id, dateFrom, dateTo, title, description }, i, arr) => {
        console.log(hourEvents);
        const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;

        const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;

        return (
          <Event
            key={id}
            id={id}
            title={title}
            description={description}
            onDeleteEvent={onDeleteEvent}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            setEventVisible={setEventVisible}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  dayStart: PropTypes.instanceOf(Date).isRequired,
  hourEvents: PropTypes.array.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  setEventVisible: PropTypes.func.isRequired,
};

export default Hour;
