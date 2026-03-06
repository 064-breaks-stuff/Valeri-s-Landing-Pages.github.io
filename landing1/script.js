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
    const name = this.querySelector('input[type="text"]')?.value || '';
    const btn = this.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = '📞 Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✅ Request Received!';
      alert(
        `✅ Thanks, ${name}!\n\nValeri Furniture will call ${phone} within 2 hours.\n\n📍 5421 N Richmond St, Appleton, WI\n🕒 Mon–Sat 10AM–7PM\n📞 (920) 882-0808`
      );
      this.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 2000);

      if (typeof gtag !== 'undefined') {
        gtag('event', 'call_request', {
          event_category: 'conversion',
          event_label: 'lp1_modern_professional'
        });
      }
    }, 1000);
  });
}

// LP1 — Testimonial slider with arrow buttons
const lp1Slider = document.getElementById('lp1Slider');
const lp1Prev   = document.getElementById('lp1Prev');
const lp1Next   = document.getElementById('lp1Next');

if (lp1Slider && lp1Prev && lp1Next) {
  const STEP = 420; // px per scroll — matches card width + gap
  let paused = false;

  // Arrow clicks
  lp1Prev.addEventListener('click', () => {
    lp1Slider.scrollBy({ left: -STEP, behavior: 'smooth' });
  });
  lp1Next.addEventListener('click', () => {
    lp1Slider.scrollBy({ left: STEP, behavior: 'smooth' });
  });

  // Pause auto-scroll on interaction
  lp1Slider.addEventListener('mouseenter', () => paused = true);
  lp1Slider.addEventListener('mouseleave', () => paused = false);
  lp1Slider.addEventListener('touchstart',  () => paused = true,  { passive: true });
  lp1Slider.addEventListener('touchend',    () => paused = false, { passive: true });
  lp1Prev.addEventListener('click', () => { paused = true; setTimeout(() => paused = false, 6000); });
  lp1Next.addEventListener('click', () => { paused = true; setTimeout(() => paused = false, 6000); });

  // Update arrow disabled state
  function updateLp1Arrows() {
    lp1Prev.disabled = lp1Slider.scrollLeft <= 5;
    lp1Next.disabled = lp1Slider.scrollLeft >= lp1Slider.scrollWidth - lp1Slider.clientWidth - 5;
  }
  lp1Slider.addEventListener('scroll', updateLp1Arrows);
  updateLp1Arrows(); // set initial state

  // Auto-scroll with clean loop
  setInterval(() => {
    if (paused) return;
    const atEnd = lp1Slider.scrollLeft >= lp1Slider.scrollWidth - lp1Slider.clientWidth - 10;
    lp1Slider.scrollTo({ left: atEnd ? 0 : lp1Slider.scrollLeft + STEP, behavior: 'smooth' });
    updateLp1Arrows();
  }, 5000);
}

// Phone click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'phone_call', {
        event_category: 'conversion',
        event_label: 'lp1_direct_call'
      });
    }
  });
});