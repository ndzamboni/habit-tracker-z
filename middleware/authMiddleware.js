module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.session.userId) {
      return next();
    } else {
      res.redirect('/auth/login');
    }
  }
};
