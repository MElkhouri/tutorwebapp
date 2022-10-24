import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import '../styles/Tutorhome.css'
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu} from 'react-pro-sidebar';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function TutorHome(props) {    
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
