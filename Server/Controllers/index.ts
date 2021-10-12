import express, {Request, Response, NextFunction} from 'express';
import fs from 'fs';

import passport from 'passport';

//create an instance of the User model
import User from '../Models/user';

//import Util functions
import { UserDisplayName } from '../Util';

//Display Functions

export function DisplayHomePage(req: Request, res: Response, next: NextFunction):void
{
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req) });
}

export function DisplayAboutPage(req: Request, res: Response, next: NextFunction):void
{
    res.render('index', { title: 'About', page: 'about', displayName: UserDisplayName(req)  });
}

export function DisplayProjectsPage(req: Request, res: Response, next: NextFunction):void
{
    res.render('index', { title: 'Projects', page: 'projects', displayName: UserDisplayName(req)  });
}

export function DisplayServicesPage(req: Request, res: Response, next: NextFunction):void
{
    res.render('index', { title: 'Services', page: 'services', displayName: UserDisplayName(req)});
}

export function DisplayContactPage(req: Request, res: Response, next: NextFunction):void
{
    res.render('index', { title: 'Contact Me', page: 'contact', displayName: UserDisplayName(req) });
}

export function DisplayResumePage(req: Request, res: Response, next: NextFunction):void
{
    let filePath = 'Client/Assets/pdf/Resume.pdf';
    fs.readFile(filePath, function (err,data){
    res.contentType("application/pdf");
    res.send(data);
  });
}

export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }

    return res.redirect('/gamelist');
}

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void
{
    passport.authenticate('local', (err, user, info) => {
        // are there server errors?
        if(err)
        {
            console.error(err);
            return next(err);
        }

        //are there login errors?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error')
            return res.redirect('/login');
        }

        req.login(user, (err) => 
        {
            //are there db errors?
            if(err){
                console.error(err);
                return next(err);
            }
            return res.redirect('/gamelist');
        });

    })(req, res, next)
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
         return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req) });
    }

    return res.redirect('/gamelist')
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    //instantiate a new User Object 
    let newUser = new User
    ({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName
    });

    User.register(newUser, req.body.password, (err) =>
    {
        if(err)
        {
            console.error('Error: Inserting New User');
            if(err.name == "UserExistError")
            {
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Register Error');

            return res.redirect('/register');
        }

        // after successful registration - login the user
        return passport.authenticate('local')(req, res, () =>
        {
            return res.redirect('/gamelist');
        });

    });
}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction):void
{
    req.logOut();

    res.redirect('/login');
}