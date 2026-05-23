<div align="center">

# YouTube Custom Seek

**Language / 语言：** [English](#english) · [中文](#中文)

</div>

---

## English

A lightweight Chrome extension that lets you customize how many seconds the left/right arrow keys seek in YouTube videos.

### Features

- **Custom seek duration** — set any value from 0.5 s to 600 s (default: 2 s)
- **Preset buttons** — quickly select 1 s / 2 s / 5 s / 10 s with one click
- **Real-time sync** — settings take effect instantly without reloading the page
- **Clean popup UI** — minimal interface that matches YouTube's style

### Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the project folder
5. The extension icon will appear in your toolbar

### Usage

1. Click the extension icon on any YouTube page
2. Set your desired seek duration using the input field, `−` / `+` buttons, or preset shortcuts
3. Click **Save** — settings sync across your Chrome profile automatically
4. Use `←` / `→` arrow keys to seek in YouTube videos

### File Structure

```
youtube-seek/
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── content.js       # Injected into YouTube pages; handles keydown events
├── manifest.json    # Extension manifest (Manifest V3)
├── options.html     # Popup UI
└── options.js       # Popup logic & Chrome storage sync
```

### How It Works

- `content.js` intercepts `keydown` events at the capture phase and overrides YouTube's native 5-second seek behavior with your custom value
- Settings are stored via `chrome.storage.sync` so they persist across devices signed into the same Chrome account
- The popup listens for storage changes and updates the active tab's seek step without a page refresh

### Requirements

- Google Chrome (or any Chromium-based browser)
- Manifest V3 support (Chrome 88+)

### License

MIT

---

## 中文

一个轻量级 Chrome 扩展，让你自定义 YouTube 视频中左右方向键的跳转秒数。

### 功能特性

- **自定义跳转秒数** — 可设置 0.5 秒到 600 秒之间的任意值（默认 2 秒）
- **快捷预设按钮** — 一键选择 1s / 2s / 5s / 10s
- **实时生效** — 保存后无需刷新页面，立即生效
- **简洁弹窗界面** — 简约 UI 风格，与 YouTube 保持一致

### 安装方法

1. 克隆或下载本仓库
2. 打开 Chrome，进入 `chrome://extensions/`
3. 开启右上角的**开发者模式**
4. 点击**加载已解压的扩展程序**，选择项目文件夹
5. 扩展图标将出现在工具栏中

### 使用方式

1. 在任意 YouTube 页面点击扩展图标
2. 通过输入框、`−` / `+` 按钮或预设快捷键设置跳转秒数
3. 点击**保存设置** — 设置会自动同步到你的 Chrome 账号
4. 使用键盘 `←` / `→` 方向键快速跳转视频

### 文件结构

```
youtube-seek/
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── content.js       # 注入 YouTube 页面，处理键盘事件
├── manifest.json    # 扩展清单（Manifest V3）
├── options.html     # 弹窗界面
└── options.js       # 弹窗逻辑与 Chrome 存储同步
```

### 工作原理

- `content.js` 在捕获阶段拦截 `keydown` 事件，将 YouTube 原生的 5 秒跳转替换为你自定义的秒数
- 设置通过 `chrome.storage.sync` 存储，可在登录同一 Chrome 账号的设备间自动同步
- 弹窗监听存储变化，无需刷新页面即可实时更新当前标签页的跳转步长

### 环境要求

- Google Chrome 或任意基于 Chromium 的浏览器
- 支持 Manifest V3（Chrome 88+）

### 开源协议

MIT
