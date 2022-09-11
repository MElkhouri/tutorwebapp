const express = require('express');
const router = express.Router();
const {Schools} = require("../models");

router.get("/", async (req, res) => { //
    const listOfSchools = await Schools.findAll();
    res.json(listOfSchools);
});

router.post("/", async (req, res) => {

    const[row, created] = await Schools.findOrCreate({ //authenticates registration
        where: {school: req.body.school }, //school name must be different whenever a user registers
        defaults: {state: req.body.state, address: req.body.address},     });
    if(created){
        res.send(row);
    }
    else{
        res.send("School already exists. Try another")
    }
   
});


module.exports = router;