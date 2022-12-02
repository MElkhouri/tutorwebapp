import React from 'react'
import Navbar from '../components/Navbar'
import Logo from '../assets/logo.jpg'
// import axios from "axios";
// import {useEffect} from 'react';


function Home() {


  
    return (
    <div className=''>
        <Navbar state = {false}/>
     

       <img className="home_img" src={Logo} height={200} width={200} /> 
       <div className='right_side'>
            <txt1>Sharpening Learning</txt1>
            <txt1>-</txt1>
            <txt1>Cutting Disparities</txt1>
            <txt2>Private Tutoring at no-out of pocket costs to students</txt2>
       </div>
                 
  </div>

    )



}
export default Home