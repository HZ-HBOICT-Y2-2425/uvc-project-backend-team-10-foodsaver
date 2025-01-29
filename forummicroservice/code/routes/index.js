import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { 
    createPost, 
    getPosts, 
    getPostById, 
    updatePost, 
    deletePost 
} from '../controllers/forumController.js';

const router = express.Router();

// Configure CORS for this router
const corsOptions = {
    origin: '*', // Allow requests from your frontend
    methods: 'GET,POST,PUT,DELETE',
};
router.use(cors(corsOptions)); // Apply CORS to this router

// Serve static files from the uploads folder
router.use('/uploads', express.static(path.resolve('uploads')));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('uploads')); // Save files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Generate unique filenames
    },
});

const upload = multer({ storage });

// Routes

// Create a new post (with optional photo upload)
router.post('/forum', upload.single('photo'), async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    // Add photo_url to the request body
    req.body.photo_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        // Use the controller to handle post creation
        await createPost(req, res);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all posts
router.get('/forum', async (req, res) => {
    try {
        await getPosts(req, res); // Delegate to the controller
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific post by ID
router.get('/forum/:post_id', async (req, res) => {
    try {
        await getPostById(req, res); // Delegate to the controller
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a post by ID
router.put('/forum/:post_id', async (req, res) => {
    try {
        await updatePost(req, res); // Delegate to the controller
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a post by ID
router.delete('/forum/:post_id', async (req, res) => {
    try {
        await deletePost(req, res); // Delegate to the controller
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
