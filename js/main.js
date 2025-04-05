document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM queries
    // const hamburger = document.querySelector('.hamburger-menu'); // Commented out
    const navLinks = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section');
    // Select all nav links for active state highlighting (Donate style handled by CSS)
    const navAnchors = document.querySelectorAll('.nav-links a');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;
    
    // Throttle scroll event
    let scrollTimeout;
    
    // Mobile Navigation with performance optimization
    /* Commented out hamburger listener as .hamburger-menu doesn't exist
    hamburger?.addEventListener('click', () => {
        requestAnimationFrame(() => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    });
    */

    // Close menu when clicking overlay
    navOverlay?.addEventListener('click', () => {
        // hamburger?.classList.remove('active'); // Also commented out hamburger reference
        navLinks?.classList.remove('active'); // Keep null checks
        navOverlay?.classList.remove('active'); // Keep null checks
        body.classList.remove('menu-open');
    });

    // Close menu when clicking links
    navLinks?.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            // hamburger?.classList.remove('active'); // Also commented out hamburger reference
            navLinks?.classList.remove('active');
            navOverlay?.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu on resize if screen becomes large
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // hamburger?.classList.remove('active'); // Also commented out hamburger reference
            navLinks?.classList.remove('active');
            navOverlay?.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Optimized smooth scrolling
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only prevent default and scroll smoothly for internal links (starting with #)
            if (href && href.startsWith('#')) { 
                e.preventDefault();
                const targetElement = document.querySelector(href);
                const headerElement = document.querySelector('.main-nav'); // Assuming .main-nav is the fixed header
                
                if (targetElement) {
                    const headerHeight = headerElement ? headerElement.offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    // Subtract header height AND an extra 15px for visual padding below header
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 65; 

                    window.scrollTo({
                         top: offsetPosition,
                         behavior: 'smooth'
                    });
                }
            } 
            // For external links (like volunteer.html), let the browser handle the navigation normally.
        });
    });

    // Optimized scroll handler with throttling
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            let currentSectionId = '';
            const scrollPosition = window.scrollY;
            const offset = 150; // Offset to trigger active state slightly before section top

            sections.forEach(section => {
                const sectionTop = section.offsetTop - offset;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            // Handle edge case for top of the page (Home)
            if (scrollPosition < sections[0].offsetTop - offset) {
                 currentSectionId = 'home'; 
            }

            navAnchors.forEach(link => {
                const linkHref = link.getAttribute('href');
                // Check if the link's href matches the current section ID
                // For home, check if linkHref is '#home' and currentSectionId is 'home'
                const isActive = linkHref === `#${currentSectionId}` || (linkHref === '#home' && currentSectionId === 'home');
                link.classList.toggle('active', isActive);
            });
        });
    });

    // Lazy load images (Removed - Handled by Lightbox2)
    // const lazyLoadImages = () => {
    //     const imageObserver = new IntersectionObserver((entries, observer) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 const img = entry.target;
    //                 img.style.backgroundImage = `url('${img.dataset.src}')`;
    //                 observer.unobserve(img);
    //             }
    //         });
    //     });
    //
    //     document.querySelectorAll('.gallery-item[data-src]').forEach(img => {
    //         imageObserver.observe(img);
    //     });
    // };
    //
    // // Initialize lazy loading (Removed)
    // if ('IntersectionObserver' in window) {
    //     lazyLoadImages();
    // }
});

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks?.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-nav]') && navLinks?.classList.contains('active')) {
      navToggle?.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // Close menu when clicking a link
  navLinks?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navToggle?.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
});
