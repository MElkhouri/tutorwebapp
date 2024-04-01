const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const {TutorProfiles} = require("../models");
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'XXXX',
	database : 'razortutordb'
});

router.get("/", (req, res) => { //
    connection.query("SELECT * FROM tutorprofiles", (err, rows) =>{
        res.send(rows);

    });
});

router.post("/", async (req, res) => {
    const[row, created] = await TutorProfiles.findOrCreate({ //authenticates registration
        where: {email: req.body.email }, //username must be different whenever a user registers
        defaults: {password: req.body.password, courses: req.body.courses, first_name: req.body.first_name, last_name: req.body.last_name, bio: req.body.bio}, //does not need to depend on password, address, or role for user creation
    });
    if(created){
        res.send(row);
    }
    else{
        res.send("User already exists. Try another email or name")
    }    
});
router.post("/findTutors", async (req, res) => {
    const course = req.course;
    connection.query('SELECT * FROM TutorProfiles as a where courses LIKE "%?%"', [course], function(error, results, fields) {
        if (error) throw error; 
            // If the account exists
            if (results.length > 0) {
                response.send('1');
            } else {				
                response.send('-1');
            }			
            response.end();
    });
});

module.exports = router;