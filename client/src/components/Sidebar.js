import React from 'react';
import '../styles/Sidebar.css';
import { TutorSidebarData, StudentSidebarData } from './SidebarData';
import {useNavigate} from "react-router-dom";

function Sidebar(props){
    const navigate = useNavigate();
    console.log("sidebar props", props);
    const userData = props.userData;
    console.log('TESTSTET:, ',userData.user);
    return (
        <div className='Sidebar'>
            <ul className='sidebar-list'>
            {(userData.user.role == 2) &&
                TutorSidebarData.map((val,key) => {
                    return(                    
                        <li className='row' 
                            id={window.location.pathname == val.link ? "active" : ""} 
                            key={key} 
                            onClick={() =>{navigate(
                                val.link, 
                                {state: { user: userData }}
                            )}} 
                        > 
                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        </li>
                    );
                })
            }
            {(userData.user.role == 1) &&
                StudentSidebarData.map((val,key) => {
                    return(                    
                        <li className='row' 
                            id={window.location.pathname == val.link ? "active" : ""} 
                            key={key} 
                            onClick={() =>{navigate(
                                val.link, 
                                {state: { user: userData }}
                            )}} 
                        > 
                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        </li>
                    );
                })
            }
            </ul>
        </div>
    ); 
}

export default Sidebar;
