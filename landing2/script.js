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

// Testimonial slider — slow pace, clean loop, pauses on hover & touch
const slider = document.querySelector('.testimonial-slider');
if (slider) {
  let paused = false;
  slider.addEventListener('mouseenter', () => paused = true);
  slider.addEventListener('mouseleave', () => paused = false);
  slider.addEventListener('touchstart',  () => paused = true,  { passive: true });
  slider.addEventListener('touchend',    () => paused = false, { passive: true });

  setInterval(() => {
    if (paused) return;
    const atEnd = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 10;
    slider.scrollTo({
      left: atEnd ? 0 : slider.scrollLeft + 440,
      behavior: 'smooth'
    });
  }, 7500);   // slower pace — respects deliberate 45+ reader
}