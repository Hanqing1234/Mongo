/*
* Author       : Hanqing Liu
* Date         : Sep 20, 2021
*Description   : Assignment 1 for COMP229
*/
import express from 'express';
const router = express.Router();
export default router;

//instantiate an object of type index controller
import {DisplayHomePage, DisplayAboutPage, DisplayProjectsPage,
DisplayResumePage, DisplayContactPage, DisplayServicesPage, DisplayLoginPage, 
DisplayRegisterPage, ProcessLoginPage, ProcessRegisterPage, ProcessLogoutPage } from '../Controllers/index';

/* GET home page. */
router.get('/', DisplayHomePage);

/* GET home page. */
router.get('/home', DisplayHomePage);

/* GET about page. */
router.get('/about', DisplayAboutPage);

/* GET resume page. */
router.get('/resume', DisplayResumePage);

/* GET projects page. */
router.get('/projects', DisplayProjectsPage);

/* GET services page. */
router.get('/services', DisplayServicesPage);

/* GET contact page. */
router.get('/contact', DisplayContactPage);

/* GET - display login page - with /login. */
router.get('/login', DisplayLoginPage);

/* POST - process login page when user click login button. */
router.post('/login', ProcessLoginPage);

/* GET - display Register page - with /login. */
router.get('/register', DisplayRegisterPage);

/* POST - process Register page when user click login button. */
router.post('/register', ProcessRegisterPage);

/* GET - process logout page - with /logout. */
router.get('/logout', ProcessLogoutPage);
//module.exports = router;
