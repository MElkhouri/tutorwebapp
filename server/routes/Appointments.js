const { request } = require('express');
const e = require('express');
const express = require('express');
const router = express.Router();
const {Appointments} = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => { //
    const listOfAppointments = await Appointments.findAll();
    res.json(listOfAppointments);
});
router.post("/getUserAppointments", async (req, res) => {
    const allAppointments = await Appointments.findAll({
        where: {student: req.body.student, date: {[Op.gte]: req.body.date}}
    });
    console.log("all APP: ", allAppointments);
    if(allAppointments.length > 0){
        res.send(allAppointments);
    } else {
        res.send("No appointments");
    }
});
router.post("/createAppointment", async (req, res) => {

    console.log("Request: ", req.body);
    let temp = new Date(req.body.date);
    temp.setTime(temp.getTime());
	let date = temp; 
    const[row, created] = await Appointments.findOrCreate({ //authenticates registration
        where: {tutorID: req.body.tutorID, studentID: req.body.studentID, date:{[Op.eq]: date}}, //user wont be able to create a bad appointment, tutor the same depending on future debate
        defaults: {date: date, tutorID: req.body.tutorID, studentID: req.body.studentID, tutorName: req.body.tutorName, studentName: req.body.studentName, course: req.body.course, isRequest: true}
    });
    if(created){
        console.log("CREATED", row);
        res.send(row);
    }
    else{
        res.send("Appointment already exists. Try another")
    }
   
}); 
router.post("/acceptAppointment", async (req, res) => {
    
    const response = await Appointments.update(
        { isRequest: false},{ 
            where: {id: req.body.apptID}           
    });
    res.send(""+response);
}); 
router.delete("/deleteAppointment", async (req, res) => {

    console.log("Request bodyasdafe: ", req.body);
    const appointment = await Appointments.findAll({
        where: {id: req.body.data}}
    );
    console.log("APPT: ", appointment);
    // if(appointment){

    // }
    const result = await Appointments.destroy({ 
        where: {id: req.body.data}, 
    });
    console.log("delete result: ", result);
    res.send(""+result);
   
});

module.exports = router;