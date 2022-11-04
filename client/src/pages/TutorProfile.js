import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import '../styles/Tutorhome.css'
import '../styles/Sidebar.css';
// import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu} from 'react-pro-sidebar';
import Sidebar from '../components/Sidebar'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function TutorProfile(props) {    
    const location = useLocation();
    const [userData] = useState(location.state);
    console.log('userdata: ', userData);
    console.log('props', props);
    //const { collapseSidebar } = useProSidebar();


    return (
        
        <div className='home_container'>
            <Sidebar userData = {userData}/>
            <div className='home_body'>
                
            </div>
                

        </div>
      
               
    )
}

export default TutorProfile;
