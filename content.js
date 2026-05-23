let seekStep = 2; // 默认值

// 获取用户保存的设置
chrome.storage.sync.get({ customSeekStep: 2 }, (items) => {
    seekStep = items.customSeekStep;
});

// 如果用户在选项页改了时间，实时更新当前页面的变量
chrome.storage.onChanged.addListener((changes) => {
    if (changes.customSeekStep) {
        seekStep = changes.customSeekStep.newValue;
    }
});

document.addEventListener('keydown', function(event) {
    const isLeft = event.key === 'ArrowLeft';
    const isRight = event.key === 'ArrowRight';
    
    if (!isLeft && !isRight) return;

    const activeElem = document.activeElement;
    if (activeElem.tagName === 'INPUT' || activeElem.tagName === 'TEXTAREA' || activeElem.isContentEditable) {
        return;
    }

    // 拦截 YouTube 原生逻辑
    event.stopImmediatePropagation(); 
    event.preventDefault(); 

    const video = document.querySelector('video');
    if (video) {
        // 使用动态获取的 seekStep
        video.currentTime += isRight ? seekStep : -seekStep;
    }
}, true);
