module.exports = (app) => {
    app.use((err, req, res, next) => {
      const status = err.status || 500;
      res.send({
        code: "Exception",
        status,
        en_message: err.message,
        fa_message: "در عملیات مورد نظر خطایی رخ داده است",
      });
    });
  };
  