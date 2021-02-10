import React, { useState } from 'react';
import { subWeeks, addWeeks } from 'date-fns';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import './common.scss';

const App = () => {
  const [startDateWeek, setStartDateWeek] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePrevWeek = () => setStartDateWeek(subWeeks(startDateWeek, 1));
  const hanldeNextWeek = () => setStartDateWeek(addWeeks(startDateWeek, 1));
  const handleTodayWeek = () => setStartDateWeek(new Date());

  const weekDates = generateWeekRange(getWeekStartDate(startDateWeek));

  return (
    <>
      <Header
        weekDates={weekDates}
        setModalVisible={setModalVisible}
        onPrevWeek={handlePrevWeek}
        onNextWeek={hanldeNextWeek}
        onTodayWeek={handleTodayWeek}
      />
      <Calendar
        weekDates={weekDates}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};
export default App;