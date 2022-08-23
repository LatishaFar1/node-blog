const express = require('express');

const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/posts');


//CONNECTING TO MONGODB
const dbURL = 'mongodb+srv://Tish:Loki2022@node-blog.5cqmpje.mongodb.net/node-blog?retryWrites=true&w=majority';
mongoose.connect(dbURL)
    .then((result) => app.listen(3000) )
    .catch((error) => console.log(error));

//VIEW ENGINE
app.set('view engine', 'ejs');
// app.set('views', 'folder-name-with-views')

//MIDDLEWARE
app.use(morgan('dev'));

    //middleware for the post request - takes the url encoded data and makes an object
app.use(express.urlencoded({extended: true}));

//STATIC FILES
app.use(express.static('static'))


//MONGODB & MONGOOSE ROUTING

app.get('/new-post', (request, response) => {
    const post = new Post({
        title: 'second post',
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

app.get('/all-posts', (request, response) => {
    Post.find()
    .then((result) => {
        response.send(result);
    })
    .catch((error)=> {
        console.log(error)
    })
})

// app.get('/single-post', (request, response) => {
//     Post.findById('62fee9f75daf9f31348064b2')
//     .then((result) => {
//         response.send(result);
//     })
//     .catch((error)=> {
//         console.log(error)
//     })
// })



app.get('/', (request, response) => {
    // response.send('<p>Home page</p>');
    //send() automatically sets the content header and status code

    // response.sendFile('/views/index.html', {root: __dirname})
    
    response.redirect('/posts');
    
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


//GET REQUEST 

app.get('/posts', (request, response) => {
    Post.find()
    .then((result) => {
        response.render('index', {title: 'All Posts', posts: result})
    })
    .catch((error) => {
        console.log(error)
    })
})


//GET ONE POST
app.get('/posts/:id', (request, response) => {
    //find single post with id
        //extract id
        const id = request.params.id;
    Post.findById(id)
        .then(result => {
            response.render('post-details', {post: result, title: 'Post'})
        })
    
})


//POST REQUEST

app.post('/posts', (request, response) => {
    //create new instance of a post
   const post = new Post(request.body)
   
   post.save()
   .then((result) => {
    response.redirect('/')
   })
})


//DELETE REQUEST

app.delete('/posts/:id', (request, response) => {
    const id = request.params.id;

    Post.findByIdAndDelete(id)
        .then(result => {
            response.json({redirect: '/posts'})
        })
        .catch(error => {
            console.log(error)
        })
})


app.get('/new', (request, response) => {
    response.render('newpost', { title: 'NEW POST'});
})

//ERROR PAGE - needs to be at the bottom of the page
//use() is used to create middleware
app.use((request, response) => {
    response.status(404).render('error')
})