课题组网站 使用说明
====================

一、文件是做什么的
  index.html     首页（实验室动态、新闻图片轮播）
  research.html  研究页（全部项目，可按方向筛选）
  people.html    成员页
  papers.html    论文页
  contact.html   联系与招生页
  style.css      全站样式（颜色在文件最上面统一修改）
  script.js      手机菜单和筛选功能（一般不用改）
  images/        所有图片放在这里

二、本地预览
  双击 index.html，用浏览器打开即可，不需要联网，也不需要安装任何软件。
  修改文件并保存后，在浏览器里按 F5 刷新就能看到效果。
  网站默认显示中文；右上角的“中文 / EN”按钮可以切换语言。
  选择会保存在浏览器中，进入其他页面时会继续使用上次选择的语言。

三、用什么软件修改
  推荐 VS Code（免费）。Windows 自带的记事本也可以，但保存时编码要选 UTF-8。
  文件里所有【改这里】和中文注释都是写给你看的提示，网页上不会显示。

四、常见修改
  1. 课题组名称已经是 ESELab，出现在五个 html 文件的顶部导航和页脚里。
     以后要改，在 VS Code 里按 Ctrl+Shift+H 可以一次替换所有文件。
  2. 加新闻：打开 index.html，找到 Lab News 部分。
     每条新闻是一个 <article class="lab-news-item"> 区块；复制整块放到最上面即可新增。
     轮播图在 <div class="news-track"> 中，每张图使用一个 <figure class="news-slide">。
     当前首页只有“3D打印钢柱抗震性能试验启动”这一条新闻。
  3. 加项目：research.html 里复制一整块 <article>...</article>；
     想在首页展示，再到 index.html 的 Featured projects 里复制一块。
  4. 换项目图片：把 16:9 的图片放进 images 文件夹，
     再把对应 <img src="images/project-1.svg"> 里的文件名改成你的图片名。
     文件名只用英文、数字和短横线，不要有空格和中文。
  5. 加论文：papers.html 里复制一整块 <li>...</li>。
  6. 放个人照片：见 people.html 里照片位置的注释。

五、改坏了怎么办
  最常见的问题是复制时少复制了结尾的 </li> 或 </article>。
  对照旁边完好的一块检查开头和结尾是否成对。
  GitHub 会保存每一次修改的历史，任何时候都可以找回之前的版本。
