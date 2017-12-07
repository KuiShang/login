
~~~~
npm i

mac平台下

    $ DEBUG=myapp npm start

win平台下

    set DEBUG=myapp & npm start

~~~~
nodejs 通过 cookies 实现 注册 登录 记住密码功能

其中 记住密码是通过        res.cookie("user", {username: username}, {maxAge: 600000 , httpOnly: false});

maxAge 如果设置了 则cookie 会存到游览器硬盘上
如果不设置则会存到内存中

这样当你关闭了游览器再重新进入 直接访问 users页面 会决定了你能不能进入还是 重定向到登录页面