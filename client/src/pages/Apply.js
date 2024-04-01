import React, {useRef, useState} from "react";
import emailjs from 'emailjs-com'
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./footer"




function Apply() {

 // const [name, setName] = useState("");
  const form = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_qgy7z78', 'template_oznpx1r', form.current, 'PKWK63FQmkCdYEeqO')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      //Navigate("/home")
  };

  const handleFileInput = (e) => {
    function getExtension(filename) {
        return filename.split('.').pop();
    };
    //error here add a way of checking filetype. Not sure why some logs are not coming through.

    if( !(getExtension(selectedFile.name).toLowerCase() === "pdf" 
    || getExtension(selectedFile.name).toLowerCase() === "docx") ){
      console.log("after if");
      }
    console.log("after if but outside");

  }

  return (
    <div>
    <Navbar state = {false}/>
    <div className="login form">
    <span>Become a tutor</span>
    <h3>If you're interested in being a tutor, please fill out the information below and attach your most recent resume. You will be sent an email within 48 hours containing the next steps. Pay starts at $18/hr and varies by experience.</h3>
    <form ref={form} onSubmit={sendEmail}>
      
      <input type="text" required name="first_name" placeholder="First Name" />
     
      <input type="text" required name="last_name" placeholder="Last Name" />
     
      <input type="email" required name="user_email" placeholder="Enter your email address"/>
      <input type="text" required name="phone" placeholder="Phone Number"/>
      <input type = "file" required value = {selectedFile} onChange = {handleFileInput}/>
      <button type="submit">Apply</button>
    </form>
    </div>
    <Footer userData = {null}/>

    </div>

  );


}

export default Apply;