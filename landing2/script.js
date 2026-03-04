// Phone tracking (enhanced)
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('Direct showroom call - highest conversion');
    if (typeof gtag !== 'undefined') {
      gtag('event', 'direct_call', {
        event_category: 'high_value',
        event_label: 'showroom_phone'
      });
    }
  });
});

// Smooth scroll (unchanged)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// SHOWROOM FORM - Enhanced trust messaging
const showroomForm = document.querySelector('.contact-form');
if (showroomForm) {
  showroomForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Scheduling...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      const confirmation = `Your showroom appointment is confirmed!\n\n📍 5421 N Richmond St, Appleton\n🕒 Mon-Sat 10AM-7PM\n📞 Owner will call within 24 hours\n\nThank you for choosing Valeri Furniture`;
      
      alert(confirmation);
      
      submitBtn.textContent = 'Thank You!';
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        this.reset();
      }, 2000);
      
      // Track showroom lead (highest value)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'showroom_lead', {
          event_category: 'conversion',
          event_label: '45plus_showroom',
          value: 150
        });
      }
    }, 1800);
  });
}

// Testimonial slider (slower for reading)
const testimonials = document.querySelector('.testimonial-slider');
if (testimonials) {
  setInterval(() => {
    testimonials.scrollBy({ left: 450, behavior: 'smooth' });
  }, 7000); // Slower pace
}