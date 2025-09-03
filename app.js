// Ikigai Integrative Healthcare - Enhanced JavaScript
// Modern, accessible, and performant implementation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize application
    initializeApp();
});

// Main initialization function
function initializeApp() {
    try {
        // Core functionality
        initNavigation();
        initMobileMenu();
        initContactForm();
        initButtonNavigation();
        initScrollBehavior();
        initAccessibility();
        initAnimations();
        
        // Performance optimization
        initLazyLoading();
        
        console.log('Ikigai Healthcare application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Enhanced navigation between sections
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    if (!navLinks.length || !sections.length) {
        console.warn('Navigation elements not found');
        return;
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
        link.addEventListener('keydown', handleKeyboardNavigation);
    });
    
    // Set initial active section
    const activeSection = document.querySelector('.section.active');
    if (!activeSection) {
        showSection('home');
    }
}

// Handle navigation clicks and keyboard events
function handleNavigation(event) {
    event.preventDefault();
    const targetSection = this.getAttribute('data-section');
    
    if (targetSection) {
        showSection(targetSection);
        updateActiveNavLink(this);
        closeMobileMenu();
        
        // Announce section change for screen readers
        announceToScreenReader(`Navigated to ${targetSection} section`);
    }
}

// Keyboard navigation support
function handleKeyboardNavigation(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleNavigation.call(this, event);
    }
}

// Enhanced section switching with smooth transitions
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const targetSection = document.getElementById(sectionId);
    
    if (!targetSection) {
        console.error(`Section not found: ${sectionId}`);
        return;
    }
    
    // Hide all sections with fade out
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            section.style.opacity = '0';
            setTimeout(() => {
                section.classList.remove('active');
                section.style.display = 'none';
            }, 150);
        }
    });
    
    // Show target section with fade in
    setTimeout(() => {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        
        // Trigger reflow for smooth transition
        targetSection.offsetHeight;
        
        targetSection.style.opacity = '1';
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Focus management for accessibility
        const firstFocusable = targetSection.querySelector('h1, h2, [tabindex="0"], button, input');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }, 150);
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Enhanced mobile menu with improved animations
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }
    
    // Add ARIA attributes
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'navMenu');
    navMenu.setAttribute('aria-hidden', 'true');
    
    navToggle.addEventListener('click', toggleMobileMenu);
    navToggle.addEventListener('keydown', handleMobileMenuKeyboard);
    
    // Close menu when clicking outside
    document.addEventListener('click', handleOutsideClick);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}

// Toggle mobile menu with enhanced animations
function toggleMobileMenu(event) {
    event.stopPropagation();
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const isOpen = navMenu.classList.contains('active');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// Open mobile menu
function openMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navMenu.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.setAttribute('aria-hidden', 'false');
    
    animateHamburgerMenu(navToggle, true);
    
    // Focus first menu item
    const firstMenuItem = navMenu.querySelector('.nav-link');
    if (firstMenuItem) {
        setTimeout(() => firstMenuItem.focus(), 100);
    }
}

// Close mobile menu
function closeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navMenu.classList.contains('active')) return;
    
    navMenu.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');
    
    animateHamburgerMenu(navToggle, false);
}

// Keyboard support for mobile menu
function handleMobileMenuKeyboard(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMobileMenu(event);
    }
}

// Handle clicks outside mobile menu
function handleOutsideClick(event) {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;
    
    if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        closeMobileMenu();
    }
}

// Animate hamburger menu icon with smooth transitions
function animateHamburgerMenu(toggleElement, isOpen) {
    const spans = toggleElement.querySelectorAll('span');
    
    if (spans.length !== 3) return;
    
    if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[1].style.transform = 'translateX(20px)';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[1].style.transform = 'none';
        spans[2].style.transform = 'none';
    }
}

// Enhanced contact form with comprehensive validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Add real-time validation
    const formInputs = contactForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Handle form submission with enhanced validation
