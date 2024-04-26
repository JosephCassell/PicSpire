const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// const { uploadImage } = require('../../utils/s3Service');
const { Image, Post } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const router = express.Router();




module.exports = router;