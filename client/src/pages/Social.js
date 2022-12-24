import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/Tutorhome.css';
import Footer from './footer';
import Sidebar from '../components/Sidebar';
import { useLocation } from "react-router-dom";

// import axios from "axios";
// import {useEffect} from 'react';


function Social() {

    const location = useLocation();
    const [state] = useState(location.state);        
    let logged = false;
    console.log('SATE:', state)
    if(state.user !== null){
         logged = true;
    }     
    let sidebarData = location.state.user
    let footerData = {user: location.state.user}
    if(logged){
        return (
            <div>
                <Navbar state = {true}/>
                <div className="home_container">
                    <Sidebar user = {sidebarData} />

                    <div className="home_body">
                        <h2>Currently we don't have any social media links check back later!</h2>
                    </div>
                </div>
                <Footer userData={footerData} />
            </div>

        )
    }
    else{
        return (
            <div>
                <Navbar state = {false}/>
                <div className="home_container">
                    <div className="home_body">
                        <h2>Currently we don't have any social media links check back later!</h2>
                    </div>
                </div>
                <Footer userData={null} />
            </div>

        )
    }
}
export default Social