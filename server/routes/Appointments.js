const express = require('express');
const router = express.Router();
const {Appointments} = require("../models");

router.get("/", async (req, res) => { //
    const listOfAppointments = await Appointments.findAll();
    res.json(listOfAppointments);
});

router.post("/createAppointment", async (req, res) => {

    console.log("Request: ", req.body);
    let temp = new Date(req.body.date);
    temp.setTime(temp.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
	let date = temp;
    const[row, created] = await Appointments.findOrCreate({ //authenticates registration
        where: {tutor: req.body.tutor, student: req.body.student}, //user wont be able to create a bad appointment, tutor the same depending on future debate
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