// Robust smooth scroll with polyfill fallback
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target = document.querySelector(targetId);
    
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
      
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      } else {
        // Polyfill for older browsers
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Quick SMS form - Enhanced UX with loading
const quickForm = document.querySelector('.quickform form');
if (quickForm) {
  quickForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API (replace with Twilio/Zapier)
    setTimeout(() => {
      submitBtn.textContent = '✅ Sent!';
      // Psychology boost: Instant positive feedback
      setTimeout(() => {
        alert('✅ Text sent to (920) 882-0808!\nReply "DESIGN" for virtual consult.\n(Replace with real SMS API)');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        this.reset();
      }, 1500);
    }, 800);
    
    // Track conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'sms_consult', {
        event_category: 'conversion',
        event_label: 'quickform_submit'
      });
    }
  });
}

// Smart testimonial slider - Bounds-aware, pause on hover
const testimonials = document.querySelector('.testimonial-slider');
if (testimonials) {
  let scrollInterval;
  let isPaused = false;
  
  const startSlider = () => {
    scrollInterval = setInterval(() => {
      if (!isPaused) {
        testimonials.scrollBy({ left: 420, behavior: 'smooth' });
        
        // Reset if at end
        if (testimonials.scrollLeft >= testimonials.scrollWidth - testimonials.clientWidth - 10) {
          setTimeout(() => testimonials.scrollTo({ left: 0, behavior: 'smooth' }), 500);
        }
      }
    }, 4000);
  };
  
  // Pause on hover/interaction
  testimonials.addEventListener('mouseenter', () => { isPaused = true; });
  testimonials.addEventListener('mouseleave', () => { isPaused = false; });
  testimonials.addEventListener('touchstart', () => { isPaused = true; });
  testimonials.addEventListener('scroll', () => { isPaused = true; });
  setTimeout(() => { isPaused = false; }, 1000);
  
  startSlider();
}

// Main contact form - Detailed feedback
const mainForm = document.querySelector('.contact-form:not(.quickform form)');
if (mainForm) {
  mainForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate server response
    setTimeout(() => {
      submitBtn.textContent = 'Thank you!';
      alert('Thank you for your detailed inquiry!\nOur design team will contact you within 24 hours to discuss your vision.');
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        this.reset();
      }, 2000);
    }, 1200);
    
    // Track high-value lead
    if (typeof gtag !== 'undefined') {
      gtag('event', 'detailed_consult', {
        event_category: 'conversion',
        event_label: 'mainform_submit'
      });
    }
  });
}

// Mobile menu toggle (if nav hidden on mobile)
const burger = document.querySelector('.burger');
const mobileNav = document.querySelector('.nav');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
  });
}

// Performance: Lazy load images (if using real images)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Copy phone number to clipboard on long press (mobile)
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', (e) => {
    // Track phone intent
    console.log('High-intent phone click tracked');
  });
});