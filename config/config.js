const port = process.env.PORT || 3000;
const tokenSecret = process.env.TOKENSECRET;
module.exports = {
  port,
  TOKENSECRET: tokenSecret,
};
