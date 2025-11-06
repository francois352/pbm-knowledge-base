/**
 * Main Application JavaScript
 * Handles navigation, language switching, and interactive features
 */

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
            });
        });
    }

    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');

            // Remove active class from all buttons
            langButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Store language preference
            localStorage.setItem('preferredLanguage', selectedLang);

            // Show language notification (for demo)
            showLanguageNotification(selectedLang);

            // In production, this would redirect to the language-specific version
            // window.location.href = `/${selectedLang}/`;
        });
    });

    // Load preferred language on page load
    const preferredLang = localStorage.getItem('preferredLanguage');
    if (preferredLang) {
        const langButton = document.querySelector(`[data-lang="${preferredLang}"]`);
        if (langButton) {
            langButtons.forEach(btn => btn.classList.remove('active'));
            langButton.classList.add('active');
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#search') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Highlight active navigation link based on scroll position
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
});

// Show language switch notification
function showLanguageNotification(lang) {
    const langNames = {
        'fr': 'Français',
        'en': 'English',
        'de': 'Deutsch'
    };

    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: var(--color-primary-purple);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        font-size: 1.4rem;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = `Langue: ${langNames[lang]} (Demo - Traduction complète à venir)`;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Update active navigation link based on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Analytics (placeholder for future implementation)
function trackPageView(page) {
    // Google Analytics or similar would go here
    console.log(`Page view: ${page}`);
}

// Track search queries (for analytics)
function trackSearch(query, resultsCount) {
    console.log(`Search: "${query}" - ${resultsCount} results`);
    // Analytics implementation would go here
}

// Initialize
trackPageView(window.location.pathname);
