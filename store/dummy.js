const db = {
    'user':[
        { id:'1', name: "Manuel"},
    ],
};


async function list(table){
    return db[table] || [];
    
}

async function get(table, id){
    let col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(tabla, data){

   if(!db[tabla]){
        db[tabla] = [];
   }
   db[tabla].push(data);
    // db[collection].push(data);
}

async function query(tabla, q){
    let col = await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];
    return col.filter(item => item[key] === q[key])[0] || null;
}

async function remove(tabla, id){
    return true;
}

module.exports = {list, get, upsert, remove, query};

