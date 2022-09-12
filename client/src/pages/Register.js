import React from "react";
import axios from "axios";
import {Formik, Field, ErrorMessage, Form} from 'formik'
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";



function Register() {

    const navigate = useNavigate();  
  
  
  
  
  const validationSchema = Yup.object().shape({
        email: Yup.string().email()
          .required(),
        password: Yup.string()
          .min(8, "Too Short!")
          .max(50, "Too Long!")
          .required(),
        address: Yup.string()
            .required(),
        role: Yup.number()
            .required(),
        school: Yup.string()
          .required(),
        name: Yup.string()
            .required(),  

        
      });
    const initialValues={ email: "", password: "", address: "", school: "", role: "1", name: "" } //have to add a way to input role in future for teachers "2" and make it a button, also make school a DDL
    const onSubmit= (data) => {
     //console.log(data.body);
      // getting error sending "data" over probably because  
      axios.post("http://localhost:3001/users", data).then((response) => {
        console.log("user created and posted" && response);

      });
      navigate('/login');
       
    };

    return (
    <div className="registerUser"> 
     <Formik
       initialValues={initialValues}
       onSubmit={onSubmit}
       validationSchema = {validationSchema}
      >
      <Form className="login form">
          
               <span>Register</span>
                <ErrorMessage name = "name" component="error" />
                <Field
                    id= "name"
                    name="name"
                    placeholder="Enter your first and last name"
                    className="form-control inp_text"
                  />
                <ErrorMessage name = "email" component="error" /> 
                <Field
                  name="email"
                  placeholder="Enter email"
                  className="form-control inp_text"
                  id="email"
                />
                <ErrorMessage name = "address" component="error" />
                <Field
                  id = "address"
                  name="address"
                  placeholder="Enter your home address"
                  className="form-control inp_text"
                />
                <ErrorMessage name = "school" component="error" />
                <Field
                  id = "school"
                  name="school"
                  placeholder="Enter your current school"
                  className="form-control inp_text"
                />
                
                 {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <ErrorMessage name = "password" component="error" />
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="form-control"
                />
                
                {/* Click on submit button to submit the form */}
                <button type="submit">Register</button>
              </Form>
      </Formik>
        </div>
    )


}

export default Register;