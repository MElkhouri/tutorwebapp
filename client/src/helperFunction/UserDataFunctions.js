import axios from "axios";
const getUserData = async (user) => {
    const data = {
        email: user.user.email,
        password: user.user.password
    }
    await axios.post("http://localhost:3001/users/auth", data).then((response) => {
        if(response.data === -1){
            return "There was an error";
        }        
        else { 
            return { user: response.data[0] };
        }
    });
}
export default getUserData;