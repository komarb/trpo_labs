import React from "react";
import {timezones} from "./timezones";
import Select from "react-select";

class MyTimezonePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedOption: timezones[0]};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => this.props.offsetHandler(this.state.selectedOption.offset)
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
            date: new Date(),
            offsetDate: new Date(),
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
        let OD = new Date();
        OD.setHours(OD.getUTCHours()  + parseInt(this.props.offset));
        this.setState({date: new Date()});
        this.setState( {offsetDate: OD});
    }

    render() {
        return (
            <div>
                <h2>It is {this.state.date.toLocaleTimeString()} in Moscow.</h2>
                <h2>It is {this.state.offsetDate.toLocaleTimeString()} in</h2>
            </div>
        );
    }
}

export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {offset: 0};
    }

    render() {
        return (
            <div className="App">
                <Clock offset={this.state.offset}/>
                <MyTimezonePicker offsetHandler={off => {
                    this.setState({offset: off})
                }}/>
            </div>
        )
    }
}

