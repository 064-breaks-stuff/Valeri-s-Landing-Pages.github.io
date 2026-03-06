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

// Phone tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'direct_call', { event_category: 'high_value', event_label: 'lp2_showroom_phone', value: 200 });
    }
  });
});

// Showroom request form
const visitForm = document.querySelector('.contact-form');
if (visitForm) {
  visitForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name   = this.querySelector('#name')?.value  || 'valued customer';
    const phone  = this.querySelector('#phone')?.value || '';
    const timing = this.querySelector('#timing')?.value || '';
    const btn    = this.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'Sending your request…';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Request Received';
      alert(`Thank you, ${name}.\n\nOne of our team will call ${phone} to confirm your visit${timing ? ' for ' + timing : ''}.\n\n📍 5421 N Richmond St, Appleton, WI\n🕒 Mon–Sat · 10AM–7PM\n📞 (920) 882-0808\n\nWe look forward to welcoming you.`);
      this.reset();
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 2500);
      if (typeof gtag !== 'undefined') {
        gtag('event', 'showroom_request', { event_category: 'conversion', event_label: 'lp2_established_homeowner', value: 200 });
      }
    }, 1800);
  });
}

// ---- Testimonial slider: one card at a time ----
(function () {
  const slider  = document.getElementById('lp2Slider');
  const btnPrev = document.getElementById('lp2Prev');
  const btnNext = document.getElementById('lp2Next');
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
    }, 7500); // slower pace for LP2
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  function restartAuto() {
    stopAuto();
    setTimeout(startAuto, 10000); // longer restart delay for LP2
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
