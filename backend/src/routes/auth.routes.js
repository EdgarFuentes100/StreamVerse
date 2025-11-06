const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    authController.loginSuccess
);
router.get('/failure', authController.loginFailure);
router.get('/user', authController.getUser);
router.get('/logout', authController.logout);

module.exports = router;
