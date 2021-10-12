"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessAddPage = exports.ProcessEditPage = exports.DisplayAddPage = exports.DisplayEditPage = exports.DisplayGameListPage = void 0;
const game_1 = __importDefault(require("../Models/game"));
const Util_1 = require("../Util");
function DisplayGameListPage(req, res, next) {
    game_1.default.find((err, gameCollection) => {
        if (err) {
            return console.error(err);
        }
        res.render('index', { title: 'Game List', page: 'gamelist', game: gameCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayGameListPage = DisplayGameListPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    game_1.default.findById(id, {}, {}, (err, gamesToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'edit', game: gamesToEdit, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'edit', game: '', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayAddPage = DisplayAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedGameItem = new game_1.default({
        "_id": id,
        "name": req.body.name,
        "genre": req.body.genre,
        "developer": req.body.developer,
        "cost": req.body.cost
    });
    game_1.default.updateOne({ _id: id }, updatedGameItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/gamelist');
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessAddPage(req, res, next) {
    let newGame = new game_1.default({
        "name": req.body.name,
        "genre": req.body.genre,
        "developer": req.body.developer,
        "cost": req.body.cost
    });
    game_1.default.create(newGame, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/gamelist');
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    game_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/gamelist');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
//# sourceMappingURL=game.js.map