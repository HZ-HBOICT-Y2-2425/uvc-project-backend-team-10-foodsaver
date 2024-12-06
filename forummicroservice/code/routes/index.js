import express from 'express';
import { 
    createPost, 
    getPosts, 
    getPostById, 
    updatePost, 
    deletePost 
} from '../controllers/forumController.js';

const router = express.Router();

// Routes
// Create a new post
router.post('/forum', createPost);

// Get all posts
router.get('/forum', getPosts);

// Get a specific post by ID
router.get('/forum/:post_id', getPostById);

// Update a post by ID
router.put('/forum/:post_id', updatePost);

// Delete a post by ID
router.delete('/forum/:post_id', deletePost);

export default router;
