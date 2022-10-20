import React from "react";
import { Dropdown, Option } from "../components/Dropdown";

class Schedule_session extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelect(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.value);
  }

  render() {
    return (
    <div>
        <div>
            <h1>Which course are you interested in?</h1>
            <Dropdown
            formLabel="Choose a course"
            buttonText="Send form"
            onChange={this.handleSelect}          action="http://localhost:3001/appointments/post"
            >
            <Option value="Click to see options" />
            <Option value="Calculus" />
            <Option value="Organic Chemistry" />
            <Option value="CyberSecurity" />
            </Dropdown>
            <p>You selected {this.state.value} </p>
        </div>
        <div>
        <h1>When?</h1>
        <Dropdown
            formLabel="Choose a date"
            buttonText="Send form"
            onChange={this.handleSelect}          action="http://localhost:3001/appointments/post"
        >
            <Option value="Click to see options" />
            <Option value="Option 1" />
            <Option value="Option 2" />
            <Option value="Option 3" />
        </Dropdown>
        <p>You selected {this.state.value} </p>
            </div>
    </div>
    );
  }
}

export default Schedule_session;