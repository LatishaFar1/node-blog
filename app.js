const express = require('express');

const app = express();

// listen for requests

app.listen(3000);

app.get('/', (request, response) => {
    // response.send('<p>Home page</p>');
    //send() automatically sets the content header and status code

    response.sendFile('/views/index.html', {root: __dirname})
})

app.get('/about', (request, response) => {
    // response.send('<p>about page</p>');

    //if we want to return the file - we need to link to the directory name + file
    response.sendFile('/views/about.html', {root: __dirname})
})