import './styles/App.css';
import './styles/Sidebar.css';
import {BrowserRouter as Router, Route, Routes as Switch, Link} from 'react-router-dom';
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserHome from "./pages/User_Home";
import TutorHome from "./pages/Tutorhome";
import Footer from './pages/footer';
import Contact from './pages/Contact'
import Schedule_session from './pages/Schedule_session';
import { ProSidebarProvider } from 'react-pro-sidebar';
import TutorProfile from './pages/TutorProfile';
import Logo from './assets/logo.jpg'
function App() {
  return (
    <div className="App">
        <Router> 
          <div className='navbar'>
              <img className="logo" src={Logo} height={50} width={100} />            
              <Link to="/">Home</Link>
              <Link to ="/apply">Apply to be a tutor!</Link>
              <Link to="/register">Register an Account</Link>
              {/* <Link to = "/schedule_session">Schedule Session</Link> */}
              <Link to ="/login">Login</Link>
              <Link to ="/">Logout</Link>
            
          </div>
          <Switch>
            <Route path="/" element={<Home/>} exact />
            {/* <Route path="/" element={<Apply/>} exact /> */}
            <Route path="/Contact" element={<Contact/>} exact />
            <Route path="/Schedule_session" element={<Schedule_session/>} exact />
            <Route path="/register" element={<Register/>} exact />
            <Route path = "/login" element={<Login/>} exact />
            <Route path = "/userhome" element={<UserHome />} exact />
            <Route path = "/tutorhome" element={<TutorHome />} exact />
            <Route path = "/tutor-profile" element={<TutorProfile />} exact />
          </Switch>
        </Router>
        <Footer />
    </div>
  );
}

export default App;
