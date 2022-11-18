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
        where: {tutor: req.body.tutor, student: req.body.student, date:{[Op.eq]: date}}, //user wont be able to create a bad appointment, tutor the same depending on future debate
        defaults: {date: date, tutor: req.body.tutor, student: req.body.student}
    });
    if(created){
        console.log("CREATED", row);
        res.send(row);
    }
    else{
        res.send("Appointment already exists. Try another")
    }
   
});


module.exports = router;