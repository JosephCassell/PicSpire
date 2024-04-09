const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../../utils/s3Service');

const router = express.Router();
const upload = multer();

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = await uploadImage(req.file.buffer, req.file.originalname);
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading image');
  }
});

module.exports = router;
