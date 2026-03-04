// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you! We\'ll contact you within 24 hours to schedule.');
});

// Testimonial slider (basic auto-scroll)
const testimonials = document.querySelector('.testimonial-slider');
setInterval(() => {
  testimonials.scrollBy({ left: 420, behavior: 'smooth' });
}, 5000);