const http = require("http");
const fs = require("fs");


const server = http.createServer((request, response) => {
    console.log(request.url, request.method);

    response.setHeader("Content-Type", "text/html");

    //ROUTING
    let path = "./views/";
    switch(request.url){
        case "/":
            path += "index.html"
            break;
        case "/about":
            path += "about.html";
            break;
        default:
            path += "error.html";
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