const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/google', (req, res, next) => {
  console.log("🟢 Iniciando autenticación con Google...");
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

// 🔹 Callback después de autenticarse en Google
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/v1/auth/failure' }),
  (req, res) => {
    console.log("✅ Callback de Google recibido.");
    console.log("👤 Usuario autenticado:", req.user);

    const user = req.user;

    // 🔸 Si no se recibió usuario
    if (!user) {
      console.warn("⚠️ No se recibió usuario de Google. Redirigiendo a /Login...");
      return res.redirect(`${process.env.CLIENT_URL}/Login`);
    }

    // 🔸 Log del rol
    console.log("📌 Rol del usuario:", user.idRol);

    // 🔸 Si el usuario es administrador → va directo al Home
    if (user.idRol === 1) {
      console.log("🎩 Usuario administrador detectado. Redirigiendo al Home:", `${process.env.CLIENT_URL}/`);
      return res.redirect(`${process.env.CLIENT_URL}/`);
    }

    // 🔸 Si es participante u otro → va a seleccionar perfil
    console.log("👥 Usuario participante detectado. Redirigiendo a Perfil:", `${process.env.CLIENT_URL}/Perfil`);
    return res.redirect(`${process.env.CLIENT_URL}/Perfil`);
  }
);

router.get('/failure', (req, res) => {
  console.error("❌ Error en autenticación con Google");
  authController.loginFailure(req, res);
});

router.get('/user', (req, res) => {
  console.log("🔎 Obteniendo usuario desde sesión...");
  authController.getUser(req, res);
});

router.get('/logout', (req, res) => {
  console.log("👋 Cerrando sesión...");
  authController.logout(req, res);
});

module.exports = router;
