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

// Testimonial slider — FIX: loops cleanly, pauses on hover
const slider = document.querySelector('.testimonial-slider');
if (slider) {
  let paused = false;
  slider.addEventListener('mouseenter', () => paused = true);
  slider.addEventListener('mouseleave', () => paused = false);
  slider.addEventListener('touchstart', () => paused = true, { passive: true });
  slider.addEventListener('touchend', () => paused = false, { passive: true });

  setInterval(() => {
    if (paused) return;
    const atEnd = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 10;
    slider.scrollTo({
      left: atEnd ? 0 : slider.scrollLeft + 420,
      behavior: 'smooth'
    });
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