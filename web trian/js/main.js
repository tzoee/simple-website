// ===================================
// Main JavaScript File
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    initNavigation();
});

// ===================================
// Navigation Functions
// ===================================

/**
 * Initialize navigation functionality
 * - Smooth scroll to sections
 * - Active menu item highlighting
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Add click event listeners for smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    smoothScrollTo(targetSection);
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    const navToggle = document.querySelector('.nav-toggle');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Update active menu item on scroll
    window.addEventListener('scroll', updateActiveMenuItem);
}

/**
 * Smooth scroll to target element
 * @param {HTMLElement} target - Target element to scroll to
 */
function smoothScrollTo(target) {
    const headerOffset = 80; // Height of sticky header
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Update active menu item based on scroll position
 */
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}


// ===================================
// Mobile Menu Toggle
// ===================================

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle menu on button click
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideNav = navMenu.contains(e.target) || navToggle.contains(e.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});


// ===================================
// Form Validation
// ===================================

/**
 * Initialize contact form validation
 */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation on blur
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

/**
 * Handle form submission
 * @param {Event} e - Submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Clear previous errors
    clearErrors();
    
    // Validate all fields
    let isValid = true;
    
    if (!validateField(nameInput)) {
        isValid = false;
    }
    
    if (!validateField(emailInput)) {
        isValid = false;
    }
    
    if (!validateField(messageInput)) {
        isValid = false;
    }
    
    // If all valid, show success message
    if (isValid) {
        showSuccessMessage();
        form.reset();
    }
}

/**
 * Validate a single form field
 * @param {HTMLElement} field - Input field to validate
 * @returns {boolean} - Whether field is valid
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    // Clear previous error
    field.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    // Check if empty
    if (value === '') {
        showError(field, errorElement, `${getFieldLabel(fieldName)} harus diisi`);
        return false;
    }
    
    // Email validation
    if (fieldName === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, errorElement, 'Format email tidak valid');
            return false;
        }
    }
    
    return true;
}

/**
 * Show error message for a field
 * @param {HTMLElement} field - Input field
 * @param {HTMLElement} errorElement - Error message element
 * @param {string} message - Error message
 */
function showError(field, errorElement, message) {
    field.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Clear all error messages
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(el => {
        el.textContent = '';
    });
    
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

/**
 * Show success message
 */
function showSuccessMessage() {
    const successElement = document.getElementById('formSuccess');
    if (successElement) {
        successElement.textContent = 'Pesan berhasil dikirim! Terima kasih.';
        successElement.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            successElement.classList.remove('show');
        }, 5000);
    }
}

/**
 * Get field label for error messages
 * @param {string} fieldName - Field name
 * @returns {string} - Field label
 */
function getFieldLabel(fieldName) {
    const labels = {
        name: 'Nama',
        email: 'Email',
        message: 'Pesan'
    };
    return labels[fieldName] || fieldName;
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
});
