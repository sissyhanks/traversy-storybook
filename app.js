//to start in development mode < nmp run dev > line 8 package JSON >> line 7 = run start = run production mode 

const path = require('path');
//first things first... then declared const app line
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//fourth .. to show any requests in console ... then wrote if development line to only use morgan logging in development
const morgan = require('morgan');
//fifth .. then set up view engine lines
const exphbs  = require('express-handlebars');
// fourteen  & app.use metthod ovberride below
const methodOverride = require ('method-override');
//eight require passport and set up session.. have created  api key &* client secret added to env and laos requiring passport config under config and added passport middleware under set handlebars as view engin  BUT FIRST session middleware must be above passport middleware and brought in mongoose above
const passport = require('passport');
const session = require('express-session');
//ten add user session to database so saved and not kicked out when server restarts >> also add ne mongo store to session middleware
const MongoStore = require('connect-mongo');
//third tier step >>set up db.js in config folder  then wrote connectDB line
const connectDB = require('./config/db');

//load config
dotenv.config({ path: './config/config.env'});

//passport config
require('./config/passport')(passport);

connectDB();

const app = express();

// twelve .. body parser middleware to use req.body .. updated in process stories route
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//method override middleware
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}));

if (process.env.NODE_ENV === 'development') {
  //if development environment use morgan logging middleware 
  app.use(morgan('dev'));
}

// thirteen bringing in handlebar helpers created in the newly created helpers file >> and added helpers object to app.engine below >> and added formant date before created at date line to dashboard view that passes the date created at into the format date helper function and then after created at added date output expected formatting to then display formatted date
// inside curly braces is destructuring ?? what is that???
const { formatDate, stripTags, truncate, stripSpace, editIcon, select } = require('./helpers/hbs');

//setting view engin & add capability pf using .hbs extension (instead of have to type out handlebars) 
// also set default layout tha wraps around other everything, has html; head & body tags & stuff you  don't want to have to repeat that wraps around views >> then set up main & sign in templates in views/layouts and the routes folder with index,
app.engine('.hbs', exphbs({ helpers: {
  formatDate,
  stripTags,
  truncate,
  stripSpace,
  editIcon,
  select,
}, defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//session middleware
app.use(session({
  secret: 'keyboard cat',
  //we don't want to save session if nothing modified
  resave: false,
  //switch save unitinilized to false from default meant don't create session until something is stored
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

//passport middleware 
app.use(passport.initialize());
app.use(passport.session());

//fourteen making express global varable of user that hb can read inside (story) loop
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next();
})

// seven Static files served >> also added path as dependency at top
app.use(express.static(path.join(__dirname, 'public')));

//six .. Routes
app.use('/', require('./routes'));
//nine .. add the auth routes created 
app.use('/auth', require('./routes/auth'));
//eleven .. add route to add stories page, after making story model, hb page and route
app.use('/stories', require('./routes/stories'));

//second tier >> after set up config.env in config folder.. then did app listen line
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
