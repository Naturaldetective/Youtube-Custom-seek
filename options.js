const STEP = 0.5;
const MIN  = 0.5;
const MAX  = 600;

function clamp(v) {
    if (isNaN(v)) return MIN;
    return Math.max(MIN, Math.min(MAX, v));
}

/**
 * 为一个平台区块绑定交互逻辑
 * @returns {{ getValue, setValue }}
 */
function makeSection(inputId, minusId, plusId, presetSelector) {
    const input    = document.getElementById(inputId);
    const minusBtn = document.getElementById(minusId);
    const plusBtn  = document.getElementById(plusId);
    const presets  = document.querySelectorAll(presetSelector);

    function syncPresets() {
        const v = parseFloat(input.value);
        presets.forEach(p => p.classList.toggle('active', parseFloat(p.dataset.val) === v));
    }

    function setValue(v) {
        input.value = clamp(v);
        syncPresets();
    }

    minusBtn.addEventListener('click', () => setValue(parseFloat(input.value || 0) - STEP));
    plusBtn.addEventListener('click',  () => setValue(parseFloat(input.value || 0) + STEP));

    presets.forEach(p => p.addEventListener('click', () => setValue(parseFloat(p.dataset.val))));

    input.addEventListener('input', syncPresets);
    input.addEventListener('blur',  () => setValue(parseFloat(input.value)));
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveBtn.click(); });

    return {
        getValue: () => clamp(parseFloat(input.value)),
        setValue,
    };
}

const yt   = makeSection('ytSeekStep',   'ytMinus',   'ytPlus',   '.yt-preset');
const bili = makeSection('biliSeekStep', 'biliMinus', 'biliPlus', '.bili-preset');

// 初始化读取设置
chrome.storage.sync.get({ ytSeekStep: 2, biliSeekStep: 2 }, (items) => {
    yt.setValue(items.ytSeekStep);
    bili.setValue(items.biliSeekStep);
});

// 保存按钮
const saveBtn = document.getElementById('save');
saveBtn.addEventListener('click', () => {
    chrome.storage.sync.set({
        ytSeekStep:   yt.getValue(),
        biliSeekStep: bili.getValue(),
    }, () => {
        const original = saveBtn.textContent;
        saveBtn.textContent = '✓ 已保存';
        saveBtn.classList.add('saved');
        setTimeout(() => {
            saveBtn.textContent = original;
            saveBtn.classList.remove('saved');
        }, 1200);
    });
});
