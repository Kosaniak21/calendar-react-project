import React from 'react';
import PropTypes from 'prop-types';
import IconSvg from './IconSvg.jsx';
import HeaderNavigation from './HeaderNavigation';

import './header.scss';

const Header = ({ weekDates, setModalVisible, onPrevWeek, onNextWeek, onTodayWeek }) => (
    <header className="header">
      <button className="button create-btn" onClick={() => setModalVisible(true)}>
        <IconSvg fill='white' className='icon' />
        Create
      </button>
      <HeaderNavigation
        onPrevWeek={onPrevWeek}
        onNextWeek={onNextWeek}
        onTodayWeek={onTodayWeek}
        weekDates={weekDates}
      />
    </header>
  );

Header.propTypes = {
  onPrevWeek: PropTypes.func.isRequired,
  onNextWeek: PropTypes.func.isRequired,
  onTodayWeek: PropTypes.func.isRequired,
  weekDates: PropTypes.array.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default Header;