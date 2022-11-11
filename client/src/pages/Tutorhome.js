import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import '../styles/Tutorhome.css'
import '../styles/Sidebar.css';
import Sidebar from '../components/Sidebar'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Navbar from '../components/Navbar';

function TutorHome(props) {    
    const location = useLocation();
    const [state] = useState(location.state);
    console.log('Tutor userdata: ', state.user);    
    const [value, onChange] = useState(new Date());
    //const { collapseSidebar } = useProSidebar();    

    return (
        <div>
            <Navbar state = {true}/>
        <div className='home_container'>
            <Sidebar user = {state.user} />
            <div className='home_body'>
                <h1 className='title'>Hi, {state.user.first_name} see your upcoming sessions</h1>
                <Calendar className='calendar' tileClassName={({ date, view }) => {if(date.getUTCDate() === 25){ return 'highlight'; }}} onChange={onChange} value={value} />
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
