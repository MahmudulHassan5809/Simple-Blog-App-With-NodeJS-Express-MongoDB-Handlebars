const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express();

//HandleBars MiddleWare
app.engine('handlebars', exphbs({
  // helpers:{
  //   pagination: pagination
  // },
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//Load User Model
require('./models/Users');

//Passport Config
require('./config/passport')(passport);


//Cookie Parser
app.use(cookieParser());


//Session Express
app.use(session({
  secret: 'screet',
  resave: false,
  saveUninitialized: true,
}));


//passport middleware
app.use(passport.initialize());
app.use(passport.session())


//Global Variable
app.use(function(req , res , next) {
  // res.locals.success_msg = req.flash('success_msg');
  // res.locals.error_msg = req.flash('error_msg');
  // res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


//DB Config
const db = require('./config/database');

//Map Gloabal Promise -get rid of warning
mongoose.Promise = global.Promise;

//Connect To Mongoose
mongoose.connect(db.mongoURI,{
    useNewUrlParser: true
})
.then(() => { console.log('mongodb Connected');})
.catch(err => console.log(err));




//Load Routes
const auth = require('./routes/auth');
const index = require('./routes/index');











//Index Routes
app.use('/',index);
//Auth routes
app.use('/auth',auth);


const port = process.env.PORT || 3000;
app.listen(port,() => {
	console.log(`Sever Started on port ${port}`);
});
