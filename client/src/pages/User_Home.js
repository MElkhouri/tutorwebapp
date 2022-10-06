import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';

function UserHome(props) {    
    const location = useLocation();
    const [userData] = useState(location.state);
    console.log('userdata: ', userData);
    console.log('props', props);
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <h1>Hi, {userData.user.first_name} see your upcoming sessions</h1>
            <Calendar 
                tileClassName={({ date, view }) => {if(date.getUTCDate() === 25){
                    return 'highlight';
                }}}
                onChange={onChange} 
                value={value} 
            />
            <br />
        </div>
            // <div className="ddl">
                
            //         <h2>Schedule a new session</h2>
            //         <form>
            //             <select onChange={this.handleSelect}>
            //                 <option value="Calculus">Calculus</option>
            //                 <option value="american_history">American History</option>
            //                 <option value="organic_chemistry">Organic Chemistry</option>
            //                 <option value="data_structures">Data Structures</option>
            //             </select>
            //         <button onClick={this.onSubmit.bind(this)}>Find tutors</button>
            //         </form>
                
		// </div>
        
    )
    }

export default UserHome;
