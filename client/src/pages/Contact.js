import { useLocation, useNavigate } from "react-router-dom";
import React, { useRef,useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/Tutorhome.css';
import '../styles/Login.css';
import Sidebar from "../components/Sidebar"

import Navbar from "../components/Navbar";
import Footer from "./footer";

function Contact() {
    const location = useLocation();
    const [state] = useState(location.state);        
    let logged = false;
    console.log('SATE:', state)
    if(state.user !== null){
        logged = true;
    }
    
    let userData = location.state.user;
    let footerData = {user: location.state.user}

    const form = useRef();
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_qgy7z78', 'template_7z38wxd', form.current, 'PKWK63FQmkCdYEeqO')
        .then((result) => {
            console.log(result.text);
            alert("Message sent!");
        }, (error) => {
            console.log(error.text);
            alert(error.text);
        });
    };
  
    
   
if(logged){

    
    return (
        <div>
            <Navbar state = {logged}/>
        
            <div className="home_container">
                <Sidebar user = {userData}/>
                <div className="home_body">
                    <h2>To report an issue or to ask a question, please email support@razortutor.com. We will reply ASAP.</h2>
                
                    <div className="login form">
                        <span>Contact Us</span>
                        <h2>Send us an email if you have any questions, comments, or concerns</h2>
                        <form ref={form} onSubmit={sendEmail}>
                        
                            <input type="text" required name="name" placeholder="Name" />
                            
                            <input type="text" required name="Message" placeholder="Mesage" />
                            
                            <input type="email" required name="user_email" placeholder="Enter your email address"/>
                            <button type="submit">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer userData = {footerData} />
        </div>
    );
    }
    else{
        return (
            <div>
                <Navbar state = {logged}/>
            
            <div className="home_container">
                <div className="home_body">
                    <h2>To report an issue or to ask a question, please email support@razortutor.com. We will reply ASAP.</h2>
                
                <div className="login form">
                    <span>Contact Us</span>
                    <h2>Send us an email if you have any questions, comments, or concerns</h2>
                    <form ref={form} onSubmit={sendEmail}>
                    
                    <input type="text" required name="name" placeholder="Name" />
                    
                    <input type="text" required name="Message" placeholder="Mesage" />
                    
                    <input type="email" required name="user_email" placeholder="Enter your email address"/>
                    <button type="submit">Send Message</button>
                </form>
                </div>
                </div>
            </div>
            <Footer userData = {null} />
            </div>
        );
    }



}
export default Contact