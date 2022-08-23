const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config.js');
const user =  require('./components/user/network');
const auth = require('./components/auth/network');
//const post = require('./components/post/network');
const errors = require('../network/errors');
//const { urlencoded } = require('body-parser');
const swaggerUI = require('swagger-ui-express');

const app =  express();
app.use(bodyParser.json());
//app.use(urlencoded({extended: true}));

const swaggerDoc = require('./swagger.json');

//ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth);
//app.use('/api/post', post);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(errors)

app.listen(config.api.port, ()=>{
    console.log(`API escuchando en el puerto ${config.api.port}`)
});