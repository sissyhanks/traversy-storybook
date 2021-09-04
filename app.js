//to start in development mode < nmp run dev > line 8 package JSON >> line 7 = run start = run production mode 

const path = require('path');
//first things first... then declared const app line
const express = require('express');
const dotenv = require('dotenv');
//fourth .. to show any requests in console ... then wrote if development line to only use morgan logging in development
const morgan = require('morgan');
//fifth .. then set up view engine lines
const exphbs  = require('express-handlebars');
//eight requier passport and set up session.. have created  api key &* client secret added to env and laos requiring passport config under config and added passport middleware under set handlebars as view engin  BUT FIRST session middleware must be above passport middleware
const passport = require('passport');
const session = require('express-session');
//third tier step >>set up db.js in config folder  then wrote connectDB line
const connectDB = require('./config/db');

//load config
dotenv.config({ path: './config/config.env'});

//passport config
require('./config/passport')(passport);

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  //if development environment use morgan logging middleware 
  app.use(morgan('dev'));
}

//setting view engin & add capability pf using .hbs extension (instead of have to type out handlebars)
// also set default layout tha wraps around other everything, has html; head & body tags & stuff you  don't want to have to repeat that wraps around views >> then set up main & sign in templates in views/layouts and the routes folder with index,
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//session middleware
app.use(session({
  secret: 'keyboard cat',
  //we don't want to save session if nothing modified
  resave: false,
  //switch save unitinilized to false from default meant don't create session until something is stored
  saveUninitialized: false,
}))

//passport middleware 
app.use(passport.initialize());
app.use(passport.session());

// seven Static files served >> also added path as dependency at top
app.use(express.static(path.join(__dirname, 'public')));

//six .. Routes
app.use('/', require('./routes/index'));
//nine .. add the auth routes created 
app.use('/auth', require('./routes/auth'));

//second tier >> after set up config.env in config folder.. then did app listen line
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
