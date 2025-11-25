const { ObjectId } = require('mongodb');
const PostModel = require('../models/post.model');

/**
 * Post Controller - Business logic for post operations
 */
class PostController {
    /**
     * Create a new post
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async createPost(req, res) {
        try {
            const { userId, providerId, title, content, images, tags } = req.body;

            // Basic validation
            if (!userId || !content) {
                return res.status(400).json({
                    error: 'UserId and content are required'
                });
            }

            const id = await PostModel.create({
                userId,
                providerId,
                title,
                content,
                images,
                tags
            });

            res.status(201).json({
                message: 'Post created successfully',
                id
            });
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Error al crear el post' });
        }
    }

    /**
     * Get all posts
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async getPosts(req, res) {
        try {
            const { userId, providerId } = req.query;

            let posts;
            if (userId) {
                posts = await PostModel.findByUserId(userId);
            } else if (providerId) {
                posts = await PostModel.findByProviderId(providerId);
            } else {
                posts = await PostModel.findAll();
            }

            res.status(200).json(posts);
        } catch (error) {
            console.error('Error getting posts:', error);
            res.status(500).json({ error: 'Error al obtener los posts' });
        }
    }

    /**
     * Get a post by ID
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async getPostById(req, res) {
        try {
            const { id } = req.params;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const post = await PostModel.findById(id);

            if (!post) {
                return res.status(404).json({ message: 'Post no encontrado' });
            }

            res.status(200).json(post);
        } catch (error) {
            console.error('Error getting post:', error);
            res.status(500).json({ error: 'Error al obtener el post' });
        }
    }

    /**
     * Update a post
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async updatePost(req, res) {
        try {
            const { id } = req.params;
            const { title, content, images, tags } = req.body;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const result = await PostModel.update(id, {
                title,
                content,
                images,
                tags
            });

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'Post no encontrado' });
            }

            res.status(200).json({ message: 'Post actualizado exitosamente' });
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ error: 'Error al actualizar el post' });
        }
    }

    /**
     * Like a post (increment likes)
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async likePost(req, res) {
        try {
            const { id } = req.params;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const result = await PostModel.incrementLikes(id);

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'Post no encontrado' });
            }

            res.status(200).json({ message: 'Post liked exitosamente' });
        } catch (error) {
            console.error('Error liking post:', error);
            res.status(500).json({ error: 'Error al dar like al post' });
        }
    }

    /**
     * Delete a post
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async deletePost(req, res) {
        try {
            const { id } = req.params;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const result = await PostModel.delete(id);

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Post no encontrado' });
            }

            res.status(200).json({ message: 'Post eliminado exitosamente' });
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ error: 'Error al eliminar el post' });
        }
    }
}

module.exports = PostController;
