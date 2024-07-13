const express = require('express');

const router = express.Router();

const {getNotlar, setNotlar,updateNotlar,deleteNotlar}= require('../Controller/notController')

const Authorization = require('../Controller/services/Authorization');

router.get('/',Authorization.authorized,getNotlar)
router.post('/',Authorization.authorized,setNotlar)
router.put('/:id',Authorization.authorized,updateNotlar)
router.delete('/:id',Authorization.authorized,deleteNotlar)


module.exports=router;