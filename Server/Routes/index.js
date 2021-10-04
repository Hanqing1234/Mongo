"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const fs_1 = __importDefault(require("fs"));
const game_1 = __importDefault(require("../Models/game"));
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home' });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home' });
});
router.get('/about', function (req, res, next) {
    let filePath = 'Public/Assets/pdf/Resume.pdf';
    fs_1.default.readFile(filePath, function (err, data) {
        res.contentType("application/pdf");
        res.send(data);
    });
});
router.get('/projects', function (req, res, next) {
    res.render('index', { title: 'Projects', page: 'projects' });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Services', page: 'services' });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Me', page: 'contact' });
});
router.get('/game-list', function (req, res, next) {
    game_1.default.find(function (err, gamesCollection) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        console.log(gamesCollection);
    });
});
//# sourceMappingURL=index.js.map