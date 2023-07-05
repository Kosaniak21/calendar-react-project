import React, { useState } from 'react';
import { format, getHours } from 'date-fns';
import PropTypes from 'prop-types';
import Event from '../event/Event';
import { formatMins } from '../../utils/dateUtils.js';
import RedLine from './RedLine';
import Modal from './../modal/Modal';

const Hour = ({ dayStart, dataHour, hourEvents, getEvents }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isToday = format(dayStart, 'MM dd yyyy') === format(new Date(), 'MM dd yyyy');

  const [dateForHour, setDateForHour] = useState({
    day: null,
    hour: null,
    target: null,
  });

  return (
    <>
      <div
        className="calendar__time-slot"
        data-time={dataHour + 1}
        onClick={event => {
          setIsModalVisible(true);
          setDateForHour({
            day: dayStart,
            hour: dataHour,
            target: event,
          });
        }}
      >
        {isToday && dataHour === getHours(new Date()) && <RedLine />}

        {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
          const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;
          console.log(dateFrom);
          const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;

          return (
            <Event
              key={id}
              id={id}
              title={title}
              height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
              marginTop={dateFrom.getMinutes()}
              time={`${eventStart} - ${eventEnd}`}
              getEvents={getEvents}
            />
          );
        })}
      </div>
      {isModalVisible && (
        <Modal
          setIsModalVisible={setIsModalVisible}
          getEvents={getEvents}
          setDateForHour={setDateForHour}
          dateForHour={dateForHour}
        />
      )}
    </>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  dayStart: PropTypes.instanceOf(Date).isRequired,
  hourEvents: PropTypes.array.isRequired,
  getEvents: PropTypes.func.isRequired,
};

export default Hour;
