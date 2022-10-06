import React from "react";
import axios from "axios";
import {Formik, Field, ErrorMessage, Form} from 'formik'
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string().email()
          .required(),
        password: Yup.string()
          .required(),
      });
    const initialValues={ email: "", password: ""} 
    const onSubmit = (data) => {
      //console.log(data);  
      axios.post("http://localhost:3001/users/auth", data).then((response) => {
        console.log(response)
        if(response.data === -1){
          alert("Incorrect login credentials please try again.")
        }
        
        else if(response.data.role === "1"){ //have to pass role through the response from server to navigate correctly. for now userhome is okay
          console.log("success");
          navigate(
            '/userhome', 
            {state: { user: response.data }}
          )
        }
        else if(response.data.role === "2"){ //have to pass role through the response from server to navigate correctly. for now userhome is okay
          console.log("THIS IS TUTOR");
          navigate(
            '/tutorhome', 
            {state: { user: response.data }}
          )
        }
      }).catch(console.log('catch'));
      
       
    };

  return (
    <div className="login"> 
     <Formik
       initialValues={initialValues}
       onSubmit={onSubmit}
       validationSchema = {validationSchema}
      >
        <Form className="login form">
            
          <span>Login</span>
          <ErrorMessage name = "email" component="error" /> 
          <Field
            name="email"
            placeholder="Enter email"
            className="form-control inp_text"
            id="email"
          />
          <ErrorMessage name = "password" component="error" />
          <Field
            type="password"
            name="password"
            placeholder="Enter password"
            className="form-control"
          />
          
          {/* Click on submit button to submit the form */}
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  )


}

export default Login;