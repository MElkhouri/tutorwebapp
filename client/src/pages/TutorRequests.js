import {useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import {Formik, Field, ErrorMessage, Form} from 'formik'
import axios from "axios";
import '../styles/Tutorhome.css'
import '../styles/Sidebar.css';
// import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu} from 'react-pro-sidebar';
import Sidebar from '../components/Sidebar'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import moment from 'moment';

function TutorRequests(props) {    
    const location = useLocation();
    const [userData, setUserData] = useState(location.state);
    const [reRender, setReRender] = useState(false);

    console.log('userdata: ', userData);
    const tutorAppointments = userData.user.Appointments;
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
    const acceptRequest = async (appointment) => {   
        console.log("accept appt:", appointment); 
        const data = {
            apptID: appointment.id
        }
        await axios.post("http://localhost:3001/appointments/acceptAppointment", data)
        setReRender(true)
    }
    const rejectRequest = async (deleteAppt) => {   
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
    return(
        <div>
            <Navbar state={true} />
        
        <div className='home_container'>
            <Sidebar user = {userData.user}/>

            <div className='home_body'>
                <h1>Incoming Tutoring Requests</h1>
                <div>                
                    <table>
                    <tr>
                    <th>Student Name</th>
                    <th>Date</th>
                    <th>Course</th>
                    </tr>
                    {tutorAppointments.map((val, key) => {
                        let temp = new Date(val.date);
                        temp.setTime(temp.getTime() + new Date().getTimezoneOffset() * 60 * 1000)
                        if(val.isRequest){
                            return (
                                <tr>
                                    <td>{val.studentName}</td>
                                    <td>{moment(new Date(temp)).format("YYYY-MM-DD hh:mm A").toString()}</td>
                                    <td>{val.course}</td>
                                    <td>
                                        <button onClick={() => acceptRequest(val)}>Accept Request</button>
                                    </td>
                                    <td>
                                        <button onClick={() => rejectRequest(val)}>Reject Request</button>
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

    )
}

export default TutorRequests;
