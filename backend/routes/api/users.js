const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Follower } = require('../../db/models');
const { singleFileUpload, singleMulterUpload, multipleFilesUpload, multipleMulterUpload, retrievePrivateFile } = require("../../awsS3");
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

// Route to get all followers of a user
router.get('/:userId/followers', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user_followers = await Follower.findAll({
      where: { followed_id: userId },
      include: {
        model: User,
        as: 'user_followers',
        attributes: ['id', 'username']
      }
    });
    res.json({
      count: user_followers.length,
      followers: user_followers.map(f => f.userFollowers)
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all users a user is following
router.get('/:userId/following', async (req, res) => {
  try {
    const userId = req.params.userId;
    const followings = await Follower.findAll({
      where: { user_follower_id: userId },
      include: {
        model: User,
        as: 'followed',
        attributes: ['id', 'username']
      }
    });
    res.json({
      count: followings.length,
      following: followings.map(f => f.followed)
    });
  } catch (error) {
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

module.exports = router;