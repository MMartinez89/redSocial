const mysql = require('mysql');

const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

//Coneccion

let conection;

function handleCon(){
    conection = mysql.createConnection(dbConfig);

    conection.connect((err)=>{
        if(err){
            console.error('db error', err);
            setTimeout(handleCon, 2000);
        }else{
            console.log('DB connected');
        }
    })

    conection.on('Error' ,err=>{
        console.error('db error', err);
        if(err.code === 'PROTOCOL_CONECTION_LOST'){
            handleCon()
        }else{
            throw err;
        } 
    })
}

handleCon();

function list(table){
    return new Promise((resolve, reject) =>{
        conection.query(`SELECT * FROM ${table}`, (error, data) =>{
            if(error) return reject(error);
            resolve(data);
        })
    })
}

function get(table, id){
    return new Promise((resolve, reject) =>{
        conection.query(`SELECT * FROM ${table} WHERE id =${id}`, (error, data) =>{
            if(error) return reject(error);
            resolve(data);
        })
    })
}

function getToken(table, password){
    return new Promise((resolve, reject) =>{
        conection.query(`SELECT * FROM ${table} WHERE password =${password}`, (error, data) =>{
            if(error) return reject(error);
            resolve(data);
        })
    })
}

function postByUser(table, user){
    return new Promise((resolve, reject)=>{
        conection.query(`SELECT * FROM ${table} WHERE user =${user}`,(error, data)=>{
            if(error) return reject(error)
            resolve(data);
        } 
        )
    })
}

function insert(table, data){
    return new Promise((resolve, reject) =>{
         conection.query(`INSERT INTO ${table} SET ?`, data, (error, result) =>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function update(table, id ,data){
    return new Promise((resolve, reject) =>{
        conection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (error, result) =>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

 function upsert(table, data){
    if( data && data.id){
        return update(table, data);
    }else{
        return  insert(table, data);
    }
 //   return insert(table, data);
    
}


function query(table, query, join){

    let joinQuery = '';
    if(join){
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }
    return new Promise((resolve, reject)=>{
        conection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, result)=>{
            if(err) return reject(err);
            resolve(result || null)
        })
    })
}


/*function query(table, query){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query,(error, result)=>{
            if(error) return reject(error)
            
            // Necesario para evitar el rowdatapacket
            let output = {
                id: result[0].id,
                username: result[0].username,
                password: result[0].password
            }
            
            resolve(output, null)
        })
    })
}*/

module.exports = {list, get, postByUser,insert,update,upsert, query, getToken}
