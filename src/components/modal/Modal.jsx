import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { parse, setHours, setMinutes, format, addMinutes } from 'date-fns';
import { createEvent } from '../../gateway/events';
import { getDateTime } from '../../utils/dateUtils';
import { DateContext } from '../../context/context';
import './modal.scss';

const getSelectOptions = (selectedTime, selectedStartTime) => {
  const options = [];
  const selectedTimeDate = selectedTime ? parse(selectedTime, 'HH:mm', new Date()) : null;
  const startHour = selectedTimeDate ? selectedTimeDate.getHours() : 0;
  let startMinute = selectedTimeDate ? Math.ceil(selectedTimeDate.getMinutes() / 15) * 15 : 0;

  if (selectedStartTime) {
    const selectedStartTimeDate = parse(selectedStartTime, 'HH:mm', new Date());
    startMinute = Math.ceil(selectedStartTimeDate.getMinutes() / 15) * 15;
  }

  for (let hour = startHour; hour < 24; hour += 1) {
    for (let minute = startMinute; minute < 60; minute += 15) {
      const time = setMinutes(setHours(new Date(), hour), minute);
      options.push(
        <option key={format(time, 'HH:mm')} value={format(time, 'HH:mm')}>
          {format(time, 'HH:mm')}
        </option>,
      );
    }
    startMinute = 0;
  }

  return options;
};

const Modal = ({ setModalVisible, getEvents }) => {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState(format(new Date(), 'HH:mm'));
  const [endTime, setEndTime] = useState(format(addMinutes(new Date(), 15), 'HH:mm'));
  const [disabled, setDisabled] = useState(true);
  const context = useContext(DateContext);

  useEffect(() => {
    const { day, hour, target } = context.dateForHour;
    if (target !== null) {
      setDate(format(day, 'yyyy-MM-dd'));
      setStartTime(format(day.setHours(hour), 'HH:mm'));
      setEndTime(format(addMinutes(day.setHours(hour), 15), 'HH:mm'));
      setDisabled(false);
      context.setDateForHour({ day: null, hour: null, target: null });
    }
  }, [context.dateForHour]);

  const titleRef = useRef();
  const descriptionRef = useRef();

  const handleSubmit = event => {
    event.preventDefault();

    const startDateTime = getDateTime(date, startTime);
    const endDateTime = getDateTime(date, endTime);
    if (startDateTime.toDateString() !== endDateTime.toDateString()) {
      alert('The event must start and end within one day');
      return;
    }

    const duration = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
    if (duration > 6) {
      alert('The event cannot be more than 6 hours long');
      return;
    }

    const newEvent = {
      title: titleRef.current.value,
      dateFrom: startDateTime,
      dateTo: endDateTime,
      description: descriptionRef.current.value,
    };

    createEvent(newEvent)
      .then(() => getEvents())
      .catch(err => alert(err.message));
    setModalVisible(false);
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <div className="create-event__heading">
            <p>Create an Event</p>
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
                onChange={e => setDate(e.target.value)}
              />

              <div>
                <select
                  className="event-form__field date__input"
                  value={startTime}
                  onChange={e => {
                    setDisabled(false);
                    setStartTime(e.target.value);
                  }}
                  required
                >
                  {getSelectOptions(startTime, startTime)}
                </select>
                <span>-</span>
                <select
                  className="event-form__field date__input"
                  value={endTime}
                  onChange={e => {
                    setEndTime(e.target.value);
                  }}
                  required
                  disabled={disabled}
                >
                  {getSelectOptions(startTime, startTime)}
                </select>
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
