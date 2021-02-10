import React from 'react';
import PropTypes from 'prop-types';

import HeaderNavigation from './HeaderNavigation';

import './header.scss';

const Header = ({ weekDates, setModalVisible, onPrevWeek, onNextWeek, onTodayWeek }) => {
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={() => setModalVisible(true)}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <HeaderNavigation
        onPrevWeek={onPrevWeek}
        onNextWeek={onNextWeek}
        onTodayWeek={onTodayWeek}
        weekDates={weekDates}
      />
    </header>
  );
};

Header.propTypes = {
  onPrevWeek: PropTypes.func.isRequired,
  onNextWeek: PropTypes.func.isRequired,
  onTodayWeek: PropTypes.func.isRequired,
  weekDates: PropTypes.array.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default Header;