const http = require("http");
const fs = require("fs");


const server = http.createServer((request, response) => {
    console.log(request.url, request.method);

    response.setHeader("Content-Type", "text/html");

    fs.readFile("./views/index.html", (error, data) => {
        if(error){
            console.log(error);
            response.end();
        } else {
            response.write(data);
            response.end();
        }
    })

});

server.listen(3000, "localhost", () =>{
    console.log("listening for requests on localhost 3000")
})