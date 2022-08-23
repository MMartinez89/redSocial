const store = require('../../../store/remote-mysql');
const ctr =  require('./controller');

module.exports =  ctr(store);