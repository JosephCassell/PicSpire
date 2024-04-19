const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Post } = require('../../db/models');


router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.findAll({
            where: {
                user_id: userId
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        if (!posts) {
            return res.status(404).send({ message: 'No posts found for this user.' });
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving posts',
            error: error.message
        });
    }
});
// Create a post
// Backend route
router.post('/', requireAuth, async (req, res) => {
    const { caption } = req.body;
    const { id: user_id } = req.user; // Extract user ID from the session
  
    try {
      const post = await Post.create({
        user_id,
        caption
      });
      console.log('Post created successfully:', post);
      res.status(201).json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).send({
        message: 'Error creating post',
        error: error.message
      });
    }
  });
  
  // Delete a post
  router.delete('/:postId', requireAuth, async (req, res) => {
    const postId = req.params.postId;
  
    try {
        const post = await Post.findOne({
            where: {
                id: postId,
                user_id: req.user.id
            }
        });
  
        if (!post) {
            return res.status(404).send({ message: 'Post not found or you do not have permission to delete it.' });
        }
  
        await post.destroy();
        res.status(200).send({ message: 'Post deleted successfully.' });
    } catch (error) {
        res.status(500).send({
            message: 'Error deleting post',
            error: error.message
        });
    }
  });  

module.exports = router;