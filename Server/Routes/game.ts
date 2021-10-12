import express from 'express';
const router = express.Router();
export default router;

//create a game controller instance
import { DisplayGameListPage, DisplayEditPage, DisplayAddPage, ProcessAddPage, ProcessEditPage, ProcessDeletePage } from '../Controllers/game';

//import Util Functions
import { AuthGuard } from '../Util/index';

/*GET game-list page - with /game-list */
router.get('/',AuthGuard, DisplayGameListPage);

/*GET display /game-list/add page */
router.get('/add', AuthGuard, DisplayAddPage);

/*GET display edit/:id page - with /game-list/edit:id */
router.get('/edit/:id', AuthGuard, DisplayEditPage);

/*POST process /game-list/add page */
router.post('/add', AuthGuard, ProcessAddPage);

/*POST process /game-list/edit/:id page */
router.post('/edit/:id', AuthGuard, ProcessEditPage);

/*GET Process /game-list/delete/:id */
router.get('/delete/:id', AuthGuard, ProcessDeletePage);
