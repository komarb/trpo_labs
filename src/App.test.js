import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MyTimeZonePicker from './App'
import App from './App'
const { DateTime } = require("luxon");

test('rendering time in Moscow', () => {
    let d = DateTime.local().setZone(`Europe/Moscow`).toFormat("HH:mm:ss").toString();
    const { getByText } = render(<App/>);
    expect(getByText("It is " + d +" in Moscow.")).toBeInTheDocument();
});

test('rendering timezonepicker with default value', () => {
    const { getByText, getByTestId } = render(<MyTimeZonePicker />);
    expect(getByText("(UTC-12:00) International Date Line West")).toBeInTheDocument();
});

jest.mock("react-select", () => ({ options, value, onChange }) => {
    function handleChange(event) {
        const option = options.find(
            option => option.value === event.currentTarget.value
        );
        onChange(option);
    }
    return (
        <select data-testid="select" value={value} onChange={handleChange}>
            {options.map(({label, value}, index) => (
                <option value={value} key={index}>
                    {label}
                </option>
            ))}
        </select>
    );
});

test("work of a MyTimezonePicker", () => {
    const { getByText, getByTestId } = render(<MyTimeZonePicker />);
    expect(getByText("(UTC-12:00) International Date Line West")).toBeInTheDocument();
    fireEvent.change(getByTestId("select"), { target: { value: "E. South America Standard Time" } });
    expect(getByText("(UTC-03:00) Brasilia")).toBeInTheDocument();
});