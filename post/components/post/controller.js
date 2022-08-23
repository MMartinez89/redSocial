const { nanoid } = require('nanoid')


const TABLE = 'post';

module.exports=  function(injectedStorage){
    let store = injectedStorage;

    if(!store){
        store =  require('../../../store/mysql');
    }

    function list(){
        return store.list(TABLE);
    }

    function getId(id){
        return store.get(TABLE, id)
    }

    function getByUser(user){
        return store.postByUser(TABLE, user)
    }

    function upsertPost(data){
        const newPost = {
            text: data.text,
            user: data.user
        }

   /*     if(data.id){
            data.id = data.id
        }else{
            data.id = nanoid();
        }
        newPost.id = data.id;*/

        return store.upsert(TABLE, newPost)
    }

    return{list,getByUser, upsertPost, getId} 
}