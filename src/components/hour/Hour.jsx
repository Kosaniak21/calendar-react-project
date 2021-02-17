import React from 'react';
import { format, getHours } from 'date-fns';
import PropTypes from 'prop-types';

import Event from '../event/Event';
import { formatMins } from '../../utils/dateUtils.js';
import './hour.scss';
import RedLine from './RedLine';

const Hour = ({ dayStart, dataHour, hourEvents, onDeleteEvent }) => {
  const isToday = format(dayStart, 'MM dd yyyy') === format(new Date(), 'MM dd yyyy');

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {isToday && dataHour === getHours(new Date()) && <RedLine />}

      {hourEvents.map(({ id, dateFrom, dateTo, title , description }) => {
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
};

export default Hour;