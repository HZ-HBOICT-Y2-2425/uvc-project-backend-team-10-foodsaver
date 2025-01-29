import development from '../knexfile.js';
import knex from 'knex';

const db = knex(development);

// Create a new forum post
export async function createPost(req, res) {
    const { user_id, title, content, photo_url } = req.body;

    if (!user_id || !title || !content || !photo_url) {
        return res.status(400).json({ error: "All fields (user_id, title, content, photo_url) are required." });
    }

    try {
        const [post] = await db('forum')
            .insert({ user_id, title, content, photo_url })
            .returning(['id', 'user_id', 'title', 'content', 'photo_url', 'created_at']);
        return res.status(201).json(post);
    } catch (error) {
        console.error('Database error creating post:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Get all forum posts
export async function getPosts(req, res) {
    console.log("res object:", res); // Debug log
    try {
        const posts = await db('forum')
            .select('id', 'title', 'content', 'photo_url', 'user_id', 'created_at')
            .orderBy('created_at', 'desc');

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found." });
        }

        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


// Get a single forum post by ID
export async function getPostById(req, res) {
    const { post_id } = req.params;

    try {
        const post = await db('forum')
            .where({ id: post_id })
            .select('id', 'title', 'content', 'photo_url', 'user_id', 'created_at')
            .first();

        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// Update a forum post
export async function updatePost(req, res) {
    const { post_id } = req.params;
    const { title, content } = req.body;

    if (!post_id) {
        return res.status(400).json({ error: "Post ID is required." });
    }

    if (!title && !content) {
        return res.status(400).json({ error: "At least one of title or content must be provided." });
    }

    try {
        const updatedRows = await db('forum')
            .where({ id: post_id })
            .update({ title, content });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "Post not found." });
        }

        return res.status(200).json({ message: "Post updated successfully." });
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Delete a forum post
export async function deletePost(req, res) {
    const { post_id } = req.params;

    if (!post_id) {
        return res.status(400).json({ error: "Post ID is required." });
    }

    try {
        const deletedRows = await db('forum')
            .where({ id: post_id })
            .del();

        if (deletedRows === 0) {
            return res.status(404).json({ error: "Post not found." });
        }

        return res.status(200).json({ message: "Post deleted successfully.", post_id });
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
