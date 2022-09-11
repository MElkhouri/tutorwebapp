import './App.css';
import {BrowserRouter as Router, Route, Routes as Switch, Link} from 'react-router-dom';
import Register from "./pages/Register";
import Home from "./pages/Home";
function App() {
  
  
  return (
    <div className="App">
        <Router> 
          <Link to="/register">Register an Account</Link>
          <Link to="/">Home</Link>
           <Switch>
            <Route path="/" element={<Home/>} exact />
            <Route path="/register" element={<Register/>} exact />
          </Switch>
          </Router>
    </div>
  );
}

export default App;
