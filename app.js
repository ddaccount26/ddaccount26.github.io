// Debanjan Dey Portfolio - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling function
    function smoothScrollTo(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Close mobile menu when clicking on a link and scroll to section
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }

            // Get target and scroll
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                smoothScrollTo(targetId);
            }
        });
    });

    // Handle hero section buttons
        heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default and smooth-scroll if it's an internal anchor link
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(targetId);
            }
        });
    });


    // Handle all CTA buttons and internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                smoothScrollTo(targetId);
            }
        });
    });

    // Highlight active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100; // Add offset for better detection

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Navbar background on scroll
    function updateNavbarBackground() {
        if (!navbar) return;
        
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches || 
                      document.documentElement.getAttribute('data-color-scheme') === 'dark';
        
        if (window.scrollY > 50) {
            if (isDark) {
                navbar.style.background = 'rgba(38, 40, 40, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            if (isDark) {
                navbar.style.background = 'rgba(38, 40, 40, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    // Scroll event listeners
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Throttle scroll events for better performance
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
            updateNavbarBackground();
        }, 10);
    });

    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateNavbarBackground);

    // Initial calls
    updateActiveNavLink();
    updateNavbarBackground();

    // Animate sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-animate');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Animate skill items on scroll
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        item.style.transition = 'all 0.4s ease';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // Animate project cards on scroll
    const projectObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        card.style.transition = 'all 0.6s ease';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
        projectObserver.observe(projectsSection);
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Get submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (!submitButton) return;
            
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate API call delay
            setTimeout(() => {
                // Create mailto link as fallback
                const mailtoLink = `mailto:ddaccount26@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                // Try to open email client
                try {
                    window.location.href = mailtoLink;
                    showNotification('Thank you for your message! Your email client should open now.', 'success');
                } catch (error) {
                    showNotification('Please email me directly at ddaccount26@gmail.com', 'info');
                }

                contactForm.reset();
                
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1000);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" type="button">&times;</button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            padding: var(--space-16);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            max-width: 400px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            color: var(--color-text);
        `;

        // Type-specific styling
        if (type === 'success') {
            notification.style.borderLeftColor = 'var(--color-success)';
            notification.style.borderLeftWidth = '4px';
        } else if (type === 'error') {
            notification.style.borderLeftColor = 'var(--color-error)';
            notification.style.borderLeftWidth = '4px';
        }

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                removeNotification(notification);
            });
        }

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                removeNotification(notification);
            }
        }, 5000);
    }

    function removeNotification(notification) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }

    // Add some interactive effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add hover effects to experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--color-primary)';
            this.style.transition = 'border-color 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--color-card-border)';
        });
    });

    // Add typing effect to hero tagline (optional enhancement)
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const originalText = heroTagline.textContent;
        heroTagline.textContent = '';
        
        // Wait for hero image animation to complete
        setTimeout(() => {
            let currentIndex = 0;
            const typingInterval = setInterval(() => {
                if (currentIndex < originalText.length) {
                    heroTagline.textContent += originalText[currentIndex];
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 50);
        }, 1200);
    }

    // Parallax effect for hero background (subtle)
    let parallaxTimeout;
    window.addEventListener('scroll', function() {
        if (parallaxTimeout) {
            clearTimeout(parallaxTimeout);
        }
        parallaxTimeout = setTimeout(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        }, 10);
    });

    // Add smooth reveal animation for timeline items
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-30px)';
                entry.target.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, 100);
            }
        });
    }, { threshold: 0.3 });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Add counter animation for certifications
    const certificationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.certification-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.9)';
                        card.style.transition = 'all 0.5s ease';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.2 });

    const certificationsSection = document.querySelector('#certifications');
    if (certificationsSection) {
        certificationObserver.observe(certificationsSection);
    }

    // Initialize all animations and log success
    console.log('Debanjan Dey Portfolio - JavaScript Loaded Successfully');
    
    // Ensure hero section is visible on load
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'instant' });
    }
});