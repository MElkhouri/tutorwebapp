import React from "react";
import Calendar from 'react-calendar';
import { Dropdown, Option } from "../components/Dropdown";

class Schedule_session extends React.Component {
  constructor(props) {
    super(props);
    this.state = { course: "", date: ""};

    this.handleSelect1 = this.handleSelect1.bind(this);
    this.handleSelect2 = this.handleSelect2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelect1(event) {
    console.log(event);
    this.setState({ course: event.target.value });
  }

  handleSelect2(event) {
    console.log(event);
    this.setState({ date: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.value);
  }

  render() {
    const value = this.state.date;
    return (
    <div>
        <div>
            <h1>Which course are you interested in?</h1>
            <Dropdown
            formLabel="Choose a course"
            buttonText="Send form"
            onChange={this.handleSelect1}         // action="http://localhost:3001/appointments/post"
            >
            <Option value="Click to see options" />
            <Option value="Calculus" />
            <Option value="Organic Chemistry" />
            <Option value="CyberSecurity" />
            </Dropdown>
            <p>You selected {this.state.course} </p>
        </div>
        <div>
        <h1>Choose a day when you're free.</h1>
        <Calendar tileClassName={({ date, view }) => {if(date.getUTCDate() === 25){ return 'highlight'; }}} onChange={this.handleSelect2} value={value} />
        <p>You selected {this.state.date} </p>
        {/* <Dropdown
            formLabel="Choose a date"
            buttonText="Send form"
            onChange={this.handleSelect}          //action="http://localhost:3001/appointments/post"
        >
            <Option value="Click to see options" />
            <Option value="Option 1" />
            <Option value="Option 2" />
            <Option value="Option 3" />
        </Dropdown>
        <p>You selected {this.state.value} </p> */}
            </div>
    </div>
    );
  }
}

export default Schedule_session;