import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Clock.scss';

const Clock = ({ direction, size }) => {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());
  const intervalId = useRef(null);

  useEffect(() => {
    intervalId.current = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000
    );

    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  return (
    <div className="clock__wrapper" style={{ textAlign: `${direction}` }}>
      <p className="clock__face" style={{ fontSize: `${size}px` }}>
        {time}
      </p>
    </div>
  );
};

Clock.propTypes = {
  direction: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default Clock;
