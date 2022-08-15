const express = require('express');

const app = express();

//VIEW ENGINE
app.set('view engine', 'ejs');
// app.set('views', 'folder-name-with-views')


// listen for requests

app.listen(3000);

app.get('/', (request, response) => {
    // response.send('<p>Home page</p>');
    //send() automatically sets the content header and status code

    // response.sendFile('/views/index.html', {root: __dirname})
    response.render('index');
})

app.get('/about', (request, response) => {
    // response.send('<p>about page</p>');

    //if we want to return the file - we need to link to the directory name + file
    // response.sendFile('/views/about.html', {root: __dirname})
    response.render('about')
})


// //REDIRECTS

// app.get('/about-me', (request, response) => {
//     response.redirect('/about');
// })

app.get('/new', (request, response) => {
    response.render('newpost');
})

//ERROR PAGE - needs to be at the bottom of the page
//use() is used to create middleware
app.use((request, response) => {
    response.status(404).render('error')
})