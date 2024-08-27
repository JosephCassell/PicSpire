const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Follower } = require('../../db/models');
const { singleFileUpload, singleMulterUpload, multipleFilesUpload, multipleMulterUpload, retrievePrivateFile } = require("../../awsS3");
const { Op } = require('sequelize');
const isSQLite = process.env.NODE_ENV === 'development';
const operator = isSQLite ? Op.like : Op.iLike;
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide your name.'),
  check('lastName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide your last name.'),
  handleValidationErrors
];
const validateBio = [
  check('bio')
    .optional()
    .isLength({ max: 150 })
    .withMessage('Bio must be 150 characters or less.'),
  handleValidationErrors
];

router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, firstName, lastName, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, firstName, lastName, hashedPassword });
  
      const safeUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName, 
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
);

// Route to get all users a user is following
router.get('/:userId/following', async (req, res) => {
  try {
    const userId = req.params.userId;
    const following = await Follower.findAll({
      where: { user_follower_id: userId },
      include: {
        model: User,
        as: 'followed',
        attributes: ['id', 'username']
      }
    });

    const followingData = following.map(f => ({
      id: f.followed.id,
      username: f.followed.username
    }));

    res.json({
      count: followingData.length,
      following: followingData
    });
  } catch (error) {
    console.error('Error fetching following:', error); 
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Route to get user's followers 
router.get('/:userId/followers', async (req, res) => {
  try {
    const userId = req.params.userId;
    const followers = await Follower.findAll({
      where: { followed_id: userId },
      include: {
        model: User,
        as: 'user_followers', 
        attributes: ['id', 'username']
      }
    });

    const followersData = followers.map(f => ({
      id: f.user_followers.id,
      username: f.user_followers.username
    }));

    res.json({
      count: followersData.length,
      followers: followersData
    });
  } catch (error) {
    console.error('Error fetching followers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search users by username
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query is required.' });
    }

    const users = await User.findAll({
      where: {
        username: {
          [operator]: `%${q}%`
        }
      },
      attributes: ['id', 'username', 'profilePicture']
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'only me' });
    }

    res.json({ users });
  } catch (error) {
    console.error('Error searching for users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get details of a user by username
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: { username },
      attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'bio', 'profilePicture'] 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Route to upload/update user profile picture
router.patch('/:userId/profile-picture', requireAuth, singleMulterUpload('profilePicture'), async (req, res) => {
  const { userId } = req.params;
  const { id: user_id } = req.user;

  if (parseInt(userId) !== user_id) {
    return res.status(403).json({ message: 'You do not have permission to update this profile.' });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.file) {
      const imageUrl = await singleFileUpload({ file: req.file, public: true });
      user.profilePicture = imageUrl;
      await user.save();
      res.status(200).json({ message: 'Profile picture updated successfully', profilePicture: imageUrl });
    } else {
      res.status(400).json({ message: 'No image file provided' });
    }
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ message: 'Error updating profile picture', error: error.message });
  }
});

// Follow a user
router.post('/follow', requireAuth, async (req, res) => {
  const userId = req.user.id; 
  const { followedId } = req.body; 

  try {
    if (userId === followedId) {
      return res.status(400).json({ error: "You cannot follow yourself." });
    }

    const existingFollow = await Follower.findOne({
      where: {
        user_follower_id: userId, 
        followed_id: followedId 
      }
    });

    if (existingFollow) {
      return res.status(409).json({ error: "You are already following this user." });
    }

    const newFollow = await Follower.create({
      user_follower_id: userId,
      followed_id: followedId
    });

    return res.status(201).json(newFollow);
  } catch (error) {
    console.error('Error during follow:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Unfollow a user
router.delete('/unfollow', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { followedId } = req.body;

  try {
    const follow = await Follower.findOne({
      where: {
        user_follower_id: userId,
        followed_id: followedId
      }
    });

    if (!follow) {
      return res.status(404).json({ error: "You are not following this user." });
    }
    await follow.destroy();

    res.status(200).json({ message: "You have unfollowed the user successfully." });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Route to update a user's bio
router.patch('/:userId/bio', requireAuth, validateBio, async (req, res) => {
  const { userId } = req.params;
  const { bio } = req.body;
  const { id: user_id } = req.user;

  if (parseInt(userId) !== user_id) {
    return res.status(403).json({ message: 'You do not have permission to update this profile.' });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bio = bio || null;
    await user.save();

    res.status(200).json({ message: 'Bio updated successfully', bio: user.bio });
  } catch (error) {
    console.error('Error updating bio:', error);
    res.status(500).json({ message: 'Error updating bio', error: error.message });
  }
});




module.exports = router;