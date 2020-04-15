const { Router } = require('express');
const controllers = require('../controllers');
const restrict = require('../helpers');

const router = Router();

router.get('/', (req, res) => res.send('This is the api root!'));

router.post('/sign-up', controllers.signUp);
router.post('/sign-in', controllers.signIn);
router.get('/verify', controllers.verifyUser);
router.post('/change-password', controllers.changePassword);

router.get('/items/:userId', restrict, controllers.getItems);
router.get('/items/:userId/:itemId', restrict, controllers.getItem);
router.post('/items', restrict, controllers.createItem);
router.put('/items/:id', restrict, controllers.updateItem);
router.delete('/items/:id', restrict, controllers.deleteItem);

module.exports = router;
