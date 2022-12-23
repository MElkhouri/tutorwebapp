import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import '../styles/Tutorhome.css'
import '../styles/Sidebar.css';
import Sidebar from '../components/Sidebar'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Navbar from '../components/Navbar';
import moment from 'moment';
import Footer from "./footer"

function TutorHome(props) {    
    const location = useLocation();
    const [userData,setUserData] = useState(location.state);
    const [getNextAppt, setNextAppt] = useState(0);
    const [upcomingAppointmentText, setUpcomingAppointmentText] = useState("No Upcoming Sessions");
    const [selectedAppointmentText, setSelectedAppointmentText] = useState("");
    const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD").toString() + "")
    const [apptIDtoText] = useState(new Map());
    console.log('Tutor userdata: ', userData.user);    
    const setMapValue = (map, key, value) => {
        if(!map.has(key)){
            map.set(key, new Array(value))
            return;
        }
        map.get(key).push(value);
    }

    const value = useState(new Date());
    const onChange = (props) => {
        let select = moment(new Date(props)).format("YYYY-MM-DD").toString();
        let currTime = moment(new Date()).format("MM-DD-YY hh:mm A").toString()
        setSelectedDate(select);
        let obj = noTimeMap.get(select);
        console.log('Obj:',obj);
        if(obj != undefined){
            for(let i = 0; i < obj.length; i++){
                let currAppt = obj[i];
                
                if(!currAppt.isRequest){
                    console.log("Upcoming");
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
                    console.log("pending");
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
        
        console.log('TETL', apptIDtoText);
    }
    

    let upcomingAppointments = [];
    let pendingAppointments = [];
    let previousAppointments = [];
    let dateToApptMap = new Map();
    let noTimeMap = new Map();
    
    for(let i = 0; i < userData.user.Appointments.length; i++){
        let temp = new Date(userData.user.Appointments[i].date);
        temp.setTime(temp.getTime() + new Date().getTimezoneOffset() * 60 * 1000);  
        let currDate = moment(temp).format("YYYY-MM-DD"); 
        let mapDate = moment(temp).format("YYYY-MM-DD hh:mm A"); 
        if(userData.user.Appointments[i].isRequest){            
            pendingAppointments.push(currDate)    
            setMapValue(noTimeMap, currDate, userData.user.Appointments[i]);
     
        }
        else{           
            if(mapDate > moment(new Date()).format("YYYY-MM-DD hh:mm A")){
                setMapValue(dateToApptMap, mapDate, userData.user.Appointments[i]);
                upcomingAppointments.push(currDate)         
                
            } 
            setMapValue(noTimeMap, currDate, userData.user.Appointments[i]);
            previousAppointments.push(currDate);
        }
    }   
    console.log("MAP:", dateToApptMap);
    if(upcomingAppointments.length > 0){
        upcomingAppointments.sort(function (a, b) {
            return Math.abs(new Date() - new Date(a)) - Math.abs(new Date() - new Date(b));
        });
    }
    console.log("AFTER: ",upcomingAppointments)
    if(dateToApptMap.size > 0){
        if(getNextAppt == 0){
            console.log("ASDFEG")
            console.log(dateToApptMap.size);
            let min = moment(new Date(8640000000000000)).format("YYYY-MM-DD hh:mm A")
            console.log("mn: ", min)
            for (const appt of dateToApptMap.keys()) {  
                let temp = new Date(dateToApptMap.get(appt)[0].date);
                temp.setTime(temp.getTime() + new Date().getTimezoneOffset() * 60 * 1000);                          
                let currDate = moment(temp).format("YYYY-MM-DD hh:mm A")
                console.log("curr", currDate);
                if(currDate < min){
                    console.log("here");
                    min = currDate
                }
                console.log("min:", min)
            }
            if(min == moment(new Date()).format("YYYY-MM-DD hh:mm A")){
                let info = dateToApptMap.get(min)[0];
                console.log("info", info);
                let reformat = moment(min).format("MM-DD-YY hh:mm A")
                setUpcomingAppointmentText("Appointment today " + info.studentName + " for " + info.course + " at " + reformat)
            }
            if(min > moment(new Date()).format("YYYY-MM-DD hh:mm A")){
                let info = dateToApptMap.get(min)[0];
                console.log("info", info);
                let reformat = moment(min).format("MM-DD-YY hh:mm A")
                setUpcomingAppointmentText("Next appointment is at " + reformat + " with " + info.studentName + " for " + info.course)
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
                            console.log("val", val);
                            console.log("text", apptIDtoText);
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
      
            // <div className="ddl">
                
            //         <h2>Schedule a new session</h2>
            //         <form>
            //             <select onChange={this.handleSelect}>
            //                 <option value="Calculus">Calculus</option>
            //                 <option value="american_history">American History</option>
            //                 <option value="organic_chemistry">Organic Chemistry</option>
            //                 <option value="data_structures">Data Structures</option>
            //             </select>
            //         <button onClick={this.onSubmit.bind(this)}>Find tutors</button>
            //         </form>
                
		// </div>
        
    )
}

export default TutorHome;
