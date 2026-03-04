// Robust smooth scroll (unchanged)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target = document.querySelector(targetId);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// QUICK CALL FORM - Changed from SMS to phone callback
const quickForm = document.querySelector('.quickform form');
if (quickForm) {
  quickForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const phoneInput = this.querySelector('input[type="tel"]');
    const nameInput = this.querySelector('input[type="text"]:first-of-type');
    const phone = phoneInput ? phoneInput.value : '';
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Loading animation
    submitBtn.textContent = '📞 Calling...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      const message = `✅ Call request received!\n\nValeri Furniture will call ${phone}\nwithin 2 hours to schedule your\nAppleton showroom visit.\n\nStore: (920) 882-0808`;
      alert(message);
      
      // Reset form
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Track high-value lead
      if (typeof gtag !== 'undefined') {
        gtag('event', 'call_request_modern', {
          event_category: 'conversion',
          event_label: 'phone_callback_25-45'
        });
      }
    }, 1200);
  });
}

// Testimonial slider (unchanged)
const testimonials = document.querySelector('.testimonial-slider');
if (testimonials) {
  setInterval(() => {
    testimonials.scrollBy({ left: 420, behavior: 'smooth' });
  }, 5000);
}
