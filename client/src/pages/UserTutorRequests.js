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
    const appointments = userData.user.Appointments;
    console.log("request: ",appointments);

    // const useUserData = () => {
    //     useEffect(() => {
    //         let newUserData = getUserData(userData);
    //         console.log("user: ", userData);
    //         console.log("newUser: ", newUserData);
    //         setUserData(newUserData)
    //         console.log("user2: ", userData);
    //     })
    // }
    const deleteRequest = async (deleteAppt) => {   
        console.log("deletE: ",deleteAppt);
        axios.delete("http://localhost:3001/appointments/deleteAppointment", {
            data: { data: deleteAppt.id },
        })
        const data = {
            email: userData.user.email,
            password: userData.user.password
        }
        console.log("PRE: ",userData)
        console.log("data: ",data)
        axios.post("http://localhost:3001/users/auth", data).then((response) => {
            console.log("RESSSL", response.data[0])
            if(response.data === -1){
                alert("There was a problem")
            }
            else{
                // for(let i = 0; i < appointments.length; i++){
                //     console.log("appt: ",appointments[i]);
                //     if(appointments[i].id == deleteAppt.id){
                //         console.log("splice",appointments[i]);
                //         appointments.splice(i,1);
                //     }
                // }
                setUserData({user: response.data[0]});
                
            }
        });
        console.log("Post: ",userData)
        // .then((response) => {
        //     console.log(response);
        //     console.log(appointments);
        //     alert("Appointment Deleted");
        // })
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
            
        </div>        
    );
}

export default UserTutorRequests;