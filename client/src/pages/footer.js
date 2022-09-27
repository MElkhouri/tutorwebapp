import React from "react";
import '../styles/footer.css'
const Footer = () => {
return (
	<div className="box">
	<h1 style={{ color: "green",
				textAlign: "center",
				marginTop: "-50px" }}>
		Razor Tutor Pass Your Classes Today!
	</h1>
	<div className="container">
		<div className="row">
		<div className="column">
			<div className="heading">About Us</div>
		</div>
		<div className="column">
            <div className="heading">Contact Us</div>		
		</div>
		<div className="column">
            <div className="heading">Social Media</div>	            
            <div className="footerlink" href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </div>
            <div className="footerlink" href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </div>
            <div className="footerlink" href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </div>
            <div className="footerlink" href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </div>
          </div>
		</div>
	</div>
	</div>
);
};
export default Footer;
