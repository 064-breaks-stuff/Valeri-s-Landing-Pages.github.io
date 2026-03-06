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

// Phone tracking — highest value conversion event
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'direct_call', {
        event_category: 'high_value',
        event_label: 'lp2_showroom_phone',
        value: 200
      });
    }
  });
});

// Showroom request form
const visitForm = document.querySelector('.contact-form');
if (visitForm) {
  visitForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name     = this.querySelector('#name')?.value     || 'valued customer';
    const phone    = this.querySelector('#phone')?.value    || '';
    const interest = this.querySelector('#interest')?.value || '';
    const timing   = this.querySelector('#timing')?.value   || '';
    const btn      = this.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'Sending your request…';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Request Received';
      alert(
        `Thank you, ${name}.\n\nOne of our team will call ${phone} to confirm your visit${timing ? ' for ' + timing : ''}.\n\n📍 5421 N Richmond St, Appleton, WI\n🕒 Mon–Sat · 10AM–7PM\n📞 (920) 882-0808\n\nWe look forward to welcoming you.`
      );
      this.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 2500);

      if (typeof gtag !== 'undefined') {
        gtag('event', 'showroom_request', {
          event_category: 'conversion',
          event_label: 'lp2_established_homeowner',
          value: 200
        });
      }
    }, 1800);
  });
}

// LP2 — Testimonial slider with arrow buttons
const lp2Slider = document.getElementById('lp2Slider');
const lp2Prev   = document.getElementById('lp2Prev');
const lp2Next   = document.getElementById('lp2Next');

if (lp2Slider && lp2Prev && lp2Next) {
  const STEP = 460; // slightly wider cards on LP2
  let paused = false;

  // Arrow clicks
  lp2Prev.addEventListener('click', () => {
    lp2Slider.scrollBy({ left: -STEP, behavior: 'smooth' });
  });
  lp2Next.addEventListener('click', () => {
    lp2Slider.scrollBy({ left: STEP, behavior: 'smooth' });
  });

  // Pause auto-scroll on interaction
  lp2Slider.addEventListener('mouseenter', () => paused = true);
  lp2Slider.addEventListener('mouseleave', () => paused = false);
  lp2Slider.addEventListener('touchstart',  () => paused = true,  { passive: true });
  lp2Slider.addEventListener('touchend',    () => paused = false, { passive: true });
  lp2Prev.addEventListener('click', () => { paused = true; setTimeout(() => paused = false, 8000); });
  lp2Next.addEventListener('click', () => { paused = true; setTimeout(() => paused = false, 8000); });

  // Update arrow disabled state
  function updateLp2Arrows() {
    lp2Prev.disabled = lp2Slider.scrollLeft <= 5;
    lp2Next.disabled = lp2Slider.scrollLeft >= lp2Slider.scrollWidth - lp2Slider.clientWidth - 5;
  }
  lp2Slider.addEventListener('scroll', updateLp2Arrows);
  updateLp2Arrows(); // set initial state

  // Auto-scroll with clean loop — slower pace for LP2 audience
  setInterval(() => {
    if (paused) return;
    const atEnd = lp2Slider.scrollLeft >= lp2Slider.scrollWidth - lp2Slider.clientWidth - 10;
    lp2Slider.scrollTo({ left: atEnd ? 0 : lp2Slider.scrollLeft + STEP, behavior: 'smooth' });
    updateLp2Arrows();
  }, 7500);
}