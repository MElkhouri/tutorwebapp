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
import Apply from './pages/Apply'
import About from './pages/About'
import Trial from './pages/Trial'
import Social from './pages/Social'
import Schedule_session from './pages/Schedule_session';
import TutorProfile from './pages/TutorProfile';
import StudentProfile from './pages/StudentProfile';
import TutorRequests from './pages/TutorRequests';
import UserTutorRequests from './pages/UserTutorRequests';

function App() {

  return (
    <div>
        <Router> 
          {/*<Navbar state = {false} />
           <div className='navbar'>
              <img className="logo" src={Logo} height={50} width={100} />            
              <Link to="/">Home</Link>
              <Link to ="/apply">Apply to be a tutor!</Link>
              <Link to="/register">Register an Account</Link>
             
              <Link to ="/login">Login</Link>
              <Link to ="/">Logout</Link>
            
          </div> */}
          <Switch>
            <Route path="/" element={<Home/>} exact />
            <Route path="/free-trial" element={<Trial/>} exact />
            <Route path="/social" element={<Social/>} exact />
            <Route path="/about" element={<About/>} exact />
            <Route path="/apply" element={<Apply/>} exact />
            <Route path="/Contact" element={<Contact/>} exact />
            <Route path="/Schedule_session" element={<Schedule_session/>} exact />
            <Route path="/register" element={<Register/>} exact />
            <Route path = "/login" element={<Login/>} exact />
            <Route path = "/userhome" element={<UserHome />} exact />
            <Route path = "/tutorhome" element={<TutorHome />} exact />
            <Route path = "/tutor-profile" element={<TutorProfile />} exact />
            <Route path = "/tutor-requests" element={<TutorRequests />} exact />
            <Route path = "/student-profile" element={<StudentProfile />} exact />
            <Route path = "/tutoring-requests" element={<UserTutorRequests />} exact />
            <Route path = "/footer" element={<Footer />} exact />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
