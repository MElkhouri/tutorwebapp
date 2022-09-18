import React, { useState } from 'react'
import axios from "axios";
import {useEffect} from 'react';


function Home() {


    const [listOfSchools, setListOfSchools] = useState([]);

    useEffect(()=> {
        axios.get("http://localhost:3001/schools").then( (response) => {
          setListOfSchools(response.data);
        });
      }, []);  
    return (
      <div>
        {listOfSchools.map((value,key )=> {
          return (
          <div className="School">
            <div className="title"> {value.school} </div>
            <div className="body">{value.address}</div>
            <div className="footer">{value.state}</div>
          </div>
          );
        })}

        </div>
    )
}
export default Home