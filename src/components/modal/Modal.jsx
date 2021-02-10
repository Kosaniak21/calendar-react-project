import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format, addMinutes } from 'date-fns';

import { createEvent } from '../../gateway/events';
import { getDateTime } from '../../utils/dateUtils';
import './modal.scss';

const Modal = ({ setModalVisible, getEvents }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState(format(new Date(), 'HH:mm'));
  const [endTime, setEndTime] = useState(format(addMinutes(new Date(), 15), 'HH:mm'));
  const [description, setDescription] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const newEvent = {
      title: title,
      dateFrom: getDateTime(date, startTime),
      dateTo: getDateTime(date, endTime),
      description: description,
    };

    createEvent(newEvent).then(() => getEvents());
    setModalVisible(false);
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={() => setModalVisible(false)}>
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              onChange={e => setTitle(e.target.value)}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={e => setDescription(e.target.value)}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  getEvents: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default Modal;