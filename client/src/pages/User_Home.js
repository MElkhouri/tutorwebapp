import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import Sidebar from '../components/Sidebar'
import '../styles/Tutorhome.css'
import  Navbar  from '../components/Navbar';


function UserHome(props){    
    const location = useLocation();
    const [userData] = useState(location.state);
    
    console.log('userdata: ', userData);
    console.log('props', props);
    const [value, onChange] = useState(new Date());

    return (
        <div>
          
            <Navbar state = {true}/>
            <div className='home_container'>
            <Sidebar user = {userData.user} />
            <div className='home_body'>
                <h1 className='title'>Hi, {userData.user.first_name} see your upcoming sessions</h1>
                <Calendar className='calendar' tileClassName={({ date, view }) => {if(date.getUTCDate() === 25){ return 'highlight'; }}} onChange={onChange} value={value} />
                <h2>Upcoming session with Professor Elk on the 25th at 1:00 pm.</h2>
            
            </div>
            </div>
        </div>
        
    )
}

export default UserHome;
