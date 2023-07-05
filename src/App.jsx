import React, { useState, useEffect } from 'react';
import { subWeeks, addWeeks } from 'date-fns';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar';
import { getEventsList } from './gateway/events';
import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';
import './common.scss';

const App = () => {
  const [startDateWeek, setStartDateWeek] = useState(new Date());
  const [events, setEvents] = useState([]);
  const handlePrevWeek = () => setStartDateWeek(subWeeks(startDateWeek, 1));
  const hanldeNextWeek = () => setStartDateWeek(addWeeks(startDateWeek, 1));
  const handleTodayWeek = () => setStartDateWeek(new Date());

  const weekDates = generateWeekRange(getWeekStartDate(startDateWeek));

  const getEvents = () => {
    getEventsList()
      .then(allEvents => setEvents(allEvents))
      .catch(error => alert(error.message));
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Header
        weekDates={weekDates}
        onPrevWeek={handlePrevWeek}
        onNextWeek={hanldeNextWeek}
        onTodayWeek={handleTodayWeek}
        getEvents={getEvents}
      />
      <Calendar weekDates={weekDates} events={events} getEvents={getEvents} />
    </>
  );
};
export default App;
