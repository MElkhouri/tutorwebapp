import React from "react";
import '../styles/footer.css'
import Logo from '../assets/PNG/logo.png'
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
function Footer(props) {
	let sendData = props.userData
	if(props.userData != null){
		sendData = props.userData.user
	}
	const navigate = useNavigate();
	return (
		<div className="box">
		{/* <img style={{ marginLeft: "25%", marginTop:"-50px"}} src={Logo} height={200} width={600} />  */}
		<h1 style={{ color: "green",
					textAlign: "center",
			fontSize: "15px",
					marginTop: "0px" }}>
			Copyright © 2022 Razor Tutor Inc - All Rights Reserved.
		</h1>

		<div className="container">
			<div className="row">
			<div className="column">
				<Link className="heading" to= "/about" state={{user: sendData }}>About Us</Link>
			</div>
			<div className="column">
				<Link className="heading" to="/Contact" state={{user: sendData}}>Contact Us</Link>		
			</div>
			<div className="column">
				<Link className="heading" to="/free-trial" state={{user: sendData }}>Free Partnerships</Link>	
				
			</div>
			<div className="column">
				<Link className="heading" to="/social" state={{user: sendData }}>Social Media</Link>	            
				
			</div>
			</div>
		</div>
		</div>
	);
};
export default Footer;
