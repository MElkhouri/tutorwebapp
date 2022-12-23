import React, {useState}  from 'react'
import Navbar from '../components/Navbar'
import Logo3 from '../assets/PNG/Asset 29@300x.png'
import Logo1 from '../assets/PNG/Asset 30@300x.png'
import Logo2 from '../assets/PNG/Asset 40@300x.png'
import { useLocation } from "react-router-dom";
import Footer from "./footer"
import Sidebar from '../components/Sidebar'
function About() {
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
                    <div className='home_container'>
                         <Sidebar user = {sidebarData} />                         
                              <div className='about_row_logged'>
                                   <h1>About us!</h1>
                                   <div className='about_column_logged'>
                                        <img className="about_img1" alt="1" src={Logo1} height={150} width={150} />
                                   
                                        <txt1>The Razor-Sharp Difference</txt1>
                                        <txt11>There are no out-of-pocket costs to students. Yes, you read that correctly! Students will not need to pay anything out-of-pocket to receive tutoring.</txt11>
                                        
                                   </div>                                                            
                                   <div className='about_column_logged'>
                                        <img className="about_img2" src={Logo2} alt="2" height={150} width={150} /> 
                                   
                                        <txt2>Reducing The Learning Gap</txt2>
                                        <txt21>Students are drastically behind in their education, and COVID has only accelerated disparities. Private tutoring has been shown to be an effective remedy, but this only benefits those who can afford it. Razor Tutor's goal is to provide ALL students with access to top-quality tutors. </txt21>
                                   
                                   </div>                              
                                   <div className='about_column_logged'>
                                        <img className="about_img3" src={Logo3} height={150} alt="3" width={150} />   
                                   
                                        <txt3>Our Tutors</txt3>
                                        <txt31>Our tutors are thoroughly vetted and have comprehensive public profiles. These profiles include ratings from students who receive tutoring.</txt31>
                                   
                                   </div>
                              </div>
                         </div>
                         <Footer userData = {footerData}/>
                    </div>
          
          )
     }else{
          return (
               <div>
                    <Navbar state = {false}/>
                    <h1>About us!</h1>
                    
                    <div className='container'>
                         <div className='about_row'>
                              <div className='about_column'>
                              <img className="about_img1" alt="1" src={Logo1} height={300} width={300} />
                              
                                   <txt1>The Razor-Sharp Difference</txt1>
                                   <txt11>There are no out-of-pocket costs to students. Yes, you read that correctly! Students will not need to pay anything out-of-pocket to receive tutoring.</txt11>
                                   
                              </div>
                         
                         
                         <div className='about_column'>
                              <img className="about_img2" src={Logo2} alt="2" height={300} width={300} /> 
                         
                                   <txt2>Reducing The Learning Gap</txt2>
                                   <txt21>Students are drastically behind in their education, and COVID has only accelerated disparities. Private tutoring has been shown to be an effective remedy, but this only benefits those who can afford it. Razor Tutor's goal is to provide ALL students with access to top-quality tutors. </txt21>
                         
                         </div>
                    
                         <div className='about_column'>
                              <img className="about_img3" src={Logo3} height={300} alt="3" width={300} />   
                         
                                   <txt3>Our Tutors</txt3>
                                   <txt31>Our tutors are thoroughly vetted and have comprehensive public profiles. These profiles include ratings from students who receive tutoring.</txt31>
                         
                         </div>
                    </div>
                    </div>
               
                    <Footer userData = {null}/>

               </div>
          
               )
     }

}
export default About