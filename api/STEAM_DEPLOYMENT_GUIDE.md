# 🚀 Steam Integration - Vercel Serverless Function 部署指南

## 📦 方案优势
✅ **不依赖第三方CORS代理** - 100%可靠
✅ **API Key 更安全** - 存储在环境变量中
✅ **不会被限流** - 使用自己的服务器
✅ **完全免费** - Vercel 免费套餐足够使用

---

## 📁 文件结构

你的项目应该有这个结构：

```
portfolio/
├── api/
│   └── steam.js          ← Vercel Serverless Function
├── index.html            ← 你的主页面（需要更新JavaScript部分）
└── images/
    └── ...
```

---

## 🔧 部署步骤

### 第1步：创建 api 文件夹

在你的项目根目录创建 `api` 文件夹，把 `steam-api-proxy.js` 文件放进去，重命名为 `steam.js`

```
portfolio/
└── api/
    └── steam.js    ← 这个文件
```

### 第2步：更新 index.html

在你的 `index.html` 文件末尾，找到 Steam API 的 `<script>` 部分，替换为新版本的代码（使用本地 /api/steam endpoint）

### 第3步：提交到 GitHub

```bash
# 使用 GitHub Desktop：
1. 添加 api/steam.js 文件
2. 更新 index.html
3. Commit: "Add Vercel serverless function for Steam API"
4. Push to GitHub
```

### 第4步：Vercel 自动部署

- Vercel 会自动检测到 `api/` 文件夹
- 自动部署 Serverless Functions
- 约30秒完成

### 第5步：（可选）设置环境变量

在 Vercel Dashboard:
1. 进入你的项目
2. Settings → Environment Variables
3. 添加：
   - `STEAM_API_KEY` = `你的Steam API Key`
   - `STEAM_ID` = `76561198313678147`

**注意：** 如果不设置，会使用代码中的默认值（已经写好了你的ID和Key）

---

## ✅ 测试

部署完成后访问：
- `https://jingyufu.org/api/steam?endpoint=profile`
- 应该返回 JSON 数据

然后访问你的主页，Steam 部分应该正常加载了！

---

## 🐛 故障排除

### 问题1：API返回404
- 确认 `api/steam.js` 文件在正确位置
- 等待Vercel重新部署（约30秒）

### 问题2：API返回500
- 检查 Vercel Logs（Dashboard → Functions → 查看日志）
- Steam API Key 可能有问题

### 问题3：前端还是显示错误
- 清除浏览器缓存
- 确认 index.html 中的JavaScript使用了 `/api/steam` endpoint

---

## 📊 API Endpoints

你的API支持4个endpoints：

- `/api/steam?endpoint=profile` - 获取个人信息
- `/api/steam?endpoint=level` - 获取等级
- `/api/steam?endpoint=games` - 获取所有游戏
- `/api/steam?endpoint=recent` - 获取最近游玩游戏

---

## 🎉 完成！

部署后你的Steam integration应该完美工作，不会再有CORS问题了！
