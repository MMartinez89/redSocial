const response = require('./response');

function erros(err, req, res, next){
    console.log('error', err);

    const message = err.message || 'Error intrno';
    const status = err.statusCode || 500;

    response.error(req, res, message, status);
}

module.exports =  erros