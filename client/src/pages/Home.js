import React from 'react'
import Navbar from '../components/Navbar'
import Logo from '../assets/logo.jpg'
import LogoPng from '../assets/PNG/logo2.png'
// import axios from "axios";
// import {useEffect} from 'react';
import Footer from './footer'

function Home() {


  
    return (
    <div className=''>
        <Navbar state = {false}/>
     
        
       <img className="home_img" src={LogoPng} height={200} width={200} /> 
       <div className='right_side'>
            <txt1>Sharpening Learning</txt1>
            <txt1>-</txt1>
            <txt1>Cutting Disparities</txt1>
            <txt2>Private Tutoring at no-out of pocket costs to students</txt2>
       </div>
       <Footer userData = {null}/>
  </div>

    )



}
export default Home