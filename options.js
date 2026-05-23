const input = document.getElementById('seekStep');
const saveBtn = document.getElementById('save');
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const presets = document.querySelectorAll('.preset');

const STEP = 0.5;
const MIN = 0.5;
const MAX = 600;

function clamp(v) {
    if (isNaN(v)) return MIN;
    return Math.max(MIN, Math.min(MAX, v));
}

function syncPresets() {
    const v = parseFloat(input.value);
    presets.forEach(p => {
        p.classList.toggle('active', parseFloat(p.dataset.val) === v);
    });
}

function setValue(v) {
    input.value = clamp(v);
    syncPresets();
}

// 初始化读取设置
chrome.storage.sync.get({ customSeekStep: 2 }, (items) => {
    setValue(items.customSeekStep);
});

// 加减按钮
minusBtn.addEventListener('click', () => {
    setValue(parseFloat(input.value || 0) - STEP);
});
plusBtn.addEventListener('click', () => {
    setValue(parseFloat(input.value || 0) + STEP);
});

// 预设按钮
presets.forEach(p => {
    p.addEventListener('click', () => {
        setValue(parseFloat(p.dataset.val));
    });
});

// 输入框变化
input.addEventListener('input', syncPresets);
input.addEventListener('blur', () => setValue(parseFloat(input.value)));

// 保存
saveBtn.addEventListener('click', () => {
    const step = clamp(parseFloat(input.value));
    chrome.storage.sync.set({ customSeekStep: step }, () => {
        const original = saveBtn.textContent;
        saveBtn.textContent = '✓ 已保存';
        saveBtn.classList.add('saved');
        setTimeout(() => {
            saveBtn.textContent = original;
            saveBtn.classList.remove('saved');
        }, 1200);
    });
});

// 回车保存
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveBtn.click();
});
