const express = require('express');

const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/posts');


//CONNECTING TO MONGODB
const dbURL = 'mongodb+srv://Tish:Loki2022@node-blog.5cqmpje.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURL)
    .then((result) => app.listen(3000) )
    .catch((error) => console.log(error));

//VIEW ENGINE
app.set('view engine', 'ejs');
// app.set('views', 'folder-name-with-views')

//MIDDLEWARE
app.use(morgan('dev'));

//STATIC FILES
app.use(express.static('static'))


//MONGODB & MONGOOSE ROUTING

app.get('/new-post', (request, response) => {
    const post = new Post({
        title: 'first post',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget duis at tellus at urna condimentum mattis. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Aliquet bibendum enim facilisis gravida neque convallis a cras semper'
    });
    //asynchronous saving
    post.save()
    .then((result) => {
        response.send(result)
    })
    .catch((error) => {
        console.log(error)
    });
});


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