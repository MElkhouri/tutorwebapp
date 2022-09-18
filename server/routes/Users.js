const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const {Users} = require("../models");
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'ishan2001',
	database : 'razortutordb'
});

router.get("/", (req, res) => { //
    res.send("User info");
});

router.post("/", async (req, res) => {
   // console.log("creating new user...");
   // const user = req.body;
   //console.log("At post: ", req.body);
    const[row, created] = await Users.findOrCreate({ //authenticates registration
        where: {email: req.body.email }, //username must be different whenever a user registers
        defaults: {password: req.body.password, address: req.body.address, role: req.body.role, first_name: req.body.first_name, last_name: req.body.last_name, school: req.body.school}, //does not need to depend on password, address, or role for user creation
    });
    if(created){
        res.send(row);
    }
    else{
        res.send("User already exists. Try another email or name")
    }
   
 
});

router.post('/auth', function(request, response) {
	// Capture the input fields
    //console.log(request.body);
	let email = request.body.email;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM Users WHERE email = ? AND password = ? LIMIT 1', [email, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
            //console.log(results);
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				//request.session.loggedin = true;
				//request.session.username = username;
				// Redirect to user home page
				//response.redirect('/userHome'); 
				
				response.send(results[0]);
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

module.exports = router;