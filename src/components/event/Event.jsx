import React, { useState } from "react";
import PropTypes from "prop-types";

import "./event.scss";

const Event = ({ height, marginTop, id, title, time, onDeleteEvent ,description }) => {
  const [isDeleteBtnVisible, setIsDeleteBtnVisible] = useState(false);

  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <div
      className="event"
      style={eventStyle}
      onClick={() => setIsDeleteBtnVisible(!isDeleteBtnVisible)}
    >
      <div className="event__title">{title}</div>
      <div className="event__time">
        <p>{time}</p>
        <div className="event__description">{description}</div>
      </div>
      {isDeleteBtnVisible && (
        <button className="delete-event-btn" onClick={() => onDeleteEvent(id)}>
          +
        </button>
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
  onDeleteEvent: PropTypes.func.isRequired,
};

export default Event;
