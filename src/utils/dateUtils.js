import { parse, setMinutes, setHours, format } from 'date-fns';

export const getWeekStartDate = date => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = startDate => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }

  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const formatMins = mins => (mins < 10 ? `0${mins}` : mins);

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getSelectOptions = (selectedTime, selectedStartTime, second) => {
  const options = [];
  options.push(
    <option key={'picker'} value={''}>
      pick
    </option>,
  );
  const selectedTimeDate = selectedTime ? parse(selectedTime, 'HH:mm', new Date()) : null;
  const startHour = selectedTimeDate ? selectedTimeDate.getHours() : 0;
  let startMinute = selectedTimeDate ? Math.ceil(selectedTimeDate.getMinutes() / 15) * 15 : 0;
  if (selectedStartTime) {
    const selectedStartTimeDate = parse(selectedStartTime, 'HH:mm', new Date());
    startMinute = selectedStartTimeDate.getMinutes();
  }

  for (let hour = startHour; hour < 24; hour += 1) {
    let endMinute = 60;
    if (!second) {
      endMinute = hour === 23 ? 45 : 60;
    }
    for (let minute = startMinute; minute < endMinute; minute += 15) {
      const time = setMinutes(setHours(new Date(), hour), minute);
      options.push(
        <option key={format(time, 'HH:mm')} value={format(time, 'HH:mm')}>
          {format(time, 'HH:mm')}
        </option>,
      );
    }
    startMinute = 0;
  }

  return options;
};
