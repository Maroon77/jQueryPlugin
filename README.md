# jQueryPlugin
jQuery plugin by custom
-自定义jQuery弹窗插件：
    -不同之处：可以在iframe里全局使用

-遇到问题及解决办法：
    -使用iframe测试插件时，子窗口获取父窗口失败，报错信息为“Uncaught SecurityError: Blocked a frame with origin "null" from accessing a frame with origin "null". Protocols, domains, and ports must match.”，报错的意思是“未捕获的安全错误：阻止了一个域为null的frame页面访问另一个域为null的页面”，这是因为跨页面操作涉及到域的概念，文件是在本地直接用浏览器打开的，地址栏是file:///.解决办法是在本地架设服务器来调试，我使用的是apache.
    -iframe页面以及iframe里嵌套的iframe页面如何获取窗口window的body标签：一层iframe嵌套的解决办法是window.parent.frames.document.body，两层iframe嵌套的解决办法是window.parent.parent.frames.document.body,多层嵌套以此类推。
