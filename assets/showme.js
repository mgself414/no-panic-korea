// Show-Me mode — tap 📢 on a survival word to show it fullscreen for staff/screens.
// Progressive enhancement: without this file every page is still 100% readable.
(function () {
  'use strict';
  var dlg = document.getElementById('showme');
  if (!dlg || !dlg.showModal) return;
  var elKo = dlg.querySelector('.sm-ko');
  var elSub = dlg.querySelector('.sm-sub');
  var elCopy = dlg.querySelector('.sm-copy');
  var timer;
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('button.sm');
    if (btn) {
      elKo.textContent = btn.dataset.ko || '';
      elSub.textContent = btn.dataset.sub || '';
      if (elCopy) elCopy.textContent = elCopy.dataset.copy;
      dlg.showModal();
      return;
    }
    // 복사는 닫기 분기보다 먼저 — 아래 핸들러가 다이얼로그 안의 클릭을 전부 닫기로 받는다.
    var copy = e.target.closest('.sm-copy');
    if (copy) {
      e.stopPropagation();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(elKo.textContent).then(function () {
          copy.textContent = copy.dataset.done;
          clearTimeout(timer);
          timer = setTimeout(function () { copy.textContent = copy.dataset.copy; }, 1600);
        }).catch(function () { /* 권한·비보안 컨텍스트 — 조용히 무시 */ });
      }
      return;
    }
    if (e.target === dlg || e.target.closest('#showme')) dlg.close();
  });
})();
