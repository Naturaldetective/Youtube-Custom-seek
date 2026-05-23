# YouTube Custom Seek

A lightweight Chrome extension that lets you customize how many seconds the left/right arrow keys seek in YouTube videos.

## Features

- **Custom seek duration** — set any value from 0.5s to 600s (default: 2s)
- **Preset buttons** — quickly select 1s / 2s / 5s / 10s with one click
- **Real-time sync** — settings take effect instantly without reloading the page
- **Clean popup UI** — minimal interface that matches YouTube's style

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the project folder
5. The extension icon will appear in your toolbar

## Usage

1. Click the extension icon on any YouTube page
2. Set your desired seek duration using the input field, `−` / `+` buttons, or preset shortcuts
3. Click **保存设置** (Save) — settings sync across your Chrome profile automatically
4. Use `←` / `→` arrow keys to seek in YouTube videos

## File Structure

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

## How It Works

- `content.js` intercepts `keydown` events at the capture phase and overrides YouTube's native 5-second seek behavior with your custom value
- Settings are stored via `chrome.storage.sync` so they persist across devices signed into the same Chrome account
- The popup listens for storage changes and updates the active tab's seek step without a page refresh

## Requirements

- Google Chrome (or any Chromium-based browser)
- Manifest V3 support (Chrome 88+)

## License

MIT
