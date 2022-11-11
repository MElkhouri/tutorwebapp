import React from "react";
import '../styles/Tutorhome.css'
import { Dropdown, Option } from "../components/Dropdown";
import Sidebar from '../components/Sidebar'
import '../styles/Sidebar.css';
import {useState} from 'react';
import { useLocation} from "react-router-dom";
import DatePicker from "react-datepicker";
import TutorTable from '../components/TutorTable';
import "react-datepicker/dist/react-datepicker.css";



function Schedule_session(props) {
  const location = useLocation();
  const [userData] = useState(location.state);
  //console.log(userData);
  const [course, setCourse] = useState("");
  const [tutorID, setTutorID] = useState("");
  

  const handleSelect = (e) => {
    //console.log(e);
   setCourse(e.target.value);
  }

  const handleCall = (e) => {
    setTutorID(e.state);
  }

const [startDate, setStartDate] = useState(new Date());
 return (
  
   <div className="home_container">
     <Sidebar user = {userData.user}/>
      <div >
          <h1>Which course are you interested in?</h1>
              <Dropdown
              formLabel="Choose a course"
              buttonText="Send form"
            
              onChange={handleSelect}         // action="http://localhost:3001/appointments/post"
              >
              <Option value="Physics" />
              <Option value="Calculus" />
              <Option value="Organic Chemistry" />
              <Option value="Expository Writing" />
              </Dropdown>
              <p>You selected {course} </p>
        </div>
        <div classname = "date picker">
        <h1>Choose your date and time</h1>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          dateFormat="Pp"/>
            </div>
      <TutorTable state = {userData}/>      
    </div>
    
    );
}

export default Schedule_session;