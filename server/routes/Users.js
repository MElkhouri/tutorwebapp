const express = require('express');
const router = express.Router();
const {Users} = require("../models");

router.get("/", (req, res) => { //
    console.log("homo");
    res.send("User info");
});

router.post("/", async (req, res) => {
   // console.log("creating new user...");
   // const user = req.body;
   //console.log("At post: ", req.body);
    const[row, created] = await Users.findOrCreate({ //authenticates registration
        where: {username: req.body.email }, //username must be different whenever a user registers
        defaults: {password: req.body.password, address: req.body.address, role: req.body.role, name: req.body.name, school: req.body.school}, //does not need to depend on password, address, or role for user creation
    });
    if(created){
        res.send(row);
    }
    else{
        res.send("User already exists. Try another email or name")
    }
   

});


module.exports = router;