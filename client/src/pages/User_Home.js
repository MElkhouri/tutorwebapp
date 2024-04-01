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
    const value = useState(new Date());
    const [getNextAppt, setNextAppt] = useState(0);
    const [upcomingAppointmentText, setUpcomingAppointmentText] = useState("No Upcoming Appointments");
    const [selectedAppointmentText, setSelectedAppointmentText] = useState("");
    const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD").toString() + "")
    const [apptIDtoText] = useState(new Map());
    const setMapValue = (map, key, value) => {
        if(!map.has(key)){
            map.set(key, new Array(value))
            return;
        }
        map.get(key).push(value);
    }
    const onChange = (props) => {
     
        let select = moment(new Date(props)).format("YYYY-MM-DD").toString();
        let currTime = moment(new Date()).format("MM-DD-YY hh:mm A").toString()
        setSelectedDate(select);
        let obj = noTimeMap.get(select);
        if(obj != undefined){
            for(let i = 0; i < obj.length; i++){
                let currAppt = obj[i];
                
                if(!currAppt.isRequest){
                    let appt = new Date(currAppt.date);
                    appt.setTime(appt.getTime() + new Date().getTimezoneOffset() * 60 * 1000);                          
                    let apptDateTime = moment(appt).format("MM-DD-YY hh:mm A")
                    let text = "";      
                    if(apptDateTime <= currTime){
                        text = ("Past appointment: " + currAppt.course + " at " + apptDateTime + " with tutor " + currAppt.tutorName);
                    }
                    else{
    
                        text = ("Scheduled session: " + currAppt.course + " at " + apptDateTime + " with tutor " + currAppt.tutorName);
                    }
                    apptIDtoText.set(currAppt.id, text)
                    
                }
                else{
                    let appt = new Date(currAppt.date);
                    appt.setTime(appt.getTime() + new Date().getTimezoneOffset() * 60 * 1000);                          
                    let apptDateTime = moment(appt).format("MM-DD-YY hh:mm A")
                    let text = "";
                    if(apptDateTime <= currTime){
                        text = ("Past appointment: " + currAppt.course + " at " + apptDateTime + " with tutor " + currAppt.tutorName);
                    }
                    else{
                        text = ("Pending appointment: " + currAppt.course + " at " + apptDateTime + " with tutor " + currAppt.tutorName);
                    }
                    apptIDtoText.set(currAppt.id, text);
                }            
            }
        }        
        else {
            setSelectedAppointmentText("No sessions on selected date");
        }        
    }
    
    let upcomingAppointments = [];
    let pendingAppointments = [];    
    let dateToApptMap = new Map();
    let noTimeMap = new Map();
    let previousAppointments = [];

    for(let i = 0; i < userData.user.Appointments.length; i++){
        let temp = new Date(userData.user.Appointments[i].date);
        temp.setTime(temp.getTime() + new Date().getTimezoneOffset() * 60 * 1000);  
        let currDate = moment(temp).format("YYYY-MM-DD");     
        let mapDate = moment(temp).format("YYYY-MM-DD hh:mm A");     
        if(userData.user.Appointments[i].isRequest){            
            pendingAppointments.push(currDate)      
            setMapValue(noTimeMap, currDate, userData.user.Appointments[i]);
   
        }else{
            if(mapDate > moment(new Date()).format("YYYY-MM-DD hh:mm A")){
                setMapValue(dateToApptMap, mapDate, userData.user.Appointments[i]);
                // dateToApptMap.set(mapDate, userData.user.Appointments[i]);
                upcomingAppointments.push(currDate)         
                
            } 
            //noTimeMap.set(currDate, userData.user.Appointments[i]);
            setMapValue(noTimeMap, currDate, userData.user.Appointments[i]);
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
            let min = moment(new Date(8640000000000000)).format("YYYY-MM-DD hh:mm A")
            for (const appt of dateToApptMap.keys()) {  
                let temp = new Date(dateToApptMap.get(appt)[0].date);
                temp.setTime(temp.getTime() + new Date().getTimezoneOffset() * 60 * 1000);                          
                let currDate = moment(temp).format("YYYY-MM-DD hh:mm A")
                if(currDate < min){
                    min = currDate
                }
            }
            if(min == moment(new Date()).format("YYYY-MM-DD hh:mm A")){
                let info = dateToApptMap.get(min)[0];
                let reformat = moment(min).format("MM-DD-YY hh:mm A")
                setUpcomingAppointmentText("Appointment today " + info.tutorName + " for " + info.course + " at " + reformat)
            }
            if(min > moment(new Date()).format("YYYY-MM-DD hh:mm A")){
                let info = dateToApptMap.get(min)[0];
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
                <div className='body_container'>
                    <div className='calendar_style'>
                        <CalendarComponent name="calendar" />
                        <h2>{upcomingAppointmentText}</h2>
                    </div>
                    {console.log(noTimeMap.get(selectedDate) + " " + selectedDate)}
                    {(noTimeMap.get(selectedDate) != undefined) && 
                        (noTimeMap.get(selectedDate)).map((val,key) => {
                            return(
                                <div className='select_text'>
                                    <p className='righttxt'>{apptIDtoText.get(val.id)}</p>
                                </div>
                            )
                        })         
                    }
                    {(noTimeMap.get(selectedDate) == undefined) && 
                        <div className='select_text'>
                            <p className='righttxt'>{selectedAppointmentText}</p>
                        </div>
                    }                       
                </div>
            </div>
            </div>
            <Footer userData = {userData}/>

        </div>
        
    )
}

export default UserHome;
