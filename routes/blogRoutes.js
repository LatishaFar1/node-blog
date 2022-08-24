const express = require('express');
const Post = require('../models/posts');
const router = express.Router();


//GET REQUEST 

router.get('/posts', (request, response) => {
    Post.find()
    .then((result) => {
        response.render('index', {title: 'All Posts', posts: result})
    })
    .catch((error) => {
        console.log(error)
    })
})


router.get('/new', (request, response) => {
    response.render('newpost', { title: 'NEW POST'});
})

//GET ONE POST
router.get('/posts/:id', (request, response) => {
    //find single post with id
        //extract id
        const id = request.params.id;
    Post.findById(id)
        .then(result => {
            response.render('post-details', {post: result, title: 'Post'})
        })
    
})


//POST REQUEST

router.post('/posts', (request, response) => {
    //create new instance of a post
   const post = new Post(request.body)
   
   post.save()
   .then((result) => {
    response.redirect('/')
   })
})


//DELETE REQUEST

router.delete('/posts/:id', (request, response) => {
    const id = request.params.id;

    Post.findByIdAndDelete(id)
        .then(result => {
            response.json({redirect: '/posts'})
        })
        .catch(error => {
            console.log(error)
        })
})


module.exports = router;