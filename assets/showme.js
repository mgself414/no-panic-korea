// Show-Me mode — tap 📢 on a survival word to show it fullscreen for staff/screens.
// Progressive enhancement: without this file every page is still 100% readable.
(function () {
  'use strict';
  var dlg = document.getElementById('showme');
  if (!dlg || !dlg.showModal) return;
  var elKo = dlg.querySelector('.sm-ko');
  var elSub = dlg.querySelector('.sm-sub');
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('button.sm');
    if (btn) {
      elKo.textContent = btn.dataset.ko || '';
      elSub.textContent = btn.dataset.sub || '';
      dlg.showModal();
      return;
    }
    if (e.target === dlg || e.target.closest('#showme')) dlg.close();
  });
})();
