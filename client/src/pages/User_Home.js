import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import Calendar from 'react-calendar';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import '../styles/Tutorhome.css'

function UserHome(props) {    
    const location = useLocation();
    const [userData] = useState(location.state);
    console.log('userdata: ', userData);
    console.log('props', props);
    const [value, onChange] = useState(new Date());
    const { collapseSidebar } = useProSidebar();

    return (
        <div className='home_container'>
            <div className='sidebar'>                
                <Sidebar backgroundColor='rgb(45, 207, 12, 0.5)'>
                    <Menu closeOnClick='true'>                       
                        <MenuItem> Upcoming Sessions</MenuItem>
                        <MenuItem href={"/Schedule_session"}> Schedule a Tutoring Session</MenuItem>
                        <MenuItem> My Profile </MenuItem>                        
                        <MenuItem href = {"/Contact"}>Help</MenuItem>
                            {/* <MenuItem className='help'> To report an issue or to ask a question, please email support@razortutor.com. We will reply ASAP. </MenuItem>                         */}
                        
                    </Menu>                  
                </Sidebar>                                    
            </div>
            <main>                    
                <button className = 'collapse' onClick={() => collapseSidebar()}>
                    <ArrowLeftIcon />
                </button>
            </main>
            <h1>Hi, {userData.user.first_name} see your upcoming sessions</h1>
            <Calendar tileClassName={({ date, view }) => {if(date.getUTCDate() === 25){ return 'highlight'; }}} onChange={onChange} value={value} />
                

        </div>
    )
    }

export default UserHome;
