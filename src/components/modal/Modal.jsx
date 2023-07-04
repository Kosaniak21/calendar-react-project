import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { parse, setHours, setMinutes, format, addMinutes } from 'date-fns';
import { createEvent } from '../../gateway/events';
import { getDateTime } from '../../utils/dateUtils';
import './modal.scss';

const getSelectOptions = (selectedTime, selectedStartTime, second) => {
  const options = [];
  options.push(
    <option key={'picker'} value={''}>
      pick
    </option>,
  );
  const selectedTimeDate = selectedTime ? parse(selectedTime, 'HH:mm', new Date()) : null;
  const startHour = selectedTimeDate ? selectedTimeDate.getHours() : 0;
  let startMinute = selectedTimeDate ? Math.ceil(selectedTimeDate.getMinutes() / 15) * 15 : 0;
  if (selectedStartTime) {
    const selectedStartTimeDate = parse(selectedStartTime, 'HH:mm', new Date());
    startMinute = selectedStartTimeDate.getMinutes();
  }

  for (let hour = startHour; hour < 24; hour += 1) {
    let endMinute = 60;
    if (!second) {
      endMinute = hour === 23 ? 45 : 60;
    }
    for (let minute = startMinute; minute < endMinute; minute += 15) {
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

const Modal = ({ setIsModalVisible, getEvents, setDateForHour, dateForHour }) => {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState(format(new Date(), 'HH:mm'));
  const [endTime, setEndTime] = useState(format(addMinutes(new Date(), 15), 'HH:mm'));
  const [disabled, setDisabled] = useState(true);

  if (dateForHour) {
    useEffect(() => {
      const { day, hour, target } = dateForHour;
      if (target !== null) {
        setDate(format(day, 'yyyy-MM-dd'));
        setStartTime(format(day.setHours(hour), 'HH:mm'));
        setEndTime(format(addMinutes(day.setHours(hour), 15), 'HH:mm'));
        setDisabled(false);
        setDateForHour({ day: null, hour: null, target: null });
      }
    }, [dateForHour]);
  }
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
    if (new Date(startDateTime).getTime() === new Date(endDateTime).getTime()) {
      alert('The start time and end time cannot be the same');
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
    setIsModalVisible(false);
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <div className="create-event__heading">
            <p>Create an Event</p>
            <button className="create-event__close-btn" onClick={() => setIsModalVisible(false)}>
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
                  {getSelectOptions()}
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
                  {getSelectOptions(startTime, startTime, true)}
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
  setIsModalVisible: PropTypes.func.isRequired,
  dateForHour: PropTypes.object,
  setDateForHour: PropTypes.func,
};

export default Modal;
