const express = require("express")


let server = express()



server.get("/", (req, res)=>{
    res.send("Worked Successfully!")
});





server.listen(3000, ()=>{
    console.log("Listening on port: " + 3000);
})