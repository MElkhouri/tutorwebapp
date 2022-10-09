const express = require('express');
const router = express.Router();
const {Appointments} = require("../models");

router.get("/", async (req, res) => { //
    const listOfAppointments = await Appointments.findAll();
    res.json(listOfAppointments);
});

router.post("/", async (req, res) => {

    const[row, created] = await Appointments.findOrCreate({ //authenticates registration
        where: {}, //user wont be able to create a bad appointment, tutor the same depending on future debate
        defaults: {date: req.body.date, tutor: req.body.tutor, student: req.body.student, date: req.body.date},     });
    if(created){
        res.send(row);
    }
    else{
        res.send("Appointment already exists. Try another")
    }
   
});


module.exports = router;