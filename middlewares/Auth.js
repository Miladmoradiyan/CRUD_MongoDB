const TokenServices = require("../services/Token");
module.exports = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send({
      status: "err",
      code: 401,
      message: "شما مجاز به دسترسی نمی باشید ",
    });
  }
  const tokenValue = req.headers.authorization.split(" ");
  const token = TokenServices.verify(tokenValue);
  if (!token) {
    return res.status(401).send({
      status: "err",
      code: 401,
      message: "نشانی شما معتبر نمی باشد",
    });
  }
  next();
};
