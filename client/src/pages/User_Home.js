import { useLocation } from "react-router-dom";

function UserHome(props) {    
    const location = useLocation();
    const userData = location.state;
    console.log('userdata: ', userData);
    console.log('props', props);

    return <h1>Welcome {userData.user.first_name}</h1>
}

export default UserHome;