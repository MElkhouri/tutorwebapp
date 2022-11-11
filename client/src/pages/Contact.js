import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import '../styles/Tutorhome.css';
import '../styles/Sidebar.css';
import Sidebar from '../components/Sidebar';
import Navbar from "../components/Navbar";
// import axios from "axios";
// import {useEffect} from 'react';


function Contact() {
    const location = useLocation();
    const [state] = useState(location.state);

    const [logged, setLogged] = useState(false);
    if(state.user !== null){
        setLogged(true);
    }
    return (
        <div className='home_container'>
            <Navbar state = {logged}/>
            <Sidebar user = {state.user} />
            <div className="home_body">
                <h2>To report an issue or to ask a question, please email support@razortutor.com. We will reply ASAP.</h2>
            </div>
        </div>
  
    )



}
export default Contact