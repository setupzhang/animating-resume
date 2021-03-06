var content1 = `/* 
 * 面试官你好，我是张焱
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式 */
*{
  transition: all 1.4s;
}
html{
  background: #DEE1E6;
}
div.code-wrapper{
  padding: 30px;
  height: 100vh;
}
/* 用黑色背景写代码吧！ */
#code{
  border: 1px solid #aaa;
  background-color:#1E1E1E;
}
/* 呀，看不见字了 */
/* 没关系，顺便加个语法高亮 */
.token.selector{ color: #D3D3A0; }
.token.property{ color: #9EDCFF; }
#code{ color: #D4D4D4; }
/* 再加一个呼吸效果试试？ */
#code{
  animation: breath 0.8s infinite alternate-reverse;
}
/* 进入正题吧！ */
/* 我需要一张白纸来写我的简历*/
#paper {
  display: block;
}
/* 好了，我可以在白纸上写字了，看右边~ */
`

var content2 = `
/* 接下来用一个优秀的库 marked.js
   把 Markdown 变成 HTML */
`
var md = `
# 自我介绍
我叫张焱,
1996年2月出生,中国农业大学毕业.自学前端半年,希望应聘前端开发岗位.

# 技能介绍
react开发，熟练掌握react技术栈，react-router，redux，redux-saga，antd组件库等。
vue开发，熟悉vue框架，使用vue-router进行路由配置和vuex进行状态管理。对vue3.0有一定了解。
掌握原生js知识，es6规范，熟悉html5新特性，sass，以及使用ccs3实现动画效果。

# 联系方式
- QQ 188813950
- Email 188813950@qq.com
- 手机 13051386306

`
let content3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`

function writedown(target, preText, preCss, text, callback) {
    let domCode = document.querySelector(target)
    let n = 0
    let id = setInterval(() => {
        domCode.innerHTML = Prism.highlight(preText + text.substring(0, n + 1), Prism.languages.css);
        css.innerHTML = preCss + text.substring(0, n + 1)
        n += 1
        domCode.scrollTop = domCode.scrollHeight
        if (n >= (text.length - 1)) {
            window.clearInterval(id)
            callback.call()
        }
    }, 40)
}

writedown('#code', '', '', content1, () => {
    createPaper(() => {
        writedown('#md', '', content1, md, () => {
            writedown('#code', content1, content1, content2, () => {
                convertToMarkdown(() => {
                    writedown('#code', content1 + content2, content1, content3, () => {
                    })
                })
            })
        })
    })
})

function createPaper(callback) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    document.body.appendChild(paper)
    var content = document.createElement('pre')
    content.id = 'md'
    paper.appendChild(content)
    callback.call()
}

function convertToMarkdown(callback) {
    var div = document.createElement('div')
    div.className = 'markdown markdown-body'   // 必须有markdown-body这个类，github-markdown.css才会给它加样式。
    div.innerHTML = marked(md)
    var xxx = document.querySelector('#md')
    xxx.replaceWith(div)
    callback()
}
