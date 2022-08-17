const express = require('express');

const app = express();
const morgan = require('morgan');

//VIEW ENGINE
app.set('view engine', 'ejs');
// app.set('views', 'folder-name-with-views')


// listen for requests

app.listen(3000);


//MIDDLEWARE
app.use(morgan('dev'));

//STATIC FILES
app.use(express.static('static'))



app.get('/', (request, response) => {
    // response.send('<p>Home page</p>');
    //send() automatically sets the content header and status code

    // response.sendFile('/views/index.html', {root: __dirname})
    
    const posts = [
        {title: "TitleONE", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget duis at tellus at urna condimentum mattis. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Interdum velit laoreet id donec ultrices. "},
        {title: "TitleTWO", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget duis at tellus at urna condimentum mattis. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Interdum velit laoreet id donec ultrices. "},
        {title: "TitleTHREE", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget duis at tellus at urna condimentum mattis. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Interdum velit laoreet id donec ultrices. "},
        {title: "TitleFOUR", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget duis at tellus at urna condimentum mattis. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Interdum velit laoreet id donec ultrices. "}
    ]
    
    response.render('index', { title: 'Home', posts});


})

app.get('/about', (request, response) => {
    // response.send('<p>about page</p>');

    //if we want to return the file - we need to link to the directory name + file
    // response.sendFile('/views/about.html', {root: __dirname})
    response.render('about', { title: 'About'})
})


// //REDIRECTS
// app.get('/about-me', (request, response) => {
//     response.redirect('/about');
// })


app.get('/new', (request, response) => {
    response.render('newpost', { title: 'NEW POST'});
})

//ERROR PAGE - needs to be at the bottom of the page
//use() is used to create middleware
app.use((request, response) => {
    response.status(404).render('error')
})