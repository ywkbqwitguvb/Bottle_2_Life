// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('mobile');
    });

    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            hamburger.classList.remove('active');
            navLinks.classList.remove('mobile');
        }
    });
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate stats when in viewport
    const stats = document.querySelectorAll('.stat-item h2');
    const animateStats = () => {
        stats.forEach(stat => {
            const originalText = stat.textContent;
            const match = originalText.match(/(\d+(?:\.\d+)?)([MK]?)\+/);
            let value = 0;
            if (match) {
                value = parseFloat(match[1]);
                if (match[2] === 'K') value *= 1000;
                else if (match[2] === 'M') value *= 1000000;
            } else {
                value = parseInt(originalText);
            }
            let current = 0;
            const increment = value / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    stat.textContent = originalText;
                    clearInterval(timer);
                } else {
                    let display = Math.ceil(current);
                    if (originalText.includes('M+')) {
                        display = (display / 1000000).toFixed(1) + 'M+';
                    } else if (originalText.includes('K+')) {
                        display = (display / 1000) + 'K+';
                    } else {
                        display += '+';
                    }
                    stat.textContent = display;
                }
            }, 20);
        });
    };

    // Trigger animation when stats section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});