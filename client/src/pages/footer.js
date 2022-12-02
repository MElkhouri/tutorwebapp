import React from "react";
import '../styles/footer.css'
import Logo from '../assets/PNG/logo.png'

const Footer = () => {
  
return (
	<div className="box">
	<img style={{ marginLeft: "25%", marginTop:"-50px"}} src={Logo} height={200} width={600} /> 
	<h1 style={{ color: "green",
				textAlign: "center",
        fontSize: "15px",
				marginTop: "0px" }}>
		Copyright © 2022 Razor Tutor Inc - All Rights Reserved.
	</h1>

	<div className="container">
		<div className="row">
		<div className="column">
			<a className="heading" href="/about">About Us</a>
		</div>
		<div className="column">
            <a className="heading" href="/Contact" >Contact Us</a>		
		</div>
    <div className="column">
            <a className="heading" href="/free-trial">Free Partnerships</a>	
            
		</div>
		<div className="column">
            <a className="heading" href="/social">Social Media</a>	            
            
          </div>
		</div>
	</div>
	</div>
);
};
export default Footer;
