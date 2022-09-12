import './App.css';
import {BrowserRouter as Router, Route, Routes as Switch, Link} from 'react-router-dom';
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
function App() {
  
  
  return (
    <div className="App">
        <Router> 
          <div className='navbar'>
          <Link to="/register">Register an Account</Link>
          <Link to="/">Home</Link>
          <Link to ="/login">Login</Link>
          </div>
           <Switch>
            <Route path="/" element={<Home/>} exact />
            <Route path="/register" element={<Register/>} exact />
            <Route path = "/login" element={<Login/>} exact />
           </Switch>
          </Router>
    </div>
  );
}

export default App;
