const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const {Users, TutorProfiles, Appointments} = require("../models");
const { Op } = require("sequelize");

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'ishan2001',
	database : 'razortutordb'
});

router.get("/", (req, res) => {
    res.send("User info");
});

router.post("/", async (req, res) => {
	 const[row, created] = await Users.findOrCreate({ //authenticates registration
		 where: {email: req.body.email }, //username must be different whenever a user registers
		 defaults: {password: req.body.password, role: req.body.role, first_name: req.body.first_name, last_name: req.body.last_name, school: req.body.school}, //does not need to depend on password, address, or role for user creation
	 });
	 if(created){
		 res.send(row);
	 }
	 else{
		 res.send("User already exists. Try another email or name")
	 }
	 if(req.body.type[0] == "tutor"){
		 const[row, created] = await TutorProfiles.findOrCreate({ //authenticates registration
			 where: {email: req.body.email }, //username must be different whenever a user registers
			 defaults: {password: req.body.password, role: req.body.role, first_name: req.body.first_name, last_name: req.body.last_name, school: req.body.school, bio: req.body.bio}, //does not need to depend on password, address, or role for user creation
		 });		
	 }
 });
 
 router.post('/auth', async function(request, response) {
	 let email = request.body.email;
	 let password = request.body.password;
	 // Ensure the input fields exists and are not empty
	 if (email && password) {
		const tutors = await TutorProfiles.findAll({
			where: { 
				[Op.and]: [
					{email: email},
					{password: password}
				]					
			},
			include: {
				model: Appointments,
			}
		});
		if(tutors.length > 0){
			tutors[0].dataValues.role = '2';
			response.send(tutors)
		}else{ 
			const user = await Users.findAll({
				where: { 
					[Op.and]: [
						{email: email}, 
						{password: password}
					]					
				}, 
				include: {
					model: Appointments,
				}
			});
			if(user.length > 0){
				user[0].dataValues.role = '1';
				response.send(user)
			}else{
				response.send("-1");
			}
		}
		
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
 });
 router.put('/updateTutorProfile', function(request, response) {
	 let first_name = request.body.first_name;
	 let last_name = request.body.last_name;
	 let email = request.body.email;
	 let id = request.body.id;
	 let bio = request.body.bio;
	 let courses = request.body.tutorCourses;
 
	 connection.query('UPDATE TutorProfiles SET first_name= ?, last_name=?, email = ?, courses = ?, bio = ? WHERE id = ?', [first_name, last_name, email, courses, bio, id], function(error, results, fields) {
		 if (error) throw error;
			 // If the account exists
			 if (results.affectedRows > 0) {
				 response.send('1');
			 } else {				
				 response.send('-1');
			 }			
			 response.end();
	 });
 });
 router.post("/findTutors", async (req, res) => {
	
    let course = req.body.course;
	let temp = new Date(req.body.date);
    temp.setTime(temp.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
	let date = temp;
	const tutors = await TutorProfiles.findAll({
		where: { 
			courses: { 
				[Op.like]: '%'+course+'%' }			
		},
		include: {
			model: Appointments,
		}
	});
	if(tutors.length > 0){
		res.send(tutors)
	}else{
		res.send('No tutors found');
	}
 });
module.exports = router;