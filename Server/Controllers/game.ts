import express, {Request, Response, NextFunction} from 'express';

import Game from "../Models/game";

//import Util Functions
import { UserDisplayName } from '../Util';

//Read in CRUD
export function DisplayGameListPage(req: Request, res: Response, next: NextFunction): void
{
    // db.clothing.find()
    Game.find((err, gameCollection) =>
    {
        if(err)
        {
            return console.error(err);
        }

        res.render('index', { title: 'Game List', page: 'gamelist', game: gameCollection, displayName: UserDisplayName(req) });
    });
}

//Display Edit Page
export function DisplayEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    //pass the id to the db 

    //db.game.find({"_id": id})
    Game.findById(id, {}, {}, (err, gamesToEdit) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //show the edit view
        res.render('index', {title: 'Edit', page: 'edit', game: gamesToEdit, displayName: UserDisplayName(req)})
    }); 
}

// Display Create page
export function DisplayAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the edit view
    res.render('index', { title: 'Add', page: 'edit', game: '', displayName: UserDisplayName(req)  });
}

// Process Functions

// Process Edit page
export function ProcessEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Game Item
    let updatedGameItem = new Game
    ({
      "_id": id,
      "name": req.body.name,
      "genre": req.body.genre,
      "developer": req.body.developer,
      "cost": req.body.cost
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    Game.updateOne({_id: id}, updatedGameItem, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/gamelist');
    });
}

// Process Create page
export function ProcessAddPage(req: Request, res: Response, next: NextFunction): void
{
  // instantiate a new Game
  let newGame = new Game
  ({
    "name": req.body.name,
    "genre": req.body.genre,
    "developer": req.body.developer,
    "cost": req.body.cost
  });

  // db.game.insert({game data is here...})
  Game.create(newGame, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/gamelist');
  });
}

// Process Delete page
export function ProcessDeletePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.clothing.remove({"_id: id"})
  Game.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/gamelist');
  });
}
