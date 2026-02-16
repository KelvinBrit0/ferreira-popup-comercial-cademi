(function () {
  var STORAGE_KEY = 'wpp_popup_closed';
  var DELAY_MS = 0; // Produção: 5000

  var overlay = document.getElementById('wppPopup');
  var fab = document.getElementById('wppFab');

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
    // Animação de encolher pro canto
    overlay.classList.add('shrink-to-corner');
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
