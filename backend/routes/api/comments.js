const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Comment} = require('../../db/models');
const comment = require('../../db/models/comment');

// Get comments by post id
router.get('/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.findAll({
            where: { 
                post_id: postId,
                parent_comment_id: null
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username']
                },
                {
                    model: Comment,
                    as: 'childComments',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'username']
                        },
                        {
                            model: Comment,
                            as: 'childComments',
                            include: [
                                {
                                    model: User,
                                    as: 'user',
                                    attributes: ['id', 'username']
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [
                ['createdAt', 'ASC'],
                [ { model: Comment, as: 'childComments' }, 'createdAt', 'ASC' ] 
            ]
        });

        if (comments.length > 0) {
            res.status(200).json(comments);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        console.error('Failed to retrieve comments:', error);
        res.status(500).send({ message: 'Error retrieving comments', error: error.message });
    }
});
// Create a comment
router.post('/', requireAuth, async (req, res) => {
    const { postId, parentCommentId, text } = req.body;
    const userId = req.user.id;

    try {
        const comment = await Comment.create({
            post_id: postId,
            parent_comment_id: parentCommentId || null,
            user_id: userId,
            text: text
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error('Failed to create comment:', error);
        res.status(500).send({ message: 'Error creating comment', error: error.message });
    }
});
// Delete a comment
router.delete('/:commentId', requireAuth, async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;

    try {
        const comment = await Comment.findOne({ where: { id: commentId, user_id: userId } });
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found or user not authorized' });
        }

        await comment.destroy();
        res.status(204).send({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Failed to delete comment:', error);
        res.status(500).send({ message: 'Error deleting comment', error: error.message });
    }
});
// Edit a comment
router.patch('/:commentId', requireAuth, async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    try {
        const comment = await Comment.findOne({
            where: {
                id: commentId,
                user_id: userId
            }
        });

        if (!comment) {
            return res.status(404).send({ message: 'Comment not found or user not authorized to edit.' });
        }

        comment.text = text;
        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        console.error('Failed to update comment:', error);
        res.status(500).send({ message: 'Error updating comment', error: error.message });
    }
});

module.exports = router;