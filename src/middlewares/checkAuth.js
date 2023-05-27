
const checkAuth = (req, res, next) => {
  if(req.session.userid) {
    next();
  }
  else {
    res.redirect('/');
  }
}

module.exports = checkAuth;