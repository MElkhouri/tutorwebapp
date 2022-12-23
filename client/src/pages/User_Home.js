import React, {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import Sidebar from '../components/Sidebar'
import '../styles/Tutorhome.css'
import  Navbar  from '../components/Navbar';
import  Footer  from './footer';
import axios from "axios";
import moment from 'moment'


function UserHome(props){    
    
    const location = useLocation();
    let [userData] = useState(location.state);
    console.log('userdata: ', userData);
    console.log('props', props);
    const value = useState(new Date());
    const [getNextAppt, setNextAppt] = useState(0);
    const [upcomingAppointmentText, setUpcomingAppointmentText] = useState("No Upcoming Appointments");
    const [selectedAppointmentText, setSelectedAppointmentText] = useState("");
    const onChange = (props) => {
     
        let select = moment(new Date(props)).format("YYYY-MM-DD").toString();
        if(upcomingAppointments.includes( select)){
            console.log("Upcoming")
            let obj = noTimeMap.get(select);
            let appt = new Date(obj.date);
            appt.setTime(appt.getTime() + new Date().getTimezoneOffset() * 60 * 1000);                          
            let apptDateTime = moment(appt).format("MM-DD-YY hh:mm A")
    
            setSelectedAppointmentText("Scheduled session: " + obj.course + " at " + apptDateTime + " with tutor " + obj.tutorName);
            
        }
        else if(pendingAppointments.includes(select)){
            console.log("pending")
            let obj = noTimeMap.get(select);
            let appt = new Date(obj.date);
            appt.setTime(appt.getTime() + new Date().getTimezoneOffset() * 60 * 1000);                          
            let apptDateTime = moment(appt).format("MM-DD-YY hh:mm A")
    

            setSelectedAppointmentText("Pending appointment: " + obj.course + " at " + apptDateTime + " with tutor " + obj.tutorName);
        }
        else if(previousAppointments.includes(select)){
            console.log("previous");
            let obj = noTimeMap.get(select);
            let appt = new Date(obj.date);
            appt.setTime(appt.getTime() + new Date().getTimezoneOffset() * 60 * 1000);                          
            let apptDateTime = moment(appt).format("MM-DD-YY hh:mm A")
    

            setSelectedAppointmentText("Past appointment: " + obj.course + " at " + apptDateTime + " with tutor " + obj.tutorName);
        }
        else{
            console.log("else")
            setSelectedAppointmentText("No sessions on selected date");
        }
    }
    
    let upcomingAppointments = [];
    let pendingAppointments = [];    
    let dateToApptMap = new Map();
    let noTimeMap = new Map();
    let previousAppointments = [];

    for(let i = 0; i < userData.user.Appointments.length; i++){
        console.log("Date: ", userData.user.Appointments[i].date);
        let temp = new Date(userData.user.Appointments[i].date);
        temp.setTime(temp.getTime() + new Date().getTimezoneOffset() * 60 * 1000);  
        let currDate = moment(temp).format("YYYY-MM-DD");     
        let mapDate = moment(temp).format("YYYY-MM-DD hh:mm A");     
        if(userData.user.Appointments[i].isRequest){            
            pendingAppointments.push(currDate)         
        }else{
            if(mapDate > moment(new Date()).format("YYYY-MM-DD hh:mm A")){
                dateToApptMap.set(mapDate, userData.user.Appointments[i]);
                upcomingAppointments.push(currDate)         
                
            } 
            noTimeMap.set(currDate, userData.user.Appointments[i]);
            previousAppointments.push(currDate);         
        }
    }   
    if(upcomingAppointments.length > 0){
        upcomingAppointments.sort(function (a, b) {
            return Math.abs(Date.now() - new Date(b.toDate)) - Math.abs(Date.now() - new Date(a.toDate));
        });
    }
    if(dateToApptMap.size > 0){   
        if(getNextAppt == 0){
            console.log(dateToApptMap.size);
            let min = moment(new Date(8640000000000000)).format("YYYY-MM-DD hh:mm A")
            for (const appt of dateToApptMap.keys()) {  
                let temp = new Date(dateToApptMap.get(appt).date);
                temp.setTime(temp.getTime() + new Date().getTimezoneOffset() * 60 * 1000);                          
                let currDate = moment(temp).format("YYYY-MM-DD hh:mm A")
                if(currDate < min){
                    console.log("here");
                    min = currDate
                }
            }
            if(min == moment(new Date()).format("YYYY-MM-DD hh:mm A")){
                let info = dateToApptMap.get(min);
                let reformat = moment(min).format("MM-DD-YY hh:mm A")
                setUpcomingAppointmentText("Appointment today " + info.tutorName + " for " + info.course + " at " + reformat)
            }
            if(min > moment(new Date()).format("YYYY-MM-DD hh:mm A")){
                let info = dateToApptMap.get(min);
                let reformat = moment(min).format("MM-DD-YY hh:mm A")
                setUpcomingAppointmentText("Next appointment is at " + reformat + " with " + info.tutorName + " for " + info.course)
            }
            setNextAppt(1);
        }
}

    const data = {
        student: userData.user.id,
        date: new Date()
    }
    const CalendarComponent = ({ ...props }) => {
        return (
          <Calendar
          className='calendar' tileClassName={({ date, view }) => { 
            // console.log(moment(new Date(date)).format("YYYY-MM-DD"));
            // console.log("Upcoming:", upcomingAppointments.includes(moment(new Date(date)).format("YYYY-MM-DD")).toString());
            let today = moment(new Date()).format("YYYY-MM-DD").toString()
            let current = moment(new Date(date)).format("YYYY-MM-DD").toString();
            if(upcomingAppointments.includes(current)){
                if(current < today){
                    return 'highlight3'
                }
                else
                    return 'highlight';
            }
            if(pendingAppointments.includes(current)){
                if(current < today)
                    return 'highlight3'
                else
                    return 'highlight2';
            }
            if(previousAppointments.includes(current)){
                return 'highlight3';
            }
            }} onChange={onChange} value={value}
          />
        );
    };
    console.log('user home data: ', data);
    // axios.post("http://localhost:3001/appointments/getUserAppointments", data).then((response) => {
    //     console.log("data", response.data);
    //     if(response.data === 'No appointments'){
    //         alert("no upcoming appointments");
    //     }else{            
    //         for(let i = 0; i < response.data.length; i ++){
    //             let currDate = moment(new Date(response.data[i].date)).format("YYYY-MM-DD");     
    //             upcomingAppointments.push(currDate)         
    //         }           
    //     }
    //     console.log("IP:", upcomingAppointments);
    // }).catch(console.log('catch'));     
    // console.log("IP2:", upcomingAppointments);
    
    return (
        <div>
            <Navbar state = {true}/>
            <div className='home_container'>
            <Sidebar user = {userData.user} />
            <div className='home_body'>
                <h1 className='title'>Hi, {userData.user.first_name} see your upcoming sessions</h1>
                <div className='user_row'>
                    <div className='user_column'>
                        <CalendarComponent name="calendar" />
                        <h2>{upcomingAppointmentText}</h2>
                    </div>
                    <div className='user_column'>
                        <p className='righttxt'>{selectedAppointmentText}</p>
                    </div>
                </div>
            </div>
            </div>
            <Footer userData = {userData}/>

        </div>
        
    )
}

export default UserHome;