async function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate form
    const validationResult = validateForm(formData);
    if (!validationResult.isValid) {
        showFormErrors(validationResult.errors);
        return;
    }
    
    // Show loading state
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    
    try {
        await submitForm(formData);
        showSuccessMessage();
        form.reset();
        announceToScreenReader('Message sent successfully');
    } catch (error) {
        console.error('Form submission error:', error);
        showFormErrors(['There was an error sending your message. Please try again or contact us directly.']);
        announceToScreenReader('Error sending message. Please try again.');
    } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
    }
}

// Comprehensive form validation
function validateForm(formData) {
    const errors = [];
    const data = Object.fromEntries(formData.entries());
    
    // Required field validation
    if (!data.name?.trim()) {
        errors.push('Name is required');
    } else if (data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email?.trim()) {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email.trim())) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.message?.trim()) {
        errors.push('Message is required');
    } else if (data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    // Phone validation (optional but if provided, must be valid)
    if (data.phone?.trim() && !isValidPhone(data.phone.trim())) {
        errors.push('Please enter a valid phone number');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Individual field validation
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    let error = null;
    
    switch (fieldName) {
        case 'name':
            if (!value) error = 'Name is required';
            else if (value.length < 2) error = 'Name must be at least 2 characters long';
            break;
        case 'email':
            if (!value) error = 'Email is required';
            else if (!isValidEmail(value)) error = 'Please enter a valid email address';
            break;
        case 'message':
            if (!value) error = 'Message is required';
            else if (value.length < 10) error = 'Message must be at least 10 characters long';
            break;
        case 'phone':
            if (value && !isValidPhone(value)) error = 'Please enter a valid phone number';
            break;
    }
    
    if (error) {
        showFieldError(field, error);
    }
}

// Clear field error on input
function clearFieldError(event) {
    const field = event.target || event;
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
    field.removeAttribute('aria-describedby');
}

// Show field-specific error
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    const errorId = `${field.id}-error`;
    errorElement.id = errorId;
    field.setAttribute('aria-describedby', errorId);
    field.classList.add('error');
    
    field.parentNode.appendChild(errorElement);
}

// Enhanced email validation
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
}

// Phone validation (international format support)
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    return phoneRegex.test(cleanPhone);
}

// Simulate form submission (replace with actual endpoint)
function submitForm(formData) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // For demonstration - replace with actual form submission
            console.log('Form data submitted:', Object.fromEntries(formData.entries()));
            resolve();
        }, 1500);
    });
}

// Show success message
function showSuccessMessage() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm && successMessage) {
        contactForm.style.display = 'none';
        successMessage.classList.remove('hidden');
        successMessage.style.display = 'block';
        
        // Add send another message button if it doesn't exist
        if (!successMessage.querySelector('.send-another-btn')) {
            const sendAnotherBtn = document.createElement('button');
            sendAnotherBtn.className = 'btn btn--outline send-another-btn';
            sendAnotherBtn.textContent = 'Send Another Message';
            sendAnotherBtn.style.marginTop = '1rem';
            sendAnotherBtn.addEventListener('click', resetContactForm);
            successMessage.appendChild(sendAnotherBtn);
        }
        
        // Focus on success message for screen readers
        successMessage.focus();
    }
}

// Clear all form errors
function clearFormErrors() {
    const existingErrors = document.querySelectorAll('.form-error, .field-error');
    existingErrors.forEach(error => error.remove());
    
    const errorFields = document.querySelectorAll('.form-control.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
        field.removeAttribute('aria-describedby');
    });
}

// Show form errors
function showFormErrors(errors) {
    if (!errors.length) return;
    
    const contactForm = document.getElementById('contactForm');
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-error';
    errorContainer.setAttribute('role', 'alert');
    errorContainer.innerHTML = `
        <strong>Please correct the following errors:</strong>
        <ul style="margin: 0.5rem 0 0 1rem; padding: 0;">
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
    `;
    
    contactForm.insertBefore(errorContainer, contactForm.firstChild);
    errorContainer.focus();
    
    // Remove errors after 10 seconds
    setTimeout(() => {
        if (errorContainer.parentNode) {
            errorContainer.remove();
        }
    }, 10000);
}

