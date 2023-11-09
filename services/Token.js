const jwt = require("jsonwebtoken");

module.exports.sign = (data) => {
  return jwt.sign(data, process.env.SECRET_TOKEN);
};

module.exports.verify = (token) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    return payload;
  } catch (error) {
    return false;
  }
};
module.exports.decode = (token) => {
  return jwt.decode(token, process.env.SECRET_TOKEN);
};
