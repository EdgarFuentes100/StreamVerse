exports.loginSuccess = (req, res) => res.redirect(process.env.CLIENT_URL);
exports.loginFailure = (req, res) => res.redirect(process.env.CLIENT_URL + '/Login');
exports.getUser = (req, res) => res.json(req.user || null);
exports.logout = (req, res) => {
    req.logout(() => {
        req.session.destroy(err => {
            if (err) return res.status(500).json({ message: "Error al cerrar sesión" });
            res.json({ success: true }); // 🔹 React lo recibirá y actualizará estado
        });
    });
};
