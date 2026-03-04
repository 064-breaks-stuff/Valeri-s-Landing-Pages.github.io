// Auto-redirect based on referrer/query params
function initRouter() {
  const urlParams = new URLSearchParams(window.location.search);
  const segment = urlParams.get('segment') || localStorage.getItem('valeri_segment');
  
  if (segment === 'modern') {
    setTimeout(() => window.location.href = 'landing1/', 500);
  } else if (segment === 'traditional') {
    setTimeout(() => window.location.href = 'landing2/', 500);
  }
}

// Age selector
function selectAge(pageNum) {
  const segment = pageNum === 1 ? 'modern' : 'traditional';
  
  // Track selection
  if (typeof gtag !== 'undefined') {
    gtag('event', 'segment_select', {
      event_category: 'ab_test',
      event_label: segment,
      value: 1
    });
  }
  
  // Store preference
  localStorage.setItem('valeri_segment', segment);
  
  // Smooth redirect
  const targetUrl = segment === 'modern' ? 'landing1/' : 'landing2/';
  document.querySelector(`[data-segment="${segment}"]`).click();
}

// Card click tracking
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', (e) => {
    const segment = card.dataset.segment;
    
    // GA4 event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'landing_choose', {
        event_category: 'ab_test',
        event_label: segment,
        value: 10
      });
    }
    
    // Store & redirect
    localStorage.setItem('valeri_segment', segment);
    setTimeout(() => {
      if (!window.location.pathname.includes(segment)) {
        window.location.href = segment + '/';
      }
    }, 100);
  });
});

// Button animations
document.querySelectorAll('.btn-age').forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.05)');
  btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
});

// Load router on DOM ready
document.addEventListener('DOMContentLoaded', initRouter);

// PWA-ish: Add to home screen prompt (optional)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  deferredPrompt = e;
});