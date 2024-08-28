const fs = require('fs');
const path = require('path');
const profilePicturePath = path.join(__dirname, '../seeders/Photos/profile#1.jpg');

fs.access(profilePicturePath, fs.constants.F_OK, (err) => {
  if (err) {
      console.error("Profile picture path is incorrect:", err);
  } else {
      console.log("Profile picture path is correct.");
  }
});