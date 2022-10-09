import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Calendar from 'react-calendar';

function UserHome(props) {    
    const location = useLocation();
    const [userData] = useState(location.state);
    console.log('userdata: ', userData);
    console.log('props', props);
    const [value, onChange] = useState(new Date());
   

    return (
        <div>
            <div>
                <h1>Hi, {userData.user.first_name} see your upcoming sessions</h1>
                <h1>Your schedule for the week</h1>
                <Calendar 
                    tileClassName={({ date, view }) => {if(date.getUTCDate() === 25){
                        return 'highlight';
                    }}}
                    onChange={onChange} 
                    value={value} 
                />
                <br />
            </div>
        </div>
    )
    }

export default UserHome;
