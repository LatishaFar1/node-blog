const mongoose = require('mongoose');
const schema = mongoose.Schema;


const postsSchema = new schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true });


const Post = mongoose.model('Post', postsSchema);

module.exports = Post;





