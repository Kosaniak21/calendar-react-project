const baseUrl = 'https://6426f50bd24d7e0de47c799c.mockapi.io/api/v1/events';

export const getEventsList = () =>
  fetch(baseUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Internal Server Error. Can't display events");
      }
      return res.json();
    })
    .then((events) =>
      events
        .map(({ _id, dateFrom, dateTo, ...event }) => ({
          id: _id,
          dateFrom: new Date(dateFrom),
          dateTo: new Date(dateTo),
          ...event,
        }))
        .sort((a, b) => a.dateFrom - b.dateFrom)
    );

export const createEvent = async (newEvent) => {
  const events = await getEventsList();
  const conflicts = events.filter(
    (event) =>
      (newEvent.dateFrom >= event.dateFrom && newEvent.dateFrom < event.dateTo) ||
      (newEvent.dateTo > event.dateFrom && newEvent.dateTo <= event.dateTo) ||
      (event.dateFrom >= newEvent.dateFrom && event.dateFrom < newEvent.dateTo) ||
      (event.dateTo > newEvent.dateFrom && event.dateTo <= newEvent.dateTo)
  );
  if (conflicts.length > 0) {
    throw new Error('There is a conflict with another event. Please choose a different date/time.');
  }

  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),
  });

  if (!res.ok) {
    throw new Error('Failed to create event');
  }

  const createdEvent = await res.json();

  return {
    id: createdEvent._id,
    dateFrom: new Date(createdEvent.dateFrom),
    dateTo: new Date(createdEvent.dateTo),
    ...createdEvent,
  };
};
export const deleteEvent = (id) =>
  fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to delete task');
    }
  });
