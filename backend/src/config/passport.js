const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getUserByGoogleId, createUser } = require('../models/user.model');
const { localDB } = require('../config/dbConfig');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/api/v1/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await getUserByGoogleId(profile.id);
        if (!user) {
            user = await createUser({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            });
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

passport.serializeUser((user, done) => done(null, user.idUsuario));

passport.deserializeUser(async (id, done) => {
    try {
        const [rows] = await localDB.query('SELECT * FROM usuario WHERE idUsuario = ?', [id]);
        done(null, rows[0] || null);
    } catch (err) {
        done(err, null);
    }
});
