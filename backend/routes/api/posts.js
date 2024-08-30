const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Post, Image, Follower } = require('../../db/models');
const { multipleFilesUpload, multipleMulterUpload, retrievePrivateFile } = require("../../awsS3");

// Get post by user id
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { user_id: req.params.userId },
      include: [{
        model: Image,
        as: 'images',
        attributes: ['image_url']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(posts);
  } catch (error) {
    res.status(500).send('Failed to fetch posts');
  }
});
// Create a post
router.post('/', requireAuth, multipleMulterUpload('images'), async (req, res) => {
  const { caption } = req.body;
  const { id: user_id } = req.user;
  console.log('req', req.files) 
  if ((req.files && req.files.length === 0) && !caption) {
    return res.status(400).send({
      message: 'A caption or at least one image is required to create a post.'
    });
  }

  try {
    const post = await Post.create({
      user_id,
      caption
    });

    if (req.files && req.files.length > 0) {
      const imageUrls = await multipleFilesUpload({ files: req.files, public: true });
      await Promise.all(imageUrls.map(url => 
        Image.create({
          imageable_id: post.id,
          imageable_type: 'post',
          image_url: url
        })
      ));
    }
    const resultPost = await Post.findByPk(post.id, {
      include: [{
        model: Image,
        as: 'images',
        attributes: ['image_url']
      }]
    });

    console.log('Post created successfully:', resultPost);
    res.status(201).json(resultPost);
  } catch (error) {
    console.error('Error creating post:', error.message, error.stack);
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
// Edit a post
router.patch('/:postId', requireAuth, multipleMulterUpload('images'), async (req, res) => {
  const { postId } = req.params;
  const { caption, removedImages } = req.body; 
  const { id: user_id } = req.user;
  console.log('req.body', req.body);
  console.log('req.files', req.files);
  try {
    const post = await Post.findOne({
      where: { id: postId, user_id },
      include: [{
        model: Image,
        as: 'images'
      }]
    });

    if (!post) {
      return res.status(404).send({ message: 'Post not found or you do not have permission to edit it.' });
    }

    if (caption) post.caption = caption;

    if (removedImages) {
      const imagesToRemove = JSON.parse(removedImages);
      await Promise.all(imagesToRemove.map(imageUrl => 
        Image.destroy({ where: { image_url: imageUrl, imageable_id: post.id } })
      ));
    }

    if (req.files && req.files.length > 0) {
      const imageUrls = await multipleFilesUpload({ files: req.files, public: true });
      await Promise.all(imageUrls.map(url => 
        Image.create({
          imageable_id: post.id,
          imageable_type: 'post',
          image_url: url
        })
      ));
    }

    await post.save();

    const updatedPost = await Post.findByPk(post.id, {
      include: [{
        model: Image,
        as: 'images',
        attributes: ['image_url']
      }]
    });

    console.log('Post updated successfully:', updatedPost);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send({ message: 'Error updating post', error: error.message });
  }
});
// Get all posts from people the user follows
router.get('/feed/:userId', async (req, res) => {
  try {
    const followingUsers = await Follower.findAll({
      where: { user_follower_id: req.params.userId },
      attributes: ['followed_id']
    });

    const followedUserIds = followingUsers.map(follower => follower.followed_id);

    const posts = await Post.findAll({
      where: { user_id: followedUserIds },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'firstName', 'lastName', 'profilePicture']
        },
        {
          model: Image,
          as: 'images',
          attributes: ['image_url']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(posts);
  } catch (error) {
    console.error('Failed to fetch feed', error);
    res.status(500).send('Failed to fetch feed');
  }
});




module.exports = router;