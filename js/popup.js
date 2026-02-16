(function () {
  var STORAGE_KEY = 'wpp_popup_closed';
  var DELAY_MS = 0; // Produção: 5000

  var overlay = document.getElementById('wppPopup');
  var fab = document.getElementById('wppFab');

  // Se já fechou antes, mostra direto o botão flutuante
  if (localStorage.getItem(STORAGE_KEY)) {
    fab.classList.add('visible');
    return;
  }

  // Mostra o popup após o delay
  setTimeout(function () {
    overlay.classList.add('active');
  }, DELAY_MS);

  function closePopup() {
    overlay.classList.remove('active');
    localStorage.setItem(STORAGE_KEY, '1');
    // Mostra o botão flutuante após a animação de fechar
    setTimeout(function () {
      fab.classList.add('visible');
    }, 400);
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
