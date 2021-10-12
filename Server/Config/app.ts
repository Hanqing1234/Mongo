/*
* Author       : Hanqing Liu
* Date         : Sep 20, 2021
*Description   : Assignment 1 for COMP229
*/

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import mongoose,{ mongo } from 'mongoose';

//modules for authentication
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';

//modules for cors
import cors from 'cors';

//authentication objects
let localStrategy = passportLocal.Strategy; //alias
import User from '../Models/user';

//module for authority messaging and error management
import flash from 'connect-flash';

//attach router files
import indexRouter from '../Routes/index';
import gameRouter from '../Routes/game';

const app = express();
export default app; //export app as the default object for this module

//DB configuration
import * as DBConfig from './db';
mongoose.connect(DBConfig.RemoteURI, {useNewUrlParser:true, useUnifiedTopology: true});

const db = mongoose.connection; //alias for the mongoose connection
db.on("error", function(){
  console.error("connection Error");
});

db.once("open",function(){
  console.log(`Connected to MongoDB at: ${DBConfig.HostName}`)
})

// view engine setup
app.set('views', path.join(__dirname, '../../Server/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//add support for cors
app.use(cors());

//setup express session
app.use(session({
  secret: DBConfig.Secret,
  saveUninitialized: false,
  resave: false
}));

//initialize flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//implement an Authority Strategy
passport.use(User.createStrategy());

// serialize and deserialize user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routing happens now, create routing through event handling
app.use('/', indexRouter);
app.use('/gamelist', gameRouter); //defines a new area of our website called game-list

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
