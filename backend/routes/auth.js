const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// 用户注册
router.post('/register', async (req, res) => {
    const { githubId, clientID, clientSecret } = req.body;
    try {
        const user = await User.findOne({ githubId });
        if (user) {
            return res.status(400).json({ message: '用户已存在' });
        }
        const newUser = new User({ githubId, clientID, clientSecret });
        await newUser.save();
        res.status(201).json({ message: '用户注册成功' });
    } catch (error) {
        res.status(500).json({ message: '服务器错误' });
    }
});

// GitHub 登录
router.get('/auth/github', (req, res, next) => {
    const { clientID, clientSecret } = req.query; // 从请求中获取 clientID 和 clientSecret
    passport.authenticate('github', { scope: ['user:email'], clientID, clientSecret })(req, res, next);
});

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