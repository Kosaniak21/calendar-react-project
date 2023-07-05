import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './event.scss';
import EventDelete from './EventDelete';

const Event = ({ height, marginTop, id, title, time, getEvents }) => {
  const [isEventDeleteVisible, setIsEventDeleteVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const eventStyle = {
    height,
    marginTop,
  };

  if (eventStyle.height < 25) {
    eventStyle.fontSize = '0.8rem';
  } else {
    eventStyle.fontSize = '1rem';
  }

  const handleClick = e => {
    e.stopPropagation();
    setIsEventDeleteVisible(!isEventDeleteVisible);
    setIsDeleting(!isDeleting);
  };

  return (
    <div className="event" style={eventStyle} onClick={handleClick}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {isEventDeleteVisible && (
        <EventDelete id={id} getEvents={getEvents} animationOn={isDeleting} />
      )}
    </div>
  );
};

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default Event;
