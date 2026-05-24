// 检测当前平台，选取对应的 storage key
const STORAGE_KEY = location.hostname.includes('bilibili.com') ? 'biliSeekStep' : 'ytSeekStep';

let seekStep = 2;

// 读取当前平台的设置
chrome.storage.sync.get({ ytSeekStep: 2, biliSeekStep: 2 }, (items) => {
    seekStep = items[STORAGE_KEY];
});

// 实时同步：用户在弹窗修改后立即生效，无需刷新页面
chrome.storage.onChanged.addListener((changes) => {
    if (changes[STORAGE_KEY]) {
        seekStep = changes[STORAGE_KEY].newValue;
    }
});

document.addEventListener('keydown', function(event) {
    const isLeft  = event.key === 'ArrowLeft';
    const isRight = event.key === 'ArrowRight';

    if (!isLeft && !isRight) return;

    // 输入框内不拦截（兼容 B站弹幕框 contentEditable）
    const activeElem = document.activeElement;
    if (activeElem.tagName === 'INPUT' || activeElem.tagName === 'TEXTAREA' || activeElem.isContentEditable) {
        return;
    }

    event.stopImmediatePropagation();
    event.preventDefault();

    // 优先选取正在播放的 video（兼容 B站多 video 并存的情况）
    const video = [...document.querySelectorAll('video')]
        .find(v => !v.paused && v.readyState > 0)
        ?? document.querySelector('video');

    if (video) {
        video.currentTime += isRight ? seekStep : -seekStep;
    }
}, true);
