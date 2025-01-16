const express = require('express');
const passport = require('passport');
const router = express.Router();

// 首页
router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

// GitHub 登录
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub 回调
router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
);

// 处理 star 和 fork 操作
router.post('/star', (req, res) => {
    // 这里可以使用 GitHub API 进行 star 操作
    res.send('Star action performed');
});

router.post('/fork', (req, res) => {
    // 这里可以使用 GitHub API 进行 fork 操作
    res.send('Fork action performed');
});

module.exports = router; 