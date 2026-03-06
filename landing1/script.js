// Smooth scroll — header-offset aware
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// Call-back form
const quickForm = document.querySelector('.quickform form');
if (quickForm) {
  quickForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const phone = this.querySelector('input[type="tel"]')?.value || '';
    const name  = this.querySelector('input[type="text"]')?.value || '';
    const btn   = this.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = '📞 Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✅ Request Received!';
      alert(`✅ Thanks, ${name}!\n\nValeri Furniture will call ${phone} within 2 hours.\n\n📍 5421 N Richmond St, Appleton, WI\n🕒 Mon–Sat 10AM–7PM\n📞 (920) 882-0808`);
      this.reset();
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 2000);
      if (typeof gtag !== 'undefined') {
        gtag('event', 'call_request', { event_category: 'conversion', event_label: 'lp1_modern_professional' });
      }
    }, 1000);
  });
}

// Phone tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'phone_call', { event_category: 'conversion', event_label: 'lp1_direct_call' });
    }
  });
});

// ---- Testimonial slider: one card at a time ----
(function () {
  const slider  = document.getElementById('lp1Slider');
  const btnPrev = document.getElementById('lp1Prev');
  const btnNext = document.getElementById('lp1Next');
  if (!slider || !btnPrev || !btnNext) return;

  const cards = Array.from(slider.querySelectorAll('.testimonial'));
  let current = 0;
  let autoTimer = null;

  // Build dot indicators
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'slider-dots';
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });
  slider.parentElement.insertAdjacentElement('afterend', dotsContainer);

  function goTo(index) {
    current = Math.max(0, Math.min(index, cards.length - 1));
    const cardWidth = slider.offsetWidth;
    slider.scrollTo({ left: cardWidth * current, behavior: 'smooth' });
    updateUI();
  }

  function updateUI() {
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === cards.length - 1;
    dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => {
      goTo(current < cards.length - 1 ? current + 1 : 0);
    }, 5000);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  function restartAuto() {
    stopAuto();
    setTimeout(startAuto, 8000); // restart after 8s of no interaction
  }

  btnPrev.addEventListener('click', () => { goTo(current - 1); restartAuto(); });
  btnNext.addEventListener('click', () => { goTo(current + 1); restartAuto(); });

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
  slider.addEventListener('touchstart', stopAuto,  { passive: true });
  slider.addEventListener('touchend',   startAuto, { passive: true });

  updateUI();
  startAuto();
})();
