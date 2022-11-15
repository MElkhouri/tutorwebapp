import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import {Formik, Field, ErrorMessage, Form} from 'formik'
import axios from "axios";
import '../styles/Tutorhome.css'
import '../styles/Sidebar.css';
// import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu} from 'react-pro-sidebar';
import Sidebar from '../components/Sidebar'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function TutorProfile(props) {    
    const location = useLocation();
    let [userData] = useState(location.state);
    console.log('userdata: ', userData);
    const MathCourses = ['Calculus 1', 'Calculus 2', 'Calculus 3', 'Geometry'];
    const ScienceCourses = ['Chemistry 1', 'Physics 1', 'Biology 1', 'Biology 2'];
    const ComputerCourses = ['Intro to Computer Science', 'Data Structures', 'CyberSecurity'];
    let currentCourses = userData.user.courses != (undefined || "") ? userData.user.courses.split("/") : null;
    console.log("current", currentCourses);
    const initialValues={ first_name: userData.user.first_name, 
                          last_name: userData.user.last_name, 
                          email: userData.user.email, 
                          address: userData.user.address, 
                          bio: userData.user.bio,
                          courses: currentCourses
                          };                   
                          
    console.log("init", initialValues);
    const dataIsUnchanged = (data) => {
        if(data.first_name == initialValues.first_name &&
            data.last_name == initialValues.last_name &&
            data.email == initialValues.email && 
            data.tutorCourses == currentCourses){
                return true;
            }
            userData.user.first_name = data.first_name;
            userData.user.last_name = data.last_name;
            userData.user.email = data.email;
            userData.user.courses = data.tutorCourses;
        return false;
    }
    const courseToString = (courses) => {
        let result = ""
        for(let i = 0; i <= courses.length-1; i++){
            result += courses[i] + '/';
        }
        console.log("result: ", result);
        return result;
    }
    
    const onSubmit = (data) => {    
        console.log("data: ", data);
        let tutorCourses = courseToString(data.courses)
        data.tutorCourses = tutorCourses;
        if(dataIsUnchanged(data)){
            alert("profile data is unchanged");
        }else{
            console.log("HELLO");
            data.id = userData.user.id; 
            console.log('send',data);
            axios.put("http://localhost:3001/users/updateTutorProfile", data).then((response) => {
                console.log(response)
                if(response.data === -1){
                    alert("Error processing update.")
                }else{
                    alert("Profile updated");
                }
            }).catch(console.log('catch'));      
        }

    } 
    return (
        <div>
            <Navbar state={true} />
        
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
                        id="email"
                    />
                    <label>Address: </label>
                    <ErrorMessage name = "address" component="error" />
                    <Field                        
                        name="address"                        
                        className="form-control inp_text"
                        id="address"
                    />
                    <label>Bio: </label>
                    <ErrorMessage name = "bio" component="error" />
                    <Field                        
                        name="bio"                        
                        className="form-control inp_text"
                        id="bio"
                    />
                    <span>Courses</span>                    
                    <div role="group" aria-labelledby="checkbox-group" className="course-list">
                        <table>
                            {MathCourses.map((course, index) => (                                                                                                              
                                <tr>
                                    <td>
                                        <label key = {index}>                                
                                            {course} 
                                        </label>
                                    </td>
                                    <td className='check'>
                                        <Field type="checkbox" name="courses" value={course} />
                                    </td>
                                </tr>
                            ))}                      
                        </table>
                        <table>
                            {ScienceCourses.map((course, index) => (                                                                                                              
                                <tr>
                                    <td>
                                        <label key = {index}>                                
                                            {course} 
                                        </label>
                                    </td>
                                    <td className='check'>
                                        <Field type="checkbox" name="courses" value={course} />
                                    </td>
                                </tr>
                            ))}                      
                        </table>
                        <table>
                            {ComputerCourses.map((course, index) => (                                                                                                              
                                <tr>
                                    <td>
                                        <label key = {index}>                                
                                            {course} 
                                        </label>
                                    </td>
                                    <td className='check'>
                                        <Field type="checkbox" name="courses" value={course} />
                                    </td>
                                </tr>
                            ))}                      
                        </table>
                    </div>
                    {/* Click on submit button to submit the form */}
                        <button type="submit">Update Profile</button>
                    </Form>
                </Formik>
            </div>
                

        </div>
        </div>
      
               
    )
}

export default TutorProfile;
