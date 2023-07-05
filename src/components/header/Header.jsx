import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconSvg from './IconSvg.jsx';
import HeaderNavigation from './HeaderNavigation';
import Modal from './../modal/Modal';
import './header.scss';

const Header = ({ weekDates, onPrevWeek, onNextWeek, onTodayWeek, getEvents }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <header className="header">
        <button className="button create-btn" onClick={() => setIsModalVisible(true)}>
          <IconSvg fill="white" className="icon" />
          Create
        </button>
        <HeaderNavigation
          onPrevWeek={onPrevWeek}
          onNextWeek={onNextWeek}
          onTodayWeek={onTodayWeek}
          weekDates={weekDates}
        />
      </header>
      {isModalVisible && <Modal setIsModalVisible={setIsModalVisible} getEvents={getEvents} />}
    </>
  );
};

Header.propTypes = {
  onPrevWeek: PropTypes.func.isRequired,
  onNextWeek: PropTypes.func.isRequired,
  onTodayWeek: PropTypes.func.isRequired,
  weekDates: PropTypes.array.isRequired,
};

export default Header;
