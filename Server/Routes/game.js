"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const game_1 = require("../Controllers/game");
const index_1 = require("../Util/index");
router.get('/', index_1.AuthGuard, game_1.DisplayGameListPage);
router.get('/add', index_1.AuthGuard, game_1.DisplayAddPage);
router.get('/edit/:id', index_1.AuthGuard, game_1.DisplayEditPage);
router.post('/add', index_1.AuthGuard, game_1.ProcessAddPage);
router.post('/edit/:id', index_1.AuthGuard, game_1.ProcessEditPage);
router.get('/delete/:id', index_1.AuthGuard, game_1.ProcessDeletePage);
//# sourceMappingURL=game.js.map