const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

/**
 * @param {Buffer} buffer
 * @param {string} fileName 
 * @returns {Promise<string>}
 */
const uploadImage = async (buffer, fileName) => {
  try {
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    };

    const parallelUploads3 = new Upload({
      client: s3Client,
      params: uploadParams,
      leavePartsOnError: false
    });

    await parallelUploads3.done();
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

module.exports = {
  uploadImage
};
