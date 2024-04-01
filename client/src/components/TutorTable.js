import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';



function TutorTable(props){
    let userData = props.state;
    const onSubmit = (data) => {
        
        axios.get("http://localhost:3001/tutors").then((response) => {
          console.log(response)
          
        }).catch(console.log('catch'));
        
         
      };

      return(
      <div>
        <h1>Available Tutors</h1>
 
        <Table stripped bordered hover size="sm">
          <thead>
            <tr>
              <th width="350">Tutor Name</th>
              <th width="150">Courses</th>
              <th width="300">Bio</th>
              <th width="150">Ratings</th>
         
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rakesh</td>
              <td>Calc1</td>
              <td>Hi bio One</td>
              <td>86.9%</td>
         
            </tr>
            <tr>
              <td>Jackson</td>
             
              <td>Discrete Math</td>
              <td> i am smart</td>
              <td>72.4%</td>
         
            </tr>
            <tr>
              <td>Keshav</td>
             
              <td>Biology</td>
              <td>I am nice</td>
              <td>88%</td>
         
            </tr>
            <tr>
              <td>Neilesh Jain</td>
            
              <td>Physics</td>
              <td>I am cool prof</td>
              <td>66.9%</td>
         
            </tr>
            <tr>
              <td>Akbar sheikh</td>
             
              <td>Mechanical</td>
              <td>wow I am good</td>
              <td>96.5%</td>
         
            </tr>
            <tr>
              <td>Sarita</td>
            
              <td>Intro to space</td>
              <td>Me is cool</td>
              <td>96.9%</td>
         
            </tr>
         
          </tbody>
        </Table>

        </div>
      );



};

export default TutorTable