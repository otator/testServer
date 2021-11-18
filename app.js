const api = "https://cat-fact.herokuapp.com/facts";
var superagent = require("superagent");
var fastify = require("fastify")({logger: true})
// var express = require("express")

const DOCTORS_API = 'https://619355dcd3ae6d0017da84c7.mockapi.io/doctors';
var createRow =  require("./schema.js");
require('dotenv').config();

var PORT = process.env.PORT;


fastify.get("/doctors", getCalendarInfo);
fastify.get("/", getHomePage)
 

function getHomePage(req, res){
    res.send("Welcome to home page")
}


fastify.get("/main", (req, res)=>{
    res.send({message: "works"});
});

// fastify.get("/cats", (req, res)=>{
//     superagent.get(api)
//     .then( (result)=>{
//         jsonObjects = result.body.map( (value, index) =>{
//                         return new makeResponse(index+1, value.text);
//                     });
//                     jsonObjects.forEach(value=>{
//                         createRow(value.factNumber, value.fact);
//                     })
//                     console.log(jsonObjects)
//                     res.send(jsonObjects)
                   
//     })
//     .catch(error => {
//         console.log("Error in getting data from API");
//         console.log(error)
//     })
// })


function getCalendarInfo(req, res){
    superagent.get(DOCTORS_API)
    .then((results)=>{
        res.send(results.body)
    })
    .catch((error)=>{
        console.log(`Error in getting data from doctors api, beacause of: ${error}`)
        res.send(`Error in getting data from the doctors api => ${error}`)
    })
}


fastify.listen(PORT, err=>{
    if(err){
        console.log("#####Error#####")
        process.exit(1);
    }
})

function makeResponse(factNumber, fact){
    this.factNumber = factNumber,
    this.fact = fact;
}

