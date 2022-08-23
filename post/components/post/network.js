const express = require('express');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

//Routes
router.get('/', list);
router.get('/:id', get);
router.get('/user/:user', getByUser)
router.post('/', upsertPost)

//Functions

function list(req, res, next){
    controller.list()
        .then(list =>{
            response.success(req, res, list, 200)
        }).catch(next);
}

function get(req, res, next){
    controller.getId(req.params.id)
        .then(post =>{
            response.success(req, res, post, 200)
        }).catch(next);
}

function getByUser(req, res, next){
    controller.getByUser(req.params.user)
        .then(user =>{
            response.success(req, res, user, 200);
        }).catch(next)
}

function upsertPost(req, res, next){
    controller.upsertPost(req.body)
        .then(post =>{
            response.success(req, res, req.body, 201);
        }).catch(next);
}

module.exports = router;