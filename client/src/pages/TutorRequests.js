import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import {Formik, Field, ErrorMessage, Form} from 'formik'
import axios from "axios";
import '../styles/Tutorhome.css'
import '../styles/Sidebar.css';
// import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu} from 'react-pro-sidebar';
import Sidebar from '../components/Sidebar'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function TutorRequests(props) {    
    const location = useLocation();
    let [userData] = useState(location.state);
    console.log('userdata: ', userData);

    return(
        <div>
            <Navbar state={true} />
        
        <div className='home_container'>
            <Sidebar user = {userData.user}/>

            <div className='home_body'>


                <h1>tutorRequets</h1>
            </div>

        </div>
    </div>

    )
}

export default TutorRequests;
