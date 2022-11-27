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
import { CoursesList } from "../constants/constants";
import Navbar from '../components/Navbar';
import axios from "axios";

import {Formik, Field, ErrorMessage, Form, useField, useFormikContext} from 'formik';


function Schedule_session(props) {
  const location = useLocation();
  const [userData] = useState(location.state);
  //console.log(userData);
  const [course, setCourse] = useState("");
  const [tutorID, setTutorID] = useState("");
  const [showTutors, setShowTutors] = useState(false);
  const [foundTutors, setFoundTutors] = useState({})
  const handleSelect = (e) => {
    //console.log(e);
   setCourse(e.target.value);
  }

  const handleCall = (e) => {
    setTutorID(e.state);
  }


  const [startDate, setStartDate] = useState(new Date());

  const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
      <DatePicker
        selected={startDate}
        showTimeSelect
        dateFormat="Pp"
        onChange={(val) => {         
          setStartDate(val)
          setFieldValue(field.name, val);
        }}
      />
    );
  };
  const initialValues = {course: "Calculus 1", date: new Date()};
  const removeBookedTutors = (tutors) => {
    for(let i = 0; i < tutors.length; i++){
      let curr = tutors[i]
      console.log('CURRENT: ',curr);
      for(let j = 0; j < curr.Appointments.length; j++){
        let date = curr.Appointments[j].date.toString();
        let temp = new Date(startDate);
        temp.setTime(temp.getTime() - new Date().getTimezoneOffset() * 60 * 1000);  
        temp = temp.toISOString()+"";
        if(date.substring(0,date.length-5) == temp.substring(0,temp.length-5)){          
          tutors.splice(i,1);
          i--;
        }
      }
    }
    if(tutors.length > 0)
      return true;
    else  
      return false;
  };
  const selectTutor = (tutor) => {    
    console.log("selected: ", tutor);
    console.log("Dataees: ", startDate);
    let date = new Date(startDate);
    date.setTime(date.getTime() - new Date().getTimezoneOffset() * 60 * 1000);  
    date = date.toISOString();
    let data = {
      date: date, 
      tutor: tutor.id, 
      student: userData.user.id, 
    }
    console.log("appt data: ",data);
    axios.post("http://localhost:3001/appointments/createAppointment", data).then((response) => {
        console.log(response)
        if(response.data === 'Appointment already exists. Try another'){
            alert("This Tutor is busy this day try another tutor or time.")
        }else{
            alert("Created appointment");            
            userData.user.Appointments.push({
              date: startDate,
              tutor: tutor.id, 
              student: userData.user.id, 
            })
        }
    }).catch(console.log('catch'));     
  }
  const onSubmit = (data) => {    
    let temp = new Date(data.date);
    temp.setTime(temp.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
    let newDate = (temp.toISOString().split('T')[0] + " " + temp.toISOString().split('T')[1].split('.')[0]);
    data.date = newDate;
    console.log("find tutor: ", data);
    axios.post("http://localhost:3001/users/findTutors", data).then((response) => {
        console.log(response)
        if(response.data === 'No tutors found'){
            alert("No tutors found.")
            setFoundTutors([]);
            setShowTutors(false); 
        }else{
            if(removeBookedTutors(response.data)){
              alert("found tutors");
              setShowTutors(true); 
              setFoundTutors(response.data);            
            }
            else{
              alert("No tutors are free at this time");
              setFoundTutors([]);
              setShowTutors(false); 
            }
            // console.log("Found data: ", response.data);
            
            // console.log("Found: ", foundTutors);
        }
    }).catch(console.log('catch'));     
  }
  return (
    <div>
      <Navbar state = {true}/>
      <div className="home_container">
        <Sidebar user = {userData.user}/>
        <div className='home_body'>                
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            <Form className="schedule_session_form">                
              <span>Schedule a tutoring session!</span>
              <br/>
              <br/>
              <br/>
              <label>Choose a course:</label>
              <ErrorMessage name = "course" component="error" /> 
              <Field as="select" name="course">
                {CoursesList.map((val,key) => {
                  return(          
                    <option key={key} value={val}>{val}</option>
                    );                
                  }
                  )}                          
              </Field>
              <br/>
              <br/>
              <label>Choose a time: </label>
              <ErrorMessage name = "date" component="error" /> 
              <DatePickerField name="date" />              
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <button type="submit">Find a tutor</button>
            </Form>
          </Formik>                  
          {/* <TutorTable state = {userData}/>       */}
          {(showTutors) && (
            <div>
              <h1>List of Possible tutors</h1> 
              <table>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Bio</th>
                </tr>
                {foundTutors.map((val, key) => {
                  console.log("value: ", val);
                  return (
                    <tr>
                      <td>{val.first_name}</td>
                      <td>{val.last_name}</td>
                      <td>{val.bio}</td>
                      <td>
                        <button onClick={() => selectTutor(val)}>Select Tutor</button>
                      </td>
                    </tr>                    
                    );
                  }
                  )}
              </table>
            </div>

          )}
        </div>
      </div>
    </div>
    
  );
}

export default Schedule_session;