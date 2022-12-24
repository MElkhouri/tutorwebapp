import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import {Formik, Field, ErrorMessage, Form} from 'formik'
import '../styles/Tutorhome.css'
import '../styles/Sidebar.css';
// import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu} from 'react-pro-sidebar';
import Sidebar from '../components/Sidebar'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Navbar from '../components/Navbar';
import Footer from './footer';

function StudentProfile(props) {    
    const location = useLocation();
    const [userData] = useState(location.state);
    console.log('userdata: ', userData);

    const initialValues={ first_name: userData.user.first_name, last_name: userData.user.last_name, email: userData.user.email} 
    console.log("init", initialValues);
    const onSubmit = (data) => {
        console.log("form data", data);
    } 
    return (
        <div>
        <Navbar state = {true}/>
        
        <div className='home_container'>
           
            <Sidebar user = {userData.user}/>
            <div className='home_body'>
                <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                >
                    <Form className="profile form">
                        
                    <span>Edit Your Profile</span>
                    <label>First Name: </label>
                    <ErrorMessage name = "first_name" component="error" /> 
                    <Field
                        name="first_name"                        
                        className="form-control inp_text"
                        id="first_name"
                    />
                    <label>Last Name: </label>
                    <ErrorMessage name = "last_name" component="error" /> 
                    <Field
                        name="last_name"                        
                        className="form-control inp_text"
                        id="last_name"
                    />
                    <label>Email: </label>
                    <ErrorMessage name = "email" component="error" /> 
                    <Field
                        name="email"
                        className="form-control inp_text"
                        id="email"
                    />
                    
                    
                    {/* Click on submit button to submit the form */}
                    <button type="submit">Update</button>
                    </Form>
                </Formik>
            </div>
                

        </div>
        <Footer userData = {userData}/>
        </div>
      
               
    )
}

export default StudentProfile;
