const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config.js');
const post = require('./components/post/network');
const errors = require('../network/errors');
//const { urlencoded } = require('body-parser');

const app =  express();
app.use(bodyParser.json());
//app.use(urlencoded({extended: true}));


//ROUTER
app.use('/api/post', post);

app.use(errors)

app.listen(config.post.port, ()=>{
    console.log(`POST  escuchando en el puerto ${config.post.port}`)
});