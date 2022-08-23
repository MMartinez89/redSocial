const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLA = 'auth';

module.exports = function(injectedStorage){
    let store =  injectedStorage;
    if(!store){
        const ctr = require('../../../store/mysql')
    }

    async function login(username, password){
        const data = await store.query(TABLA, { username});
        return bcrypt.compare(password ,data.body[0].password)
            .then((sonIguales)=>{
                if(sonIguales === true){
                    //generar token
                   // return auth.signIn(data);
                   return auth.signIn(JSON.parse(JSON.stringify(data)));
                }else{
                    throw new Error('Informacion invalida')
                }
            });
    }


    async function upsert(data){
        const authData = {
            id: data.id
        }

        if(data.username){
            authData.username = data.username;
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5);
        }
        //console.log(authData)

        //return store.upsert(TABLA, authData);
        return  store.put(TABLA,authData.id ,authData);
    }

    return{
        upsert, login
    }
};