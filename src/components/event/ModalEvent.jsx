import React from 'react';
import PropTypes from 'prop-types';
import './modal-event.scss';

const ModalEvent = ({ dataEvent, setEventVisible, onDeleteEvent }) => {
  const { time, title, description, id } = dataEvent;

  return (
    <div className="modal-event overlay-two">
      <div className="modal-event__content">
        <div>
          <div className="modal-event__title">
            <p>{title}</p>
            <span>{time}</span>
          </div>
          <div className="modal-event__description">{description}</div>
        </div>
        <div>
          <button className="cross-button" onClick={() => setEventVisible({ isVisible: false })}>
            +
          </button>
          <button
            className="delete-icon"
            onClick={() => {
              setEventVisible({ isVisible: false });
              onDeleteEvent(id);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
              strokeWidth="1.6320000000000001"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M4.99997 8H6.5M6.5 8V18C6.5 19.1046 7.39543 20 8.5 20H15.5C16.6046 20 17.5 19.1046 17.5 18V8M6.5 8H17.5M17.5 8H19M9 5H15M9.99997 11.5V16.5M14 11.5V16.5"
                  stroke="#464455"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

ModalEvent.propTypes = {
  title: PropTypes.string,
  time: PropTypes.string,
  description: PropTypes.string,
  setEventVisible: PropTypes.func.isRequired,
};

export default ModalEvent;
