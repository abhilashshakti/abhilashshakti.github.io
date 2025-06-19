document.addEventListener('DOMContentLoaded', function() {
    // Typed.js animation for the home section
    const typed = new Typed('.auto-input', {
        strings: [
            'Machine Learning Engineer',
            'AI Researcher',
            'Problem Solver',
            'Full-Stack Developer'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Mobile menu toggle functionality
    const burger = document.getElementById('burger');
    const navbar = document.querySelector('.navbar');
    
    if (burger && navbar) {
        burger.addEventListener('click', () => {
            navbar.classList.toggle('h-nav-resp');
            burger.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navbar.classList.add('h-nav-resp');
                burger.classList.remove('active');
            }
        });
    });

    // Contact form handling with Formspree
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Submit form to Formspree using proper configuration
                const formData = new FormData(contactForm);
                
                const response = await fetch('https://formspree.io/f/xnnvbqee', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    // Show success message
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.backgroundColor = '#22c55e';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Show success alert
                    alert('Thank you for your message! I\'ll get back to you soon.');
                } else {
                    console.error('Formspree error:', result);
                    throw new Error(`Form submission failed: ${result.error || 'Unknown error'}`);
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Try Again';
                submitBtn.style.backgroundColor = '#dc3545';
                
                // Fallback: Use native form submission
                setTimeout(() => {
                    alert('There was an error with the AJAX submission. The form will now submit normally.');
                    contactForm.submit();
                }, 2000);
            } finally {
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }

    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add active navigation highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToObserve = document.querySelectorAll('.section, .experience-item, .project-card, .blog-card');
    elementsToObserve.forEach(el => observer.observe(el));
    
    // Initialize fade-in class for visible elements
    setTimeout(() => {
        const homeSection = document.querySelector('.home-section');
        if (homeSection) {
            homeSection.classList.add('fade-in');
        }
    }, 100);
});

