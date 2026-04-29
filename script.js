// Timer sincronizado — atualiza todos os blocos de uma vez
function startTimer() {
  let total = 23 * 3600 + 59 * 60 + 58;

  const ids = [
    ['horas1','minutos1','segundos1'],
    ['horas2','minutos2','segundos2'],
  ];

  setInterval(() => {
    if (total <= 0) total = 24 * 3600;
    total--;
    const hh = String(Math.floor(total / 3600)).padStart(2,'0');
    const mm = String(Math.floor((total % 3600) / 60)).padStart(2,'0');
    const ss = String(total % 60).padStart(2,'0');
    ids.forEach(([h,m,s]) => {
      const he = document.getElementById(h);
      const me = document.getElementById(m);
      const se = document.getElementById(s);
      if (he) he.textContent = hh;
      if (me) me.textContent = mm;
      if (se) se.textContent = ss;
    });
  }, 1000);
}
startTimer();

// Carrossel de depoimentos
function initCarrossel() {
  const track = document.getElementById('carrosselTrack');
  const dots = document.querySelectorAll('.carrossel-dot');
  const total = dots.length;
  let atual = 0;
  let autoPlay;

  function irPara(index) {
    atual = (index + total) % total;
    track.style.transform = `translateX(-${atual * 100}%)`;
    dots.forEach(d => d.classList.remove('ativo'));
    dots[atual].classList.add('ativo');
  }

  function resetAuto() {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => irPara(atual + 1), 4000);
  }

  document.getElementById('carrosselPrev').addEventListener('click', () => { irPara(atual - 1); resetAuto(); });
  document.getElementById('carrosselNext').addEventListener('click', () => { irPara(atual + 1); resetAuto(); });
  dots.forEach(d => d.addEventListener('click', () => { irPara(Number(d.dataset.index)); resetAuto(); }));

  // swipe touch
  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { irPara(diff > 0 ? atual + 1 : atual - 1); resetAuto(); }
  }, { passive: true });

  resetAuto();
}
initCarrossel();

// FAQ acordeão
document.querySelectorAll('.faq-pergunta').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const aberto = item.classList.contains('aberto');
    document.querySelectorAll('.faq-item.aberto').forEach(i => {
      i.classList.remove('aberto');
      i.querySelector('.faq-pergunta').setAttribute('aria-expanded', 'false');
    });
    if (!aberto) {
      item.classList.add('aberto');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
