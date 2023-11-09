const Admin = (value) => {
  return (req, res, next) => {
    const AdminRole = req.body.role;
    if (value.includes(AdminRole)) {
      next();
    } else {
      return res.status(401).send({
        status: "err",
        code: 401,
        message: "شما ادمین نمی باشید",
      });
    }
  };
};
module.exports = {
  Admin,
};
