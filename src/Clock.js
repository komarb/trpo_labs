import React from 'react';
import { string } from 'prop-types';

const { DateTime } = require('luxon');


export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: DateTime.local().setZone('Europe/Moscow').toFormat('HH:mm:ss').toString(),
      offsetDate: DateTime.local().setZone(`${this.props.zone}`).toFormat('HH:mm:ss').toString(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const MD = DateTime.local().setZone('Europe/Moscow').toFormat('HH:mm:ss').toString();
    const OD = DateTime.local().setZone(`${this.props.zone}`).toFormat('HH:mm:ss').toString();

    this.setState({ date: MD });
    this.setState({ offsetDate: OD });
  }

  render() {
    return (
      <div>
        <h2>
          It is
          {' '}
          {this.state.date}
          {' '}
          in Moscow.
        </h2>
        <h2>
          It is
          {' '}
          {this.state.offsetDate}
          {' '}
          in
        </h2>
      </div>
    );
  }
}
Clock.propTypes = {
  zone: string,
};
Clock.defaultProps = {
  zone: 'Etc/GMT+12',
};
