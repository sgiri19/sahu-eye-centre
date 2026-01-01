/**
 * Sahu Eye Centre & Optical - Main JavaScript
 * Author: Optimized for Performance & Accessibility
 */

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
});

// ============================================
// STICKY CTA BUTTON
// ============================================
const stickyCta = document.getElementById('stickyCta');
let lastScrollY = window.pageYOffset;

window.addEventListener('scroll', function () {
    const currentScrollY = window.pageYOffset;

    // Show/hide sticky CTA
    if (currentScrollY > 300) {
        stickyCta.classList.add('visible');
    } else {
        stickyCta.classList.remove('visible');
    }

    lastScrollY = currentScrollY;
}, { passive: true });

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Don't prevent default for external links or javascript: links
        if (targetId === '#' || targetId.startsWith('javascript:')) {
            return;
        }

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update focus for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus();
        }
    });
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}, { passive: true });

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// FAQ ACCORDION
// ============================================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            const btn = item.querySelector('.faq-question');
            btn.setAttribute('aria-expanded', 'false');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
        }
    });

    // Keyboard support for FAQ
    question.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// ============================================
// GALLERY CAROUSEL
// ============================================
// ============================================
// GALLERY CAROUSEL (Swiper.js)
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
        },
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});

// ============================================
// LAZY LOADING FALLBACK (for older browsers)
// ============================================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    console.log('Native lazy loading supported');
} else {
    // Fallback for older browsers
    const images = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// PERFORMANCE MONITORING (Development only)
// ============================================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function () {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;

            console.log('Performance Metrics:');
            console.log(`Page Load Time: ${pageLoadTime}ms`);
            console.log(`Server Response Time: ${connectTime}ms`);
            console.log(`DOM Render Time: ${renderTime}ms`);
        }, 0);
    });
}

// ============================================
// SERVICE WORKER REGISTRATION (Optional)
// Uncomment when you're ready to implement PWA features
// ============================================
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
*/

// ============================================
// ANALYTICS EVENT TRACKING (Google Analytics)
// Uncomment when GA is set up
// ============================================
/*
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track phone clicks
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Contact', 'Phone Click', link.href);
    });
});

// Track email clicks
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Contact', 'Email Click', link.href);
    });
});

// Track WhatsApp clicks
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Contact', 'WhatsApp Click', link.href);
    });
});

// Track CTA button clicks
document.querySelectorAll('.cta-button, .header-cta, .sticky-cta').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('Conversion', 'CTA Click', button.textContent);
    });
});
*/