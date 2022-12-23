import React, { useEffect } from "react";
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
import moment from 'moment'
import getUserData from '../helperFunction/UserDataFunctions';
import {Formik, Field, ErrorMessage, Form, useField, useFormikContext} from 'formik';


function UserTutorRequests(props) {
    const location = useLocation();
    const [userData, setUserData] = useState(location.state);
    const [reRender, setReRender] = useState(false);

    const appointments = userData.user.Appointments;
    console.log("request: ",appointments);

    useEffect(() => {
        const data2 = {
            email: userData.user.email,
            password: userData.user.password
        }
        axios.post("http://localhost:3001/users/auth", data2).then((response) => {
            console.log(response.data[0])
            if(response.data === -1){
                alert("Incorrect login credentials please try again.")
            }
            else{                
                setUserData({user: response.data[0]});
            }
        });
        console.log("POST EFFECT:", userData);
        setReRender(false)
    }, [reRender])
    const deleteRequest = async (deleteAppt) => {   
        console.log("deletE: ",deleteAppt);
        await axios.delete("http://localhost:3001/appointments/deleteAppointment", {
            data: { data: deleteAppt.id },
        }).then((response) => {
            console.log("DELETE: ", response);
        }).catch(error => {
            console.error('There was an error!', error);
        });
        const data = {
            email: userData.user.email,
            password: userData.user.password
        }
        setReRender(true)
    }
    return (
        <div>
            <Navbar state = {true}/>
            <div className="home_container">
                <Sidebar user = {userData.user}/>
                <div className='home_body'>
                <h1>Current Requests</h1>   
                <div>                
                    <table>
                    <tr>
                    <th>Tutor Name</th>
                    <th>Date</th>
                    <th>Course</th>
                    <th>Is Confirmed</th>
                    </tr>
                    {appointments.map((val, key) => {
                        let temp = new Date(val.date);
                        temp.setTime(temp.getTime() + new Date().getTimezoneOffset() * 60 * 1000)
                        if(val.isRequest){
                            return (
                                <tr>
                                    <td>{val.tutorName}</td>
                                    <td>{moment(new Date(temp)).format("YYYY-MM-DD hh:mm A").toString()}</td>
                                    <td>{val.course}</td>
                                    <td>{!val.isRequest + ""}</td>
                                    <td>
                                        <button onClick={() => deleteRequest(val)}>Cancel Request</button>
                                    </td>
                                </tr>                    
                                );
                        }
                    })}
                </table>
                </div>
                    
                </div>
            
            </div>
            <Footer userData = {userData}/>
        </div>        
    );
}

export default UserTutorRequests;