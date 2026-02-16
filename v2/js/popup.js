(function () {
  var STORAGE_KEY = 'wpp_popup_closed';
  var DELAY_MS = 0; // Produção: 5000

  var overlay = document.getElementById('wppPopup');
  var fab = document.getElementById('wppFab');
  var popupCard = overlay.querySelector('.wpp-popup');

  // Se já fechou antes, mostra direto o botão flutuante
  // if (localStorage.getItem(STORAGE_KEY)) {
  //   fab.classList.add('visible');
  //   return;
  // }

  // Mostra o popup após o delay
  setTimeout(function () {
    overlay.classList.add('active');
  }, DELAY_MS);

  function closePopup() {
    // Calcula posição real do FAB e do popup
    var fabRect = fab.getBoundingClientRect();
    var popupRect = popupCard.getBoundingClientRect();

    var fabCenterX = fabRect.left + fabRect.width / 2;
    var fabCenterY = fabRect.top + fabRect.height / 2;
    var popupCenterX = popupRect.left + popupRect.width / 2;
    var popupCenterY = popupRect.top + popupRect.height / 2;

    var dx = fabCenterX - popupCenterX;
    var dy = fabCenterY - popupCenterY;

    // Anima o popup em direção ao FAB
    popupCard.style.transition = 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease 0.45s, border-radius 0.4s ease';
    popupCard.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(0.05)';
    popupCard.style.opacity = '0';
    popupCard.style.borderRadius = '50%';

    // Faz o fundo sumir
    overlay.classList.add('closing');
    overlay.classList.remove('active');

    localStorage.setItem(STORAGE_KEY, '1');

    // Após a animação, esconde o overlay e mostra o fab
    setTimeout(function () {
      overlay.style.display = 'none';
      fab.classList.add('visible');
    }, 700);
  }

  document.getElementById('wppClose').addEventListener('click', closePopup);
  document.getElementById('wppDismiss').addEventListener('click', closePopup);

  // Fecha ao clicar fora do card
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePopup();
  });

  // Fecha com ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });

  // Salva no localStorage ao clicar no CTA
  document.getElementById('wppCta').addEventListener('click', function () {
    localStorage.setItem(STORAGE_KEY, '1');
  });
})();
