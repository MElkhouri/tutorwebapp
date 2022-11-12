import React from 'react';
import '../styles/App.css';
import { Link} from 'react-router-dom';


import Logo from '../assets/logo.jpg'


function Navbar(props){

    console.log(props);
    let logged = props.state;

    
    switch(logged) {

        case true:
            console.log("logged = true");    
            return (
                <div className='App'>
                
                    <div className='navbar'>
                        <img className="logo" src={Logo} height={50} width={100} />            
                        <Link to="/">Home</Link>
                        
                      
                       
                        <Link to ="/">Logout</Link>
                        </div>
                    
                </div>
                ); 
                break;
        case false:
            return (
                <div className='App'>
                
                    <div className='navbar'>
                        <img className="logo" src={Logo} height={50} width={100} />            
                        <Link to="/">Home</Link>
                        <Link to ="/apply">Apply to be a tutor!</Link>
                        <Link to="/register">Register an Account</Link>
                        <Link to ="/login">Login</Link>
                       
                      
                    </div>
                   
              
           
                </div>
                ); 
                break;
        default:
            console.log("Printing null in navbar component");
            return null;
    }
       
    
    
       
   
    
};
export default Navbar