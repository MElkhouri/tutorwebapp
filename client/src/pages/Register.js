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
        confirm_password: Yup.string()
          .when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Both password need to be the same"
            )
          })
          .required(),
        role: Yup.number()
            .required(),
        school: Yup.string()
          .required(),
        first_name: Yup.string()
            .required(),  
        last_name: Yup.string()
            .required(),  

        
      });
    const initialValues={ email: "", password: "", address: "", school: "", role: "1", first_name: "", last_name: "" } //have to add a way to input role in future for teachers "2" and make it a button, also make school a DDL
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
                <ErrorMessage name = "first name" component="error" />
                <Field
                    id= "first_name"
                    name="first_name"
                    placeholder="Enter your first name"
                    className="form-control inp_text"
                  />
                <ErrorMessage name = "last name" component="error" />
                <Field
                    id= "last_name"
                    name="last_name"
                    placeholder="Enter your last name"
                    className="form-control inp_text"
                  />
                <ErrorMessage name = "email" component="error" /> 
                <Field
                  name="email"
                  placeholder="Enter email"
                  className="form-control inp_text"
                  id="email"
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
                <ErrorMessage name = "confirm_password" component="error" />
                <Field
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm password"
                  className="form-control"
                />
                
                {/* Click on submit button to submit the form */}
                <button type="submit">Register</button>
              </Form>
      </Formik>
      <br />
      <br />

        </div>
    )


}

export default Register;