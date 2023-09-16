const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.use(
  session({
    secret: 'session',
    resave: 'false',
    saveUninitialized: 'true',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 1000 * 5,
    }
  })
);
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

let sessionData = {};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // 検証用のためユーザー名とパスワードは固定
  if (username !== 'user1' || password !== 'Passw0rd!#') {
    res.status(403);
    res.send('ログイン失敗');
    return
  }
  // セッションにユーザー名を保存
  sessionData = req.session;
  sessionData.username = username;
  // CSRF検証用ページへリダイレクト
  res.redirect('/csrf_test.html');
});

module.exports = router;