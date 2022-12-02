import React, {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import Sidebar from '../components/Sidebar'
import '../styles/Tutorhome.css'
import  Navbar  from '../components/Navbar';
import axios from "axios";
import moment from 'moment'

// class UserHome extends React.Component{
//     constructor(props){
//         super(props);
//         console.log("PRIPS: ",props)
//         this.state = {            
//             value: new Date(),
//             upcomingAppointments: []
//         }
//     }
//     componentDidMount(){
//         console.log("component state:", this.state);
//     }
// }
function UserHome(props){    
    
    const location = useLocation();
    let [userData] = useState(location.state);
    console.log('userdata: ', userData);
    console.log('props', props);

    const [value, onChange] = useState(new Date());
    //const [upcomingAppointments, setAppointments] = useState(new Date())
    
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
                <CalendarComponent name="calendar" />
                <br />
                <br />
                <h2>Upcoming session with Professor Elk on the 25th at 1:00 pm.</h2>
                
            </div>
            </div>
        </div>
        
    )
}

export default UserHome;
