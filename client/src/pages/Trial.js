import Navbar from '../components/Navbar'
import { useLocation } from "react-router-dom";
import React, { useRef,useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/Tutorhome.css';
import '../styles/Login.css';
import Sidebar from '../components/Sidebar';
import Footer from './footer';
// import axios from "axios";
// import {useEffect} from 'react';


function Trial() {
    const location = useLocation();
    const [state] = useState(location.state);
    let logged = false;
    
    console.log(state.user)
    if(state.user !== null){
        logged = true;
    }
    let sidebarData = location.state.user
    let footerData = {user: location.state.user}

    const form = useRef();
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_qgy7z78', 'template_7z38wxd', form.current, 'PKWK63FQmkCdYEeqO')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        alert("Message sent!");
    };
  

    if(logged){

        return (
            <div>
        
                <Navbar state = {logged}/>
                <div className="home_container">
                    <Sidebar user={sidebarData} />
                    <div className="home_body">
                        <h1>Free Trial For Schools</h1>
                        <h2>Fill out the information below to learn more about our free trial we offer to schools.</h2>
                        <div className="login form">
                            <form ref={form} onSubmit={sendEmail}>
                            <input type="text" required name="contact_title" placeholder="Primary Contact and Title" />
                            <input type="email" required name="user_email" placeholder="Enter your email address"/>
                            <input type="text" name="phone" placeholder="Phone Number"/>
                            <input type="text" required name="school" placeholder="School" />
                            <input type="text" name="Message" placeholder="Anything else you want to say?" />
                            
                            <button type="submit">Send</button>
                        </form>
                        </div>
                    </div>
                </div>
                <Footer userData={footerData} />
                
        
            </div>
    
        )
    }
    else {
        return(
            <div>
                <Navbar state = {logged}/>
            <div className="home_container">
                <div className="home_body">
                    <h1>Free Trial For Schools</h1>
                    <h2>Fill out the information below to learn more about our free trial we offer to schools.</h2>
                    <div className="login form">
                        <form ref={form} onSubmit={sendEmail}>
                        <input type="text" required name="contact_title" placeholder="Primary Contact and Title" />
                        <input type="email" required name="user_email" placeholder="Enter your email address"/>
                        <input type="text" name="phone" placeholder="Phone Number"/>
                        <input type="text" required name="school" placeholder="School" />
                        <input type="text" name="Message" placeholder="Anything else you want to say?" />
                        
                        <button type="submit">Send</button>
                    </form>
                    </div>
                </div>
            </div>
            <Footer userData={null} />
        </div>
        )
    }



}
export default Trial