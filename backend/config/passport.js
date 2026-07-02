const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/user");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            const email = profile.emails?.[0]?.value;
            user = await User.findOne({ email });

            if (user) {
                user.googleId = profile.id;
                await user.save();
            } else {
                user = await User.create({
                    username: profile.displayName,
                    email,
                    googleId: profile.id,
                    role: "senior",
                });
            }
        }

        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/auth/github/callback`,
    scope: ["user:email"],
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
            const email = profile.emails?.[0]?.value || `${profile.username}@users.noreply.github.com`;
            user = await User.findOne({ email });

            if (user) {
                user.githubId = profile.id;
                await user.save();
            } else {
                user = await User.create({
                    username: profile.username,
                    email,
                    githubId: profile.id,
                    role: "senior",
                });
            }
        }

        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

module.exports = passport;
