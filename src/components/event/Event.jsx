import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './event.scss';

const Event = ({ height, marginTop, id, title, time, description, setEventVisible }) => {
  const eventStyle = {
    height,
    marginTop,
  };
  if (eventStyle.height < 25) {
    eventStyle.fontSize = '0.8rem';
  } else {
    eventStyle.fontSize = '1rem';
  }
  return (
    <div
      className="event"
      style={eventStyle}
      onClick={(e) => {
        e.stopPropagation();
        setEventVisible({ isVisible: true, title, time, description, id });
      }}
    >
      <div className="event__title">{title}</div>
    </div>
  );
};

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  setEventVisible: PropTypes.func.isRequired,
};

export default Event;
