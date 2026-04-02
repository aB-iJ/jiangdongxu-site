# 蒋东旭的个人网站

K线主题 + 个人博客系统，基于 Hugo 构建。

## 特性

✨ **视觉设计**
- 深色极简主题（#050508 背景）
- 实时 K 线仪表盘（中证500/纳斯达克模拟）
- 青色主题色 (#00f2ff) + 渐变特效
- 响应式布局

📝 **博客功能**
- 文章搜索
- 标签筛选
- 侧边目录 (TOC)
- 代码高亮 + 复制按钮
- 图片 Lightbox
- 评论系统（GitHub Utterances）

🎬 **交互**
- 页面切换动画
- 传送门悬浮菜单
- K 线动画背景
- 打字机标题效果

## 快速开始

### 前置要求
- Hugo (Extended) >= 0.100

### 本地开发

```bash
# 安装 Hugo（如果还没装）
brew install hugo

# 进入项目目录
cd jiangdongxu-site

# 本地预览（草稿也显示）
hugo server -D

# 浏览器打开
# http://localhost:1313
```

### 构建静态网站

```bash
# 生成优化后的静态文件
hugo --minify

# 输出到 public/ 文件夹
```

## 文件结构

```
.
├── hugo.toml              # Hugo 配置
├── assets/
│   ├── css/main.css       # 所有样式
│   └── js/kline-bg.js    # K线动画
├── layouts/
│   ├── _default/
│   │   ├── baseof.html   # 基础模板
│   │   ├── single.html   # 文章详情
│   │   └── list.html     # 文章列表
│   └── index.html        # 首页
└── content/
    └── posts/
        ├── _index.md     # 列表页元数据
        └── example.md    # 示例文章
```

## 添加文章

在 `content/posts/` 下创建新的 `.md` 文件：

```markdown
+++
title = "我的新文章"
date = 2026-04-02
lastmod = 2026-04-02
tags = ["标签1", "标签2"]
+++

## 文章标题

你的 Markdown 内容...

### 代码示例

\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`
```

然后重新构建：
```bash
hugo --minify
```

## 自定义配置

编辑 `hugo.toml` 修改：
- `baseURL` - 你的网站地址
- `title` - 网站标题
- `params.subtitle` - 副标题
- `params.github` - GitHub 用户名
- `params.qq` - QQ 号
- `params.wechat` - 微信 ID
- `params.email` - 邮箱

## 修改颜色主题

编辑 `assets/css/main.css` 中的 CSS 变量：

```css
:root {
    --bg-color: #050508;      /* 背景色 */
    --accent-color: #00f2ff;  /* 强调色（青色） */
    --up-color: #f6465d;      /* K线上升色 */
    --down-color: #0ecb81;    /* K线下降色 */
}
```

## 部署

### GitHub Pages

1. 创建 GitHub 仓库 `aB-iJ/aB-iJ.github.io`
2. 推送到 GitHub
3. 在 `Settings > Pages` 设置 `public/` 为源
4. 自动部署到 `https://aB-iJ.github.io`

### 自定义域名

1. 在 DNS 配置指向 GitHub Pages
2. 在 `static/CNAME` 添加：
   ```
   jiangdongxu.online
   ```
3. 在 GitHub Pages 设置自定义域名

### 使用李桂聿的服务

如果用他的内网穿透方案，参考他的 `code.jiangdongxu.online` 设置。

## 注意事项

- 评论系统需要 GitHub 账号登录
- K 线数据是模拟的，可在 `assets/js/kline-bg.js` 修改
- 第一次构建需要下载 KaTeX CDN 资源（需要网络）

## 后续优化建议

- [ ] 集成真实的行情数据 API
- [ ] 添加暗黑/亮色切换
- [ ] 文章分类导航
- [ ] 订阅功能
- [ ] 统计分析
- [ ] 搜索索引优化

---

**Made with ❤️ by 董学九**

有问题问我！
