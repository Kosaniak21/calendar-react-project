import React, { useState } from 'react';
import { format, getHours } from 'date-fns';
import PropTypes from 'prop-types';
import Event from '../event/Event';
import { formatMins } from '../../utils/dateUtils.js';
import RedLine from './RedLine';
import Modal from './../modal/Modal';
import { deleteEvent } from '../../gateway/events';
import ModalEvent from '../event/ModalEvent';

const Hour = ({ dayStart, dataHour, hourEvents, getEvents }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [eventModal, setEventModal] = useState({
    isVisible: false,
    title: '',
    description: '',
    time: '',
    id: null,
  });

  const handleDeleteEvent = id => {
    deleteEvent(id)
      .then(getEvents)
      .catch(error => alert(error.message));
  };

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

        {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
          const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;

          const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;

          return (
            <Event
              key={id}
              id={id}
              title={title}
              description={description}
              onDeleteEvent={handleDeleteEvent}
              height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
              marginTop={dateFrom.getMinutes()}
              time={`${eventStart} - ${eventEnd}`}
              setEventModal={setEventModal}
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
      {eventModal.isVisible && (
        <ModalEvent
          setEventModal={setEventModal}
          dataEvent={eventModal}
          onDeleteEvent={handleDeleteEvent}
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
