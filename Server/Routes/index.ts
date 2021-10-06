import express from 'express';
const router = express.Router();
export default router;
import fs from 'fs';

//get a reference to the Game Model Class
import Game from '../Models/game';

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home' });
});

/* GET home page. */
router.get('/home', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home' });
});

/* GET about page. */
router.get('/about', function(req, res, next) 
{
  let filePath = 'Public/Assets/pdf/Resume.pdf';
  fs.readFile(filePath, function (err,data){
    res.contentType("application/pdf");
    res.send(data);
  });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) 
{
  res.render('index', { title: 'Projects', page: 'projects' });
});

/* GET services page. */
router.get('/services', function(req, res, next) 
{
  res.render('index', { title: 'Services', page: 'services' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) 
{
  res.render('index', { title: 'Contact Me', page: 'contact' });
});

// router.get('/game-list', function(req, res, next) 
// {
//   Game.find(function(err, gamesCollection){
//     res.render('index', { title: 'Game List', page: 'games-list', games: gamesCollection });
//   }
// )});


/*Get games-list */
router.get('/game-list', function(req, res, next)
{
  //db.game.find()
  Game.find(function(err, gamesCollection)
  {
    if(err)
    {
      console.log(err);
      res.end(err);
    }

    res.render('index', { title: 'Game List', page: 'game-list', games: gamesCollection });
  }
  )
});
//module.exports = router;
