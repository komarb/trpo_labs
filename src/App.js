import React from 'react';
import Clock from './Clock';
import MyTimezonePicker from './MyTimezonePicker';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { zone: 'Etc/GMT+12' };
  }

  render() {
    return (
      <div className="App">
        <Clock zone={this.state.zone} />
        <div className="timezonePicker">
          <MyTimezonePicker zoneHandler={(off) => {
            this.setState({ zone: off });
          }}
          />
        </div>

      </div>
    );
  }
}