// Reset contact form
function resetContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (successMessage) {
        successMessage.classList.add('hidden');
        successMessage.style.display = 'none';
    }
    
    if (contactForm) {
        contactForm.style.display = 'block';
        contactForm.reset();
        clearFormErrors();
        
        // Focus on first form field
        const firstField = contactForm.querySelector('.form-control');
        if (firstField) {
            firstField.focus();
        }
    }
}

// Enhanced button navigation
function initButtonNavigation() {
    const navButtons = document.querySelectorAll('[data-section]:not(.nav-link)');
    
    navButtons.forEach(button => {
        button.addEventListener('click', handleButtonNavigation);
        button.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleButtonNavigation.call(button, event);
            }
        });
    });
}

// Handle button navigation
function handleButtonNavigation(event) {
    event.preventDefault();
    const targetSection = this.getAttribute('data-section');
    
    if (targetSection) {
        showSection(targetSection);
        
        // Update active nav link
        const correspondingNavLink = document.querySelector(`.nav-link[data-section="${targetSection}"]`);
        if (correspondingNavLink) {
            updateActiveNavLink(correspondingNavLink);
        }
        
        closeMobileMenu();
        announceToScreenReader(`Navigated to ${targetSection} section`);
    }
}

// Enhanced scroll behavior and performance
function initScrollBehavior() {
    // Smooth scrolling polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
        document.head.appendChild(script);
    }
    
    // Throttled scroll handler for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 100);
    });
}

// Handle scroll events
function handleScroll() {
    // Add scroll-based animations or effects here if needed
    // For now, this is a placeholder for future enhancements
}

// Initialize accessibility features
function initAccessibility() {
    // Skip to main content link
    addSkipLink();
    
    // Enhanced keyboard navigation
    initKeyboardNavigation();
    
    // ARIA live region for announcements
    createLiveRegion();
    
    // High contrast mode detection
    detectHighContrastMode();
}

// Add skip to main content link
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary-green);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ID to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('tabindex', '-1');
    }
}

// Enhanced keyboard navigation
function initKeyboardNavigation() {
    // ESC key handling
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMobileMenu();
            
            // Close any open modals or forms
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
            }
        }
    });
    
    // Tab trapping for mobile menu
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.addEventListener('keydown', trapTabInMenu);
    }
}

// Trap tab navigation within mobile menu
function trapTabInMenu(event) {
    if (event.key !== 'Tab') return;
    
    const menu = event.currentTarget;
    const focusableElements = menu.querySelectorAll('a, button, [tabindex="0"]');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
        if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        }
    } else {
        if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
}

// Create ARIA live region for announcements
function createLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(liveRegion);
    window.liveRegion = liveRegion;
}

// Announce to screen readers
function announceToScreenReader(message) {
    if (window.liveRegion) {
        window.liveRegion.textContent = message;
        setTimeout(() => {
            window.liveRegion.textContent = '';
        }, 1000);
    }
}

// Detect high contrast mode
function detectHighContrastMode() {
    // This is a basic implementation - can be enhanced based on needs
    const testElement = document.createElement('div');
    testElement.style.cssText = `
        border: 1px solid red;
        border-color: red green;
        position: absolute;
        height: 5px;
        top: -999px;
    `;
    document.body.appendChild(testElement);
    
    const styles = window.getComputedStyle(testElement);
    const isHighContrast = styles.borderTopColor === styles.borderRightColor;
    
    if (isHighContrast) {
        document.body.classList.add('high-contrast');
    }
    
    document.body.removeChild(testElement);
}

// Initialize animations and transitions
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .testimonial-card,
        .pillar-card,
        .focus-area-card,
        .plan-card
    `);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Handle intersection for animations
function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}

// Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
}

// Handle window resize
function handleResize() {
    const navMenu = document.getElementById('navMenu');
    
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    // Could send error to monitoring service here
});

// Expose utility functions globally for debugging
window.ikigaiApp = {
    showSection,
    resetContactForm,
    closeMobileMenu,
    announceToScreenReader
};

// Service worker registration for offline support (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}