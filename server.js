const http = require("http");
const fs = require("fs");
const _ = require('lodash');

const server = http.createServer((request, response) => {
    console.log(request.url, request.method);

    response.setHeader("Content-Type", "text/html");

    //ROUTING
    let path = "./views/";
    switch(request.url){
        case "/":
            path += "index.html"
            response.statusCode = 200;
            break;
        case "/about":
            path += "about.html";
            response.statusCode = 200;
            break;

        case "/aboutme":
    
            response.statusCode = 301;
            response.setHeader("Location", "./about");
            response.end();
            break;

        default:
            path += "error.html";
            response.statusCode = 404;
            break;
    }


    //READING 
    fs.readFile(path, (error, data) => {
        if(error){
            console.log(error);
            response.end();
        } else {
            // below line is not necessary if we pass data into response.end()
            // response.write(data);
            response.end(data);
        }
    })

});

server.listen(3000, "localhost", () =>{
    console.log("listening for requests on localhost 3000")
})