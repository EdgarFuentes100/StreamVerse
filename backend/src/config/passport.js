const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getUserByGoogleId, createUser, getUserById } = require('../models/user.model');
require('dotenv').config();

// 🔹 Estrategia de autenticación con Google
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.SERVER_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Buscar usuario por Google ID
                let user = await getUserByGoogleId(profile.id);

                // Si no existe, lo crea
                if (!user) {
                    user = await createUser({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails?.[0]?.value || null,
                        avatar: profile.photos?.[0]?.value || null
                    });
                }

                return done(null, user);
            } catch (error) {
                console.error('Error en estrategia Google:', error);
                return done(error, null);
            }
        }
    )
);

// 🔹 Guardar ID de usuario en sesión
passport.serializeUser((user, done) => {
    done(null, user.idUsuario);
});

// 🔹 Recuperar usuario desde la sesión
passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
