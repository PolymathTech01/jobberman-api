const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const saltRounds = 10;

const hashMyPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve([salt, hash]);
      });
    });
  });
};
const generateOTP = () => {
  return Math.floor(Math.random() * 10000);
};


module.exports = {
    hashMyPassword,
    generateOTP
}