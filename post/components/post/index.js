const store = require('../../../store/mysql');
const ctr =  require('./controller');

module.exports =  ctr(store);