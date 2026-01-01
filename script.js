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
(function () {
    const galleryTrack = document.getElementById('galleryTrack');
    const galleryDots = document.getElementById('galleryDots');
    const originalItems = Array.from(galleryTrack.querySelectorAll('.gallery-item'));
    const totalItems = originalItems.length;

    // Clone first and last items for infinite loop
    const firstClone = originalItems[0].cloneNode(true);
    const lastClone = originalItems[totalItems - 1].cloneNode(true);
    galleryTrack.insertBefore(lastClone, originalItems[0]);
    galleryTrack.appendChild(firstClone);

    // Get all items including clones
    const items = Array.from(galleryTrack.querySelectorAll('.gallery-item'));
    let currentIndex = 1; // Start at first real item (after clone)
    let autoPlayInterval;
    let isPaused = false;
    let isTransitioning = false;

    // Create dots (only for original items)
    originalItems.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `View image ${index + 1} of ${totalItems}`);
        dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        galleryDots.appendChild(dot);
    });

    const dots = galleryDots.querySelectorAll('.gallery-dot');

    function updateCarousel(disableTransition = false) {
        if (disableTransition) {
            galleryTrack.style.transition = 'none';
        } else {
            galleryTrack.style.transition = 'transform 0.6s ease-in-out';
        }

        // Calculate indices for left, center, and right items
        const leftIndex = (currentIndex - 1 + items.length) % items.length;
        const centerIndex = currentIndex;
        const rightIndex = (currentIndex + 1) % items.length;

        // Update classes for left, center, right
        items.forEach((item, index) => {
            item.classList.remove('left', 'center', 'right');

            if (index === centerIndex) {
                item.classList.add('center');
            } else if (index === leftIndex) {
                item.classList.add('left');
            } else if (index === rightIndex) {
                item.classList.add('right');
            }
        });

        // Move track horizontally by 33.333% (one image width) for each step
        const offset = -currentIndex * 33.333;
        galleryTrack.style.transform = `translateX(${offset}%)`;

        // Update dots
        let originalIndex;
        if (currentIndex === 0) {
            originalIndex = totalItems - 1;
        } else if (currentIndex >= items.length - 1) {
            originalIndex = 0;
        } else {
            originalIndex = currentIndex - 1;
        }

        dots.forEach((dot, index) => {
            const isActive = index === originalIndex;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }

    function goToSlide(originalIndex) {
        currentIndex = originalIndex + 1;
        updateCarousel();
        resetAutoPlay();
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex++;

        // When reaching the clone at the end
        if (currentIndex >= items.length - 1) {
            updateCarousel();
            setTimeout(() => {
                galleryTrack.style.transition = 'none';
                currentIndex = 1;
                const offset = -currentIndex * 33.333;
                galleryTrack.style.transform = `translateX(${offset}%)`;

                // Update classes instantly for seamless loop
                const leftIndex = (currentIndex - 1 + items.length) % items.length;
                const centerIndex = currentIndex;
                const rightIndex = (currentIndex + 1) % items.length;

                items.forEach((item, index) => {
                    item.classList.remove('left', 'center', 'right');
                    if (index === centerIndex) {
                        item.classList.add('center');
                    } else if (index === leftIndex) {
                        item.classList.add('left');
                    } else if (index === rightIndex) {
                        item.classList.add('right');
                    }
                });

                // Update dots
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === 0);
                    dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
                });

                // Re-enable transition almost immediately for next slide
                setTimeout(() => {
                    galleryTrack.style.transition = 'transform 0.6s ease-in-out';
                    isTransitioning = false;
                }, 20);
            }, 600);
        } else {
            updateCarousel();
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        if (!isPaused) {
            autoPlayInterval = setInterval(nextSlide, 2000);
        }
    }

    // Initialize
    updateCarousel();
    resetAutoPlay();

    // Pause on hover
    galleryTrack.addEventListener('mouseenter', () => {
        isPaused = true;
        clearInterval(autoPlayInterval);
    });

    galleryTrack.addEventListener('mouseleave', () => {
        isPaused = false;
        resetAutoPlay();
    });

    // Keyboard navigation for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && index > 0) {
                dots[index - 1].focus();
                dots[index - 1].click();
            } else if (e.key === 'ArrowRight' && index < dots.length - 1) {
                dots[index + 1].focus();
                dots[index + 1].click();
            }
        });
    });
})();

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