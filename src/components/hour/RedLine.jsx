import React, { useState, useEffect } from 'react';

const RedLine = () => {
  const [minutes, setMinutes] = useState(new Date().getMinutes());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMinutes(new Date().getMinutes());
    }, 60000);

    return () => clearInterval(intervalId);
  });

  return <div className="red-line" style={{ top: minutes }}></div>;
}

export default RedLine;