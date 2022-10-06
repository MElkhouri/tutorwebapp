import './styles/App.css';
import {BrowserRouter as Router, Route, Routes as Switch, Link} from 'react-router-dom';
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserHome from "./pages/User_Home";
import TutorHome from "./pages/Tutorhome";
import Footer from './pages/footer';
import { ProSidebarProvider } from 'react-pro-sidebar';

function App() {
  return (
    <div className="App">
        <Router> 
          <div className='navbar'>
            <Link to="/register">Register an Account</Link>
            <Link to="/">Home</Link>
            <Link to ="/login">Login</Link>
            <Link to ="/logout">Logout</Link>
          </div>
          <ProSidebarProvider>
            <Switch>
              <Route path="/" element={<Home/>} exact />
              <Route path="/register" element={<Register/>} exact />
              <Route path = "/login" element={<Login/>} exact />
              <Route path = "/userhome" element={<UserHome />} exact />
              <Route path = "/tutorhome" element={<TutorHome />} exact />
            </Switch>
          </ProSidebarProvider>          
        </Router>
        <Footer />
    </div>
  );
}

export default App;
