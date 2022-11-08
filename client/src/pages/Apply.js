import React, {useRef} from "react";
import emailjs from 'emailjs-com'
import { Navigate } from "react-router-dom";




function Apply() {

    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_qgy7z78', 'template_oznpx1r', form.current, 'PKWK63FQmkCdYEeqO')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      Navigate("/home")
  };

  return (
    <div className="login form">
    <span>Become a tutor</span>
    <h3>If you're interested in being a tutor, please fill out the information below and attach your most recent resume. You will be sent an email within 48 hours containing the next steps. Pay starts at $18/hr and varies by experience.</h3>
    <form ref={form} onSubmit={sendEmail}>
      
      <input type="text" name="first_name" placeholder="First Name" />
     
      <input type="text" name="last_name" placeholder="Last Name" />
     
      <input type="email" name="user_email" placeholder="Enter your email address"/>
      <input type="text" name="phone" placeholder="Phone Number"/>
      <button type="submit">Apply</button>
    </form>
    </div>
  );


}

export default Apply;