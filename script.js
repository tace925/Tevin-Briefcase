// ===== THEME TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
    
    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (body.classList.contains('light-mode')) {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // ===== PROJECT CARD INTERACTIONS =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== IMAGE ERROR HANDLING =====
    const projectImages = document.querySelectorAll('.project-img');
    projectImages.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            this.parentNode.classList.add('no-image');
        });
    });
    
    // ===== FORM SUBMISSION HANDLING =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> sending...';
            submitBtn.disabled = true;
            
            // Submit to Formspree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success - redirect to thank you page
                    window.location.href = 'thanks.html';
                } else {
                    // Error handling
                    return response.json().then(data => {
                        throw new Error(data.error || 'Form submission failed');
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Oops! Something went wrong. Please try again or email me directly at tevinmulinge48@gmail.com');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // ===== DYNAMIC FUN FACT ROTATION (Optional) =====
    const funFactElement = document.getElementById('fun-fact-text');
    if (funFactElement) {
        const funFacts = [
            "I once fixed a segfault at 3am and celebrated with cold chai ☕",
            "My code runs on caffeine and curiosity",
            "Debugging since 2022 - still not tired of it!",
            "I talk to my code. It talks back sometimes.",
            "Building systems that actually work (mostly)"
        ];
        
        setInterval(() => {
            const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
            funFactElement.style.opacity = '0';
            setTimeout(() => {
                funFactElement.textContent = randomFact;
                funFactElement.style.opacity = '1';
            }, 300);
        }, 5000);
    }
});