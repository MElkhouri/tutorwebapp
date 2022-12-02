import axios from "axios";
const getUserData = async (user) => {
    console.log("helper user", user);
    const data = {
        email: user.user.email,
        password: user.user.password
    }
    console.log("data:", data)
    await axios.post("http://localhost:3001/users/auth", data).then((response) => {
        console.log("user response: ", response);
        if(response.data === -1){
            return "There was an error";
        }        
        else { 
            console.log("RESPIONSE: ", response.data[0]);
            return { user: response.data[0] };
        }
    });
}
export default getUserData;