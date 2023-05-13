import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/Modal';
import Navigation from '../navigation/Navigation';
import Week from '../week/Week.jsx';
import Sidebar from '../sidebar/Sidebar';
import { getEventsList, deleteEvent } from '../../gateway/events';
import './calendar.scss';
import ModalEvent from '../event/ModalEvent';

const Calendar = ({ weekDates, isModalVisible, setModalVisible }) => {
  const [events, setEvents] = useState([]);
  const [isEventVisible, setEventVisible] = useState({
    isVisible: false,
    title: '',
    description: '',
    time: '',
    id: null,
  });
  console.log(events);
  const getEvents = () => {
    getEventsList()
      .then(allEvents => setEvents(allEvents))
      .catch(error => alert(error.message));
  };
  useEffect(() => {
    getEvents();
  }, []);

  const handleDeleteEvent = id => {
    deleteEvent(id)
      .then(res => getEvents())
      .catch(error => alert(error.message));
  };

  return (
    <>
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week
              weekDates={weekDates}
              events={events}
              onDeleteEvent={handleDeleteEvent}
              setModalVisible={setModalVisible}
              setEventVisible={setEventVisible}
            />
          </div>
        </div>
      </section>
      {isModalVisible && <Modal setModalVisible={setModalVisible} getEvents={getEvents} />}
      {isEventVisible.isVisible && (
        <ModalEvent
          setEventVisible={setEventVisible}
          dataEvent={isEventVisible}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
    </>
  );
};
Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};
export default Calendar;
