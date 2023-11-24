module.exports = (req, res, next) => {
  res.serverError = function (message) {
    res.status(401).send({ success: false, message: message });
  };
  next();
};
