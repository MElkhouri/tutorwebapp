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

  const onSubmit = (data) => {    
    let temp = new Date(data.date);
    temp.setTime(temp.getTime() - 5 * 60 * 60 * 1000);
    let newDate = temp.toISOString().split('T')[0] + " " + temp.toISOString().split('T')[1].split('.')[0];
    data.date = newDate;
    console.log("find tutor: ", data);
    axios.post("http://localhost:3001/users/findTutors", data).then((response) => {
        console.log(response)
        if(response.data === -1){
            alert("Error processing update.")
        }else{
            alert("found tutors");
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
        </div>
      </div>
    </div>
    
  );
}

export default Schedule_session;