import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { format, addMinutes } from 'date-fns';

import { createEvent } from '../../gateway/events';
import { getDateTime } from '../../utils/dateUtils';
import './modal.scss';

const Modal = ({ setModalVisible, getEvents }) => {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState(format(new Date(), 'HH:mm'));
  const [endTime, setEndTime] = useState(format(addMinutes(new Date(), 15), 'HH:mm'));

  const titleRef = useRef();
  const descriptionRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEvent = {
      title: titleRef.current.value,
      dateFrom: getDateTime(date, startTime),
      dateTo: getDateTime(date, endTime),
      description: descriptionRef.current.value,
    };
    createEvent(newEvent).then(() => getEvents());
    setModalVisible(false);
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <div className="create-event__heading">
            <p>Create en Event</p>
            <button className="create-event__close-btn" onClick={() => setModalVisible(false)}>
              +
            </button>
          </div>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field title__input"
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field date__input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <div>
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field date__input"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field date__input"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <textarea
              ref={descriptionRef}
              name="description"
              placeholder="Description"
              className="event-form__field event-form__description"
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
