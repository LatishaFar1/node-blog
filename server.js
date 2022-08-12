const http = require("http");
const fs = require("fs");


const server = http.createServer((request, response) => {
    console.log(request.url, request.method);

    response.setHeader("Content-Type", "text/plain");

});

server.listen(3000, "localhost", () =>{
    console.log("listening for requests on localhost 3000")
})