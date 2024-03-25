import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import '../styles/Tutorhome.css'
import '../styles/Sidebar.css';
import Sidebar from '../components/Sidebar'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Navbar from '../components/Navbar';
import moment from 'moment';

function TutorHome(props) {    
    const location = useLocation();
    const [userData,setUserData] = useState(location.state);
    console.log('Tutor userdata: ', userData.user);    
    const [value, onChange] = useState(new Date());
    const [getNextAppt, setNextAppt] = useState(0);
    const [upcomingAppointmentText, setUpcomingAppointmentText] = useState("No Upcoming Appointments");
    //const { collapseSidebar } = useProSidebar();    

    let upcomingAppointments = [];
    let pendingAppointments = [];
    let dateToApptMap = new Map();
    for(let i = 0; i < userData.user.Appointments.length; i++){
        let temp = new Date(userData.user.Appointments[i].date);
        temp.setTime(temp.getTime() + new Date().getTimezoneOffset() * 60 * 1000);  
        let currDate = moment(temp).format("YYYY-MM-DD"); 
        let mapDate = moment(temp).format("YYYY-MM-DD hh:mm A");     
        if(userData.user.Appointments[i].isRequest){            
            pendingAppointments.push(currDate)         
        }else{           
            if(mapDate > moment(new Date()).format("YYYY-MM-DD hh:mm A")){
                dateToApptMap.set(mapDate, userData.user.Appointments[i]);
            } 
            upcomingAppointments.push(currDate)         
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
            for (const appt of dateToApptMap.keys()) {  
                let temp = new Date(dateToApptMap.get(appt).date);
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
                let info = dateToApptMap.get(min);
                console.log("info", info);
                let reformat = moment(min).format("MM-DD-YY hh:mm A")
                setUpcomingAppointmentText("Appointment today " + info.studentName + " for " + info.course + " at " + reformat)
            }
            if(min > moment(new Date()).format("YYYY-MM-DD hh:mm A")){
                let info = dateToApptMap.get(min);
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
                <CalendarComponent name="calendar" />
                <br />
                <br />
                <h2>{upcomingAppointmentText}</h2>
            </div>
                

        </div>
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
