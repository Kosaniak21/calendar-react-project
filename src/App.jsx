import React, { useState } from 'react';
import { subWeeks, addWeeks } from 'date-fns';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar';
import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';
import './common.scss';
import { DateContext } from './context/context.js';

const App = () => {
  const [startDateWeek, setStartDateWeek] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);

  const [dateForHour, setDateForHour] = useState({
    day: null,
    hour: null,
    target: null,
  });

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
      <DateContext.Provider value={{ dateForHour, setDateForHour }}>
        <Calendar
          weekDates={weekDates}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      </DateContext.Provider>
    </>
  );
};
export default App;
