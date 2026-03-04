// NO AUTO-REDIRECT - Always show main selector first
// Age selector buttons only
function selectAge(pageNum) {
  const segment = pageNum === 1 ? 'modern' : 'traditional';
  
  // Track choice
  if (typeof gtag !== 'undefined') {
    gtag('event', 'segment_select', {
      event_category: 'ab_test',
      event_label: segment,
      value: 1
    });
  }
  
  // Store for analytics (but NO auto-redirect)
  localStorage.setItem('valeri_segment', segment);
  
  // Manual redirect ONLY on button click
  const targetUrl = segment === 'modern' ? 'landing1/' : 'landing2/';
  window.location.href = targetUrl;
}

// Card click tracking - Manual only
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent any default
    
    const segment = card.dataset.segment;
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'landing_choose', {
        event_category: 'ab_test',
        event_label: segment,
        value: 10
      });
    }
    
    // Store preference + redirect
    localStorage.setItem('valeri_segment', segment);
    const targetPath = segment === 'modern' ? 'landing1/' : 'landing2/';
    window.location.href = targetPath;
  });
});

// Button hover animations only
document.querySelectorAll('.btn-age').forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.05)');
  btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
});

// Smooth scroll for anchor links only (no segment logic)
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// NO initRouter() - Never auto-redirects!