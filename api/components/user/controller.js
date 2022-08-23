const { nanoid } = require('nanoid')
const auth = require('../auth')

const TABLE = 'user';

module.exports=  function(injectedStorage){
    let store = injectedStorage;

    if(!store){
        //store =  require('../../../mysql/index');
        store = require('../../../store/mysql')
 
    }

    function list(){
        return store.list(TABLE);
    }

    function get(id){
        return store.get(TABLE, id)
    }

    async function post(body){
       
        let user = {
            name: body.name,
            username: body.username,
        }

        if(body.id){
            user.id = body.id
        }else{
            user.id = nanoid();
        }

        if(body.password || body.username){
            //await auth.upsert({
                await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            });
        }

        //return store.upsert(TABLE, user);
        return store.post(TABLE, user);
    }

    async function put(id ,body){
       
        let user = {
            name: body.name,
            username: body.username,
        }

        if(id){
            user.id = id
        }else{
            user.id = nanoid();
        }

        if(body.password || body.username){
            //await auth.upsert({
                await auth.upsert({
                id: id,    
                username: user.username,
                password: body.password,
            });
        }
    
        //return store.upsert(TABLE, user);
        return store.put(TABLE, user.id,user);
    }
     function follow(from, to){
        return store.upsert(TABLE + '_follow',{
            user_from: from,
            user_to: to
        });
    }

    async function followList(user){
        const join = [];
        join[TABLE] = 'user_to';
        const query = {user_from: user}
        return await store.query(TABLE + '_follow', query, join)
    }

    return {
        list,
        get,
        post,
        put,
        follow,
        followList
    }
}
