// Select elements
// const menuButton = document.getElementById('menuButton');
// const mobileMenu = document.getElementById('mobileMenu');

// Toggle mobile menu
// menuButton?.addEventListener('click', () => { // Added null check
//     if (mobileMenu.style.display === 'block') {
//         mobileMenu.style.display = 'none';
//     } else {
//         mobileMenu.style.display = 'block';
//     }
// });

// Handle mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Add active state for official approvals link
    const approvalLink = document.querySelector('a[href="#approvals"]');
    if (approvalLink) {
        approvalLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            approvalLink.classList.add('active');
        });
    }
});

// Consolidated DOMContentLoaded Listener
document.addEventListener('DOMContentLoaded', () => {
    
    // Removed: fetch('nav.html') logic as nav is static in HTML
    // Removed: initializeNavigation() call, handled by main.js now

    // Removed: Code referencing #hamburger (as it doesn't exist)
    // const hamburger = document.getElementById('hamburger');
    // const navLinks = document.querySelector('.nav-links');
    // hamburger?.addEventListener('click', () => { ... });
    // document.addEventListener('click', (e) => { ... }); // Keep this if needed, but check selectors
    
    // Handle Approval link click (if needed, otherwise remove)
    const approvalLink = document.querySelector('a[href="#approvals"]');
    if (approvalLink) {
        approvalLink.addEventListener('click', (e) => {
            e.preventDefault(); // Keep preventDefault if scrolling handled by main.js
            // Active state handled by main.js scroll listener, so remove this:
            // document.querySelectorAll('.nav-links a').forEach(link => {
            //     link.classList.remove('active');
            // });
            // approvalLink.classList.add('active');
        });
    }

    // Initialize gallery animation (if #gallery exists)
    const galleryElement = document.getElementById('gallery');
    if (galleryElement) {
        const galleryItems = galleryElement.querySelectorAll('.gallery-item'); // Scope query to gallery
        if (galleryItems.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        observer.unobserve(entry.target); // Unobserve after animation starts
                    }
                });
            }, { threshold: 0.1 });

            galleryItems.forEach(item => {
                item.style.animationPlayState = 'paused';
                observer.observe(item);
            });
        }
    }

    // Removed: Second DOMContentLoaded listener with .mobile-nav-toggle 
    // (as .mobile-nav-toggle doesn't exist)

    // Removed: Third DOMContentLoaded listener with .hamburger-menu 
    // (as .hamburger-menu doesn't exist)

    // Removed: nav object initialization (handled in main.js)
    // const nav = { ... };
    // nav.init(); 

    // Initialize Form Handler (if #contactForm exists)
    const contactFormElement = document.querySelector('#contactForm');
    if (contactFormElement) {
        const form = {
            init() {
                this.form = contactFormElement;
                this.bindEvents();
            },
            bindEvents() {
                this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
            },
            async handleSubmit(e) {
                e.preventDefault();
                const formEl = e.target;
                formEl.classList.add('loading');
                const status = formEl.querySelector('#formStatus'); // Query within the form

                try {
                    // NOTE: Using fetch here for form submission is fine if process_form.php is a server endpoint
                    const response = await fetch(formEl.action, {
                        method: 'POST',
                        body: new FormData(formEl)
                    });

                    // Assuming response might not be JSON, adjust as needed
                    if (response.ok) { 
                        this.showMessage(status, 'success', 'Form submitted successfully!'); 
                    } else {
                        this.showMessage(status, 'error', 'Form submission failed. Status: ' + response.status);
                    }
                } catch (error) {
                    this.showMessage(status, 'error', 'An error occurred. Please try again.');
                } finally {
                    formEl.classList.remove('loading');
                }
            },
            showMessage(statusElement, type, message) {
                if (statusElement) {
                    statusElement.className = `form-status ${type}`;
                    statusElement.textContent = message;
                    statusElement.style.display = 'block';
                }
            }
        };
        form.init();
    }

    // Removed: Lazy loading section (as images use loading="lazy" attribute)

    // Removed: Smooth scrolling section (handled better in main.js)

    // Removed: Form submission handler with URL params (redundant with form object)

    // Removed: Final DOMContentLoaded listener with nav.init() etc.
});

// Removed: initializeGallery() function (logic moved into DOMContentLoaded)