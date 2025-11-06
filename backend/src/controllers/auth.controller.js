exports.loginSuccess = (req, res) => res.redirect(process.env.CLIENT_URL);
exports.loginFailure = (req, res) => res.redirect(process.env.CLIENT_URL + '/login');
exports.getUser = (req, res) => res.json(req.user || null);
exports.logout = (req, res) => {
    req.logout(() => { req.session = null; res.redirect(process.env.CLIENT_URL); });
};
