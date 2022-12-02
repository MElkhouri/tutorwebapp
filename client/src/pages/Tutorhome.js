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
    //const { collapseSidebar } = useProSidebar();    

    let upcomingAppointments = [];
    let pendingAppointments = [];
    for(let i = 0; i < userData.user.Appointments.length; i++){
        console.log("Date: ", userData.user.Appointments[i].date);
        let temp = new Date(userData.user.Appointments[i].date);
        temp.setTime(temp.getTime() + new Date().getTimezoneOffset() * 60 * 1000);  
        let currDate = moment(temp).format("YYYY-MM-DD");     
        console.log("currDate: ", currDate);

        if(userData.user.Appointments[i].isRequest){            
            pendingAppointments.push(currDate)         
        }else{
            upcomingAppointments.push(currDate)         
        }
    }   
    console.log("asdeg",upcomingAppointments);

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
            if(upcomingAppointments.includes(moment(new Date(date)).format("YYYY-MM-DD").toString())){
                return 'highlight';
            }
            if(pendingAppointments.includes(moment(new Date(date)).format("YYYY-MM-DD").toString())){
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
