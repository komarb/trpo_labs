import React from "react";
import {timezones} from "./timezones";
import Select from "react-select";
const { DateTime } = require("luxon");

class MyTimezonePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedOption: timezones[0]};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => this.props.zoneHandler(this.state.selectedOption.utc[0])
        );
    };
    render() {
        return (
            <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={timezones}
            />
        )
    }
}


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: DateTime.local().setZone(`Europe/Moscow`).toFormat("HH:mm:ss").toString(),
            offsetDate: DateTime.local().setZone(`${this.props.zone}`).toFormat("HH:mm:ss").toString(),
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        let MD = DateTime.local().setZone(`Europe/Moscow`).toFormat("HH:mm:ss").toString()
        let OD = DateTime.local().setZone(`${this.props.zone}`).toFormat("HH:mm:ss").toString();

        this.setState({date: MD});
        this.setState( {offsetDate: OD});
    }

    render() {
        return (
            <div>
                <h2>It is {this.state.date} in Moscow.</h2>
                <h2>It is {this.state.offsetDate} in</h2>
            </div>
        );
    }
}

export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {zone: "Etc/GMT+12"};
    }

    render() {
        return (
            <div className="App">
                <Clock zone={this.state.zone}/>
                <div className="timezonePicker">
                    <MyTimezonePicker zoneHandler={off => {
                        this.setState({zone: off})
                    }}/>
                </div>

            </div>
        )
    }
}

