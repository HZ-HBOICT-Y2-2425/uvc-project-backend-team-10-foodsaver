import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

// Create a new forum post
export async function createPost(req, res) {
    const { user_id, title, content } = req.body;

    if (!user_id || !title || !content) {
        return res.status(400).json({ error: "User ID, title, and content are required" });
    }

    try {
        const [postId] = await db('forum').insert({ user_id, title, content }).returning('id');
        console.log(postId);  // Log the inserted post ID
        res.status(201).json({ message: "Post created successfully", post_id: postId });
    } catch (error) {
        console.error('Error creating post:', error);  // Log the error
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// Get all forum posts
export async function getPosts(req, res) {
    try {
        const posts = await db('forum').select('*').orderBy('created_at', 'desc');
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// Get a single forum post by ID
export async function getPostById(req, res) {
    const { post_id } = req.params;

    try {
        const post = await db('forum').where({ id: post_id }).first();

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// Update a forum post
export async function updatePost(req, res) {
    const { post_id } = req.params;
    const { title, content } = req.body;

    // Ensure that at least one of title or content is provided
    if (!title && !content) {
        return res.status(400).json({ error: "At least one of title or content must be provided to update" });
    }

    try {
        // Update the post by its id (using 'id' instead of 'post_id')
        const updatedRows = await db('forum').where({ id: post_id }).update({ title, content });

        // Check if any rows were updated
        if (updatedRows === 0) {  // No rows updated means post wasn't found
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
        console.error('Error updating post:', error);  // Log the error
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// Delete a forum post
export async function deletePost(req, res) {
    const { post_id } = req.params;

    try {
        // Change 'post_id' to 'id' to match the database column name
        const deletedRows = await db('forum').where({ id: post_id }).del();

        if (!deletedRows) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully", post_id: post_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

