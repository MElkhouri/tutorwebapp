import React from "react";
import Calendar from 'react-calendar';
import '../styles/Tutorhome.css'
import { Dropdown, Option } from "../components/Dropdown";
import Sidebar from '../components/Sidebar'
import '../styles/Sidebar.css';
import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";

function Schedule_session(props) {
  const location = useLocation();
  const [userData] = useState(location.state);
  console.log(userData);
  const [course, setCourse] = useState("");
  

  const handleSelect1 = (e) => {
    //console.log(e);
   setCourse(e.target.value);
  }

 const handleSubmit= (e) => {
    e.preventDefault();
    console.log(course);
  }


 return (
   <div className="home_container">
     <Sidebar user = {userData.user}/>
      <div >
      <h1>Which course are you interested in?</h1>
            <Dropdown
            formLabel="Choose a course"
            buttonText="Send form"
            onChange={handleSelect1}         // action="http://localhost:3001/appointments/post"
            >
            <Option value="Click to see options" />
            <Option value="Calculus" />
            <Option value="Organic Chemistry" />
            <Option value="CyberSecurity" />
            </Dropdown>
            <p>You selected {course} </p>
        </div>
        <div>
        
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

export default Schedule_session;