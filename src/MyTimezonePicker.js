import React from 'react';
import Select from 'react-select';
import { func } from 'prop-types';
import { timezones } from './timezones';

export default class MyTimezonePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: timezones[0] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (selectedOption) => {
    this.setState(
      { selectedOption },
      () => this.props.zoneHandler(this.state.selectedOption.utc[0]),
    );
  };

  render() {
    return (
      <Select
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={timezones}
      />
    );
  }
}
MyTimezonePicker.propTypes = {
  zoneHandler: func,
};
MyTimezonePicker.defaultProps = {
  zoneHandler: func,
};
