<div align="center">

# YouTube & Bilibili Custom Seek

**Language / 语言：** [English](#english) · [中文](#中文)

</div>

---

## English

A lightweight Chrome extension that lets you customize how many seconds the left/right arrow keys seek — with **independent settings for YouTube and Bilibili**.

### Features

- **Per-platform seek duration** — set different values for YouTube and Bilibili independently
- **Custom range** — any value from 0.5 s to 600 s (default: 2 s per platform)
- **Preset buttons** — quickly select 1 s / 2 s / 5 s / 10 s with one click
- **Real-time sync** — settings take effect instantly without reloading the page
- **Smart video selection** — correctly targets the active video even when multiple `<video>` elements exist (e.g. Bilibili ads)
- **Input-aware** — skips seek when focus is inside a text field or Bilibili's danmaku input

### Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the project folder
5. The extension icon will appear in your toolbar

### Usage

1. Click the extension icon on any YouTube or Bilibili page
2. Set seek durations separately for each platform using the input fields, `−` / `+` buttons, or preset shortcuts
3. Click **Save** — settings sync across your Chrome profile automatically
4. Use `←` / `→` arrow keys to seek in videos

> **Tip:** After updating the extension code, refresh any already-open tabs once to load the latest content script.

### File Structure

```
youtube-seek/
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── content.js       # Injected into YouTube & Bilibili pages; handles keydown events
├── manifest.json    # Extension manifest (Manifest V3)
├── options.html     # Popup UI with per-platform settings
└── options.js       # Popup logic & Chrome storage sync
```

### How It Works

- `content.js` detects the current hostname and reads the corresponding storage key (`ytSeekStep` or `biliSeekStep`)
- Keydown events are intercepted at the capture phase, overriding each platform's native seek behavior
- When multiple `<video>` elements are present, the script targets the one that is actively playing
- Settings are stored via `chrome.storage.sync`, synced across devices on the same Chrome account
- `chrome.storage.onChanged` listener ensures the seek step updates immediately whenever settings are saved — no page refresh needed

### Requirements

- Google Chrome (or any Chromium-based browser)
- Manifest V3 support (Chrome 88+)

### License

MIT

---

## 中文

一个轻量级 Chrome 扩展，让你分别为 YouTube 和哔哩哔哩自定义左右方向键的跳转秒数。

### 功能特性

- **双平台独立配置** — YouTube 和哔哩哔哩可以分别设置不同的跳转秒数
- **自定义范围** — 可设置 0.5 秒到 600 秒之间的任意值（每个平台默认 2 秒）
- **快捷预设按钮** — 一键选择 1s / 2s / 5s / 10s
- **实时生效** — 保存后无需刷新页面，立即生效
- **智能 video 选取** — 页面存在多个 `<video>` 时（如 B站广告）自动定位正在播放的那个
- **输入框感知** — 在文本框或 B站弹幕输入框内打字时不触发跳转

### 安装方法

1. 克隆或下载本仓库
2. 打开 Chrome，进入 `chrome://extensions/`
3. 开启右上角的**开发者模式**
4. 点击**加载已解压的扩展程序**，选择项目文件夹
5. 扩展图标将出现在工具栏中

### 使用方式

1. 在任意 YouTube 或哔哩哔哩页面点击扩展图标
2. 分别为两个平台设置跳转秒数（输入框、`−` / `+` 按钮或预设快捷键）
3. 点击**保存设置** — 设置会自动同步到你的 Chrome 账号
4. 使用键盘 `←` / `→` 方向键快速跳转视频

> **提示：** 更新扩展代码后，需要刷新一次已打开的标签页，以加载最新的内容脚本。之后在弹窗修改秒数则无需刷新。

### 文件结构

```
youtube-seek/
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── content.js       # 注入 YouTube / B站页面，处理键盘事件
├── manifest.json    # 扩展清单（Manifest V3）
├── options.html     # 弹窗界面（双平台独立设置）
└── options.js       # 弹窗逻辑与 Chrome 存储同步
```

### 工作原理

- `content.js` 通过 `location.hostname` 判断当前平台，读取对应的存储键（`ytSeekStep` 或 `biliSeekStep`）
- 在捕获阶段拦截 `keydown` 事件，覆盖各平台原生的跳转行为
- 页面存在多个 `<video>` 时，优先选取正在播放的那个，避免操作到广告或隐藏视频
- 设置通过 `chrome.storage.sync` 存储，在同一 Chrome 账号的设备间自动同步
- 通过 `chrome.storage.onChanged` 监听器实现保存后立即生效，无需刷新页面

### 环境要求

- Google Chrome 或任意基于 Chromium 的浏览器
- 支持 Manifest V3（Chrome 88+）

### 开源协议

MIT
