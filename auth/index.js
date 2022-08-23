const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utlis/error');

const secret = config.jwt.secret;

function signIn(data){
   //return jwt.sign(data, secret);
   return jwt.sign(JSON.stringify(data), secret)
}

function verify(token){
   return jwt.verify(token, secret)
}

const check = {
   own: function(req, owner){
      const decoded =  decodeHeader(req);
      console.log(decoded); 

      if(decoded.body[0].id  !== owner){
         throw error('No puedes hacer esto', 401)
         //throw new Error('No puedes hacer esto');
      }
   },

   logged: function(req, owner){
      const decoded =  decodeHeader(req);
   }
}

function getToken(authorization){
   if(!authorization){
      throw new Error('No viene token');
   }

   if(authorization.indexOf('Bearer ') === -1){
      throw new Error('Formato invalido');
   }

   let token = authorization.replace('Bearer ', '')  

   return token;
}

function decodeHeader(req){
   const authorization = req.headers.authorization || '';
   const token = getToken(authorization);
   const decode = verify(token);

   req.user = decode;
   return decode;
}

module.exports = { signIn, check }