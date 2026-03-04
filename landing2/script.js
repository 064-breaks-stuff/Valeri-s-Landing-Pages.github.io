// Phone click tracking - Enhanced for high-value Boomer leads
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', (e) => {
    // Prevent accidental scrolls
    e.stopPropagation();
    
    // Track conversion
    console.log('High-value phone CTA clicked');
    if (typeof gtag !== 'undefined') {
      gtag('event', 'phone_call', {
        event_category: 'lead',
        event_label: 'showroom_visit',
        value: 50 // High LTV
      });
    }
    
    // Voice assistant hint (Siri/Alexa)
    if ('speechSynthesis' in window) {
      console.log('Tip: Say "Call 920-882-0808" to Siri');
    }
  });
});

// Robust smooth scroll - Print-safe
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (window.matchMedia('print').matches) return; // Skip in print
    
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target = document.querySelector(targetId);
    
    if (target) {
      const headerOffset = 100; // Larger offset for readability
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Main contact form - Detailed, trustworthy feedback
const mainForm = document.querySelector('.contact-form');
if (mainForm) {
  mainForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate detailed server validation
    setTimeout(() => {
      submitBtn.textContent = 'Received ✓';
      
      const message = `Thank you for your inquiry!\n\nOur Appleton team will call you within 24 hours\nat the number provided to schedule your showroom visit.\n\nShowroom Hours: Mon-Sat 10AM-7PM`;
      
      alert(message);
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        this.reset();
      }, 2500);
    }, 1500);
    
    // Track qualified lead
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        event_category: 'lead',
        event_label: 'showroom_consult',
        value: 75
      });
    }
  });
  
  // Auto-focus first field
  const firstInput = mainForm.querySelector('input, textarea');
  if (firstInput) firstInput.focus();
}

// Smart testimonial slider - Pause-aware, traditional pace
const testimonials = document.querySelector('.testimonial-slider');
if (testimonials && testimonials.children.length > 1) {
  let scrollTimer;
  let scrollPosition = 0;
  const slideWidth = 450; // Wider for desktop reading
  
  function slideTestimonials() {
    scrollTimer = setTimeout(() => {
      scrollPosition += slideWidth;
      
      if (scrollPosition >= testimonials.scrollWidth - testimonials.clientWidth) {
        scrollPosition = 0;
      }
      
      testimonials.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }, 6000); // Slower pace for reading
  }
  
  // Pause on interaction (important for detail-oriented users)
  ['mouseenter', 'focusin', 'touchstart'].forEach(event => {
    testimonials.addEventListener(event, () => clearTimeout(scrollTimer));
  });
  
  ['mouseleave', 'scrollend'].forEach(event => {
    testimonials.addEventListener(event, slideTestimonials);
  });
  
  // Initial slide
  slideTestimonials();
}

// Print mode optimizations
if (window.matchMedia('print').matches) {
  document.body.style.fontSize = '12pt';
  // Disable all JS during print
  window.stop();
}

// Accessibility: Keyboard navigation enhancements
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any modals/mobile menus
    document.querySelector('.nav')?.classList.remove('active');
  }
});

// Larger tap targets for touch (Boomers on tablets)
document.querySelectorAll('.btn, .cta-header, .nav a').forEach(el => {
  el.style.minHeight = '48px';
  el.style.display = 'inline-flex';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';
});

// Legacy browser support: Smooth scroll polyfill
if (!('scrollBehavior' in document.documentElement.style)) {
  // Simple polyfill for IE11/etc.
  const scrollPolyfill = (targetY) => {
    const scrollStep = -window.scrollY / 50;
    const scrollInterval = setInterval(() => {
      if (window.scrollY <= targetY) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };
}

// Performance: Preload critical resources
if ('link' in document.createElement('link')) {
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'font';
  preloadLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700';
  document.head.appendChild(preloadLink);
}