const router = require('express').Router();
const {tokenAuthorization,tokenAuthorizationOnlyAdmin} = require('../controllers/verifyToken')
const {putCart , deleteCart , postCart , getCart , getAllCarts} = require('../controllers/cart')

router.route('/:id')
.put(tokenAuthorization,putCart)
.delete(tokenAuthorization,deleteCart)
.get(tokenAuthorization,getCart)

router.route('/')
.get(tokenAuthorizationOnlyAdmin,getAllCarts)
.post(tokenAuthorization,postCart)
module.exports = router;