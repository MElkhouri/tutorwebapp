import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import '../styles/Tutorhome.css';
import '../styles/Sidebar.css';
import Sidebar from '../components/Sidebar';
// import axios from "axios";
// import {useEffect} from 'react';


function Contact() {
    const location = useLocation();
    const [state] = useState(location.state);

  
    return (
        <div className='home_container'>
            <Sidebar user = {state.user} />
            <div className="home_body">
                <h2>To report an issue or to ask a question, please email support@razortutor.com. We will reply ASAP.</h2>
            </div>
        </div>
  
    )



}
export default Contact