import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Clock.scss';

export default class Clock extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };

  intervalId = null;

  componentDidMount() {
    this.intervalId = setInterval(
      () => this.setState({ time: new Date().toLocaleTimeString() }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const time = this.state.time;
    const { direction, size } = this.props;
    return (
      <div className="clock__wrapper" style={{ textAlign: `${direction}` }}>
        <p className="clock__face" style={{ fontSize: `${size}px` }}>
          {time}
        </p>
      </div>
    );
  }
}

Clock.propTypes = {
  direction: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
