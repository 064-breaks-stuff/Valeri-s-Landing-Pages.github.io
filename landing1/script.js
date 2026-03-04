// Original functionality preserved + SMS form focus
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Quick form: SMS simulation (replace with Twilio/API)
document.querySelector('.quickform form').addEventListener('submit', function(e) {
  e.preventDefault();
  // Simulate instant response for psychology boost
  alert('✅ Text sent! Reply "DESIGN" for virtual consult. (Demo)');
});

// Original testimonial slider preserved
const testimonials = document.querySelector('.testimonial-slider');
if (testimonials) {
  setInterval(() => {
    testimonials.scrollBy({ left: 420, behavior: 'smooth' });
  }, 5000);
}

// Original form
document.querySelector('.contact-form:not(.quickform form)')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you! We\'ll contact you within 24 hours.');
});