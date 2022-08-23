const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/follow/:id',secure('follow'), follow);
router.get('/:id/following', followList);
router.post('/', insert);
router.put('/:id',secure('update'), upsert);

  function list(req, res, next){
   controller.list()
        .then((lista)=>{
           response.success(req, res, lista, 200)
        }).catch(next)
}

async function get(req, res, next){
    controller.get(req.params.id)
        .then((user)=>{
            response.success(req, res, user, 200)
        }).catch(next)
}
function insert(req, res){
    controller.post(req.body)
        .then((user)=>{
            response.success(req, res, user, 201);
        }).catch((error)=>{
            response.error(req, res, error.message, 500)
        })
}

function upsert(req, res){
    controller.put(req.params.id,req.body)
        .then((user)=>{
            response.success(req, res, user, 201);
        }).catch((error)=>{
            response.error(req, res, error.message, 500)
        })
}

function follow(req, res, next){
    controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        }).catch(next);
}

function followList(req, res, next){
    controller.followList(req.params.id)
        .then(list =>{
            response.success(req, res, list, 200)
        }).catch(next)
}

module.exports = router;