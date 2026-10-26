/* ============================================================
   MOBILE HARDENING
   ============================================================ */

// 1. Prevent pull-to-refresh & bounce on iOS
document.addEventListener('touchmove', e => {
  if (G.state === 'playing') e.preventDefault();
}, { passive: false });

// 2. Prevent context menu (long press)
window.addEventListener('contextmenu', e => e.preventDefault());

// 3. Prevent double-tap zoom (iOS)
let lastTap = 0;
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - lastTap < 320) e.preventDefault();
  lastTap = now;
}, { passive: false });

// 4. Auto-pause when tab/app backgrounded
document.addEventListener('visibilitychange', () => {
  if (document.hidden && G.state === 'playing') togglePause();
});

// 5. Reset virtual stick on resize/orientation change
function resetStick() {
  stick.active = false;
  stick.id = null;
  stick.dx = stick.dy = 0;
  UI.stick.style.display = 'none';
}
const _origResize = resize;
resize = function () {
  _origResize();
  resetStick();
};
window.addEventListener('resize', resize);

// 6. Pause button
document.getElementById('pauseBtn').addEventListener('click', () => {
  if (G.state === 'playing' || G.state === 'paused') togglePause();
});

// 7. Show touch controls on any real touch (covers hybrid devices)
window.addEventListener('touchstart', () => {
  UI.dashBtn.classList.remove('hidden');
}, { once: true, passive: true });
