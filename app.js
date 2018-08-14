const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

//Passport Config
require('./config/passport')(passport);




//Load Routes
const auth = require('./routes/auth');




app.get('/',(req , res) => {
   res.send('OK');
});








//Auth routes
app.use('/auth',auth);


const port = process.env.PORT || 3000;
app.listen(port,() => {
	console.log(`Sever Started on port ${port}`);
});
