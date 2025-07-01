// Navigation functionality
let isMenuOpen = false;
let activeSection = 'home';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollSpy();
    initializeFormHandling();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeChartAnimation();
});

// Navigation functions
function initializeNavigation() {
    // Add click listeners to all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .footer-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
            }
        });
    });
}

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    const mobileNav = document.querySelector('.mobile-nav');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (isMenuOpen) {
        mobileNav.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Close mobile menu if open
    if (isMenuOpen) {
        toggleMobileMenu();
    }
}

// Scroll spy functionality
function initializeScrollSpy() {
    window.addEventListener('scroll', throttle(handleScroll, 100));
    handleScroll(); // Initial call
}

function handleScroll() {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const offsetTop = element.offsetTop;
            const height = element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                if (activeSection !== section) {
                    updateActiveNavLink(section);
                    activeSection = section;
                }
                break;
            }
        }
    }
    
    // Update navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
}

function updateActiveNavLink(sectionId) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section link
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Form handling
function initializeFormHandling() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Form validation
    const formInputs = event.target.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    // Reset previous error states
    formInputs.forEach(input => {
        input.style.borderColor = '#374151';
    });
    
    // Basic validation
    formInputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
            input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        }
    });
    
    // Email validation
    const emailInput = event.target.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            emailInput.style.borderColor = '#ef4444';
            emailInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        }
    }
    
    if (isValid) {
        // Simulate form submission
        const submitButton = event.target.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = `
            <svg class="submit-icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Sending...
        `;
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            submitButton.innerHTML = `
                <svg class="submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                </svg>
                Message Sent!
            `;
            submitButton.style.background = 'linear-gradient(135deg, #10b981, #047857)';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                event.target.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
                
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            }, 3000);
        }, 2000);
        
        console.log('Form submitted with data:', data);
    } else {
        // Show error notification
        showNotification('Please fill in all required fields correctly.', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Trigger chart animation when hero is visible
                if (entry.target.classList.contains('hero-section')) {
                    animateChart();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .experience-card, .highlight-item, .contact-method');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Observe sections
    const sections = document.querySelectorAll('#skills, .hero-section');
    sections.forEach(section => observer.observe(section));
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// Chart animation
function initializeChartAnimation() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.height = '0%';
    });
}

function animateChart() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        const targetHeight = bar.style.height;
        bar.style.height = '0%';
        
        setTimeout(() => {
            bar.style.height = targetHeight;
        }, index * 150);
    });
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
        const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
        const href = link.getAttribute('href');
        
        if (href && href !== '#') {
            e.preventDefault();
            const targetId = href.substring(1);
            scrollToSection(targetId);
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768 && isMenuOpen) {
        toggleMobileMenu();
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && isMenuOpen) {
        toggleMobileMenu();
    }
    
    // Navigate sections with arrow keys (when not in form inputs)
    if (!e.target.matches('input, textarea, select')) {
        const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
        const currentIndex = sections.indexOf(activeSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            scrollToSection(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            scrollToSection(sections[currentIndex - 1]);
        }
    }
});

// Performance optimization: Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for resize events
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

// Enhanced scroll effects
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
    
    // Floating elements parallax
    const floatingElements = document.querySelectorAll('.floating-card');
    floatingElements.forEach((element, index) => {
        const speed = (scrolled * (0.2 + index * 0.1));
        element.style.transform = `translateY(${speed}px)`;
    });
}, 16));

// Interactive chart functionality
document.addEventListener('DOMContentLoaded', function() {
    const chartBars = document.querySelectorAll('.bar');
    const controlDots = document.querySelectorAll('.control-dot');
    
    // Chart data sets
    const chartData = [
        [85, 92, 67, 98, 78, 89], // Dataset 1
        [76, 88, 94, 82, 91, 85], // Dataset 2
        [90, 78, 85, 88, 92, 87]  // Dataset 3
    ];
    
    let currentDataset = 0;
    
    // Control dot functionality
    controlDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Update active dot
            controlDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            // Update chart data
            currentDataset = index;
            updateChartData(chartData[currentDataset]);
        });
    });
    
    function updateChartData(data) {
        chartBars.forEach((bar, index) => {
            if (data[index]) {
                bar.style.height = `${data[index]}%`;
                bar.setAttribute('data-value', data[index]);
            }
        });
    }
    
    // Auto-rotate chart data every 5 seconds
    setInterval(() => {
        currentDataset = (currentDataset + 1) % chartData.length;
        controlDots.forEach(d => d.classList.remove('active'));
        controlDots[currentDataset].classList.add('active');
        updateChartData(chartData[currentDataset]);
    }, 5000);
});

// Enhanced form interactions
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Add CSS for floating labels
const style = document.createElement('style');
style.textContent = `
    .form-group.focused .form-label {
        color: #3b82f6;
        transform: translateY(-0.5rem);
        font-size: 0.75rem;
    }
    
    .form-label {
        transition: all 0.3s ease;
    }
    
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize tooltips for skill bars
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const skillItem = bar.closest('.skill-item');
        const skillName = skillItem.querySelector('.skill-name').textContent;
        const skillLevel = skillItem.querySelector('.skill-level').textContent;
        
        bar.setAttribute('title', `${skillName}: ${skillLevel}`);
    });
});

// Add smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            section.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', throttle(revealSections, 100));
document.addEventListener('DOMContentLoaded', revealSections);

// Add reveal styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-section {
        opacity: 1;
        transform: none;
    }
`;
document.head.appendChild(revealStyle);