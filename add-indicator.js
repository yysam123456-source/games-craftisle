// add-indicator.js
// 给全部10个游戏添加"收到操作就闪绿光"的可见指示器
const fs = require('fs');
const path = require('path');

const games = [
  '2048',
  'tetris',
  'snake',
  'sudoku',
  'minesweeper',
  'chess',
  'flappy-wings',
  'slope',
  'infinite-craft',
  'password-game'
];

const indicatorCode = `
// ===== 游戏操作指示器 =====
(function addIndicator() {
  if (window.__indicatorAdded) return;
  window.__indicatorAdded = true;

  // 注入 CSS 动画
  const style = document.createElement('style');
  style.textContent = \`
    @keyframes __indicatorFlash {
      0%   { box-shadow: inset 0 0 0 9999px rgba(0,255,0,0.6); }
      100% { box-shadow: none; }
    }
    .__indicator-flash {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 99999;
      animation: __indicatorFlash 0.4s ease-out;
    }
  \`;
  document.head.appendChild(style);

  // 收到任何操作时闪绿光
  function flashIndicator() {
    const d = document.createElement('div');
    d.className = '__indicator-flash';
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 500);
  }

  // 监听所有操作事件
  document.addEventListener('keydown', flashIndicator, true);
  document.addEventListener('mousedown', flashIndicator, true);
  document.addEventListener('touchstart', flashIndicator, true);

  // 覆盖 window 关键函数，确保指示器一定触发
  if (typeof move === 'function') {
    const _origMove = move;
    window.move = function() { flashIndicator(); return _origMove.apply(this, arguments); };
  }
  if (typeof init === 'function') {
    const _origInit = init;
    window.init = function() { flashIndicator(); return _origInit.apply(this, arguments); };
  }

  console.log('✅ 游戏操作指示器已加载');
})();
`;

games.forEach(slug => {
  const filePath = path.join('public', 'games', slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.log('❌ 文件不存在:', filePath);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // 避免重复添加
  if (html.includes('__indicatorAdded')) {
    console.log('⏭', slug, '已有指示器，跳过');
    return;
  }

  // 在最后一个 </script> 前插入指示器代码
  const lastScriptEnd = html.lastIndexOf('</script>');
  if (lastScriptEnd < 0) {
    console.log('❌', slug, '未找到 </script>，跳过');
    return;
  }

  html = html.slice(0, lastScriptEnd) + indicatorCode + '\\n' + html.slice(lastScriptEnd);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✅', slug, '指示器已添加');
});

console.log('\\n完成！全部10个游戏的指示器已添加。');
