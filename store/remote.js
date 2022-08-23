const bodyParser = require('body-parser');
const { response } = require('express');
const fetch = require("node-fetch");

function createRemoteDB(host, port){
    const URL = `http://${host}:${port}`;

    
    async function list(table, param){
    return await  fetch(`${URL}/${table}`)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
            
        })
        .catch(err => {
            return err.message;
        })
    }


    async function get(table, id){
        return await fetch(`${URL}/${table}/${id}`)
            .then(response =>{
                return response.json();
            })
            .then(json =>{
                return json
            })
            .catch(err =>{
                return err.message;
            })
    }

    async function post(table, data){
    
  
        return await fetch(`${URL}/${table}`,{
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
            })
            .then(response =>{
                return response.json();
           })
            .then(json =>{
                return json;
            })
            .catch(err =>{
                return err.message;
            })
    }

    async function put(table,id, data){
        return await fetch(`${URL}/${table}/${id}`,{
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
            })
            .then(response =>{
                return response.json();
            }).then(json =>{
                return json;
            }).catch(err =>{
                return err.message;
            })
    }

    async function query(table, data){
        return await fetch(`${URL}/${table}`,{
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
            .then(result =>{
                return result.json();
            }).then(json =>{
                return json;
            }).catch( err =>{
                return err.message;
            })
    }


    return {
        list,
        get,
        post,
        put,
        query
    }
}

module.exports =  createRemoteDB; 


