const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const authRoutes = require('./routes/auth');
const dbConfig = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// 连接到 MongoDB
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// 中间件
app.use(express.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth 配置
passport.use(new GitHubStrategy({
    clientID: '你的实际 Client ID',
    clientSecret: '你的实际 Client Secret',
    callbackURL: 'http://localhost:3000/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    // 在数据库中查找或创建用户
    User.findOne({ githubId: profile.id }).then(user => {
        if (user) {
            return done(null, user);
        } else {
            new User({ githubId: profile.id, username: profile.username }).save()
                .then(newUser => done(null, newUser));
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// 路由
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 