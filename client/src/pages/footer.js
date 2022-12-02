import React from "react";
import '../styles/footer.css'


const Footer = () => {
  
return (
	<div className="box">
	<h1 style={{ color: "green",
				textAlign: "center",
        fontSize: "12px",
				marginTop: "-50px" }}>
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
