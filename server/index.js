const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json()); //express server 
app.use(cors()); //allows client and server port to accept requests from the same source machine

const db = require ('./models'); //tables schema

//Routers (importing and applying database changes)
const usersRouter = require('./routes/Users');
app.use("/users", usersRouter); //api 

const schoolsRouter = require('./routes/schools');
app.use("/schools", schoolsRouter);




//database connection and shit
db.sequelize.sync().then( () => {
    app.listen(3001, () => {
        console.log('Server running on port 3001.');
    });
});

