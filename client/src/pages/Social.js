import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/Tutorhome.css';

// import axios from "axios";
// import {useEffect} from 'react';


function Social() {


  
    return (
    <div>
        <Navbar state = {false}/>
        <div className="home_container">
            <div className="home_body">
                <h1>Razor Tutor</h1>
                <h2>Currently we don't have any social media links check back later!</h2>
            </div>
        </div>
    </div>

    )



}
export default Social