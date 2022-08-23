const express = require('express');

const response = require('../network/response');
const Store = require('../store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);

router.post('/:table/login', login);
router.post('/:table', insert);

router.put('/:table/:id', upsert);

async function list(req, res, next){
    const datos = await Store.list(req.params.table)
    response.success(req, res, datos, 200)
}

async function get(req, res, next){
    const data = await Store.get(req.params.table, req.params.id)
    response.success(req, res, data, 200);
}

async function insert(req, res, next){
    const data = await Store.insert(req.params.table, req.body)
    response.success(req, res, data, 201)
}
async function upsert(req, res, next){
    //const data =  await Store.upsert(req.params.table, req.body)
    const data =  await Store.update(req.params.table, req.params.id, req.body);
    response.success(req, res, data, 201)
}

async function login(req, res, next){
    const data = await Store.query(req.params.table, req.body);
    response.success(req, res, data, 200)
}



module.exports = router;