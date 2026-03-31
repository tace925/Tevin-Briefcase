// ============================================
// Tevin Mulinge Portfolio - Modern Glassmorphism
// Gold Typing Animation, Dark Mode, Form Handling
// ============================================

// ========== TYPING ANIMATION (GOLD) ==========
const typingPhrases = [
    "Full Stack Developer",
    "Frontend: HTML · CSS · JavaScript · React",
    "Backend: Python · C++ · Node.js · SQL",
    "Tools: Git · Vercel · Formspree · Paystack"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

const typingTextElement = document.getElementById("typing-text");

function typeEffect() {
    if (!typingTextElement) return;
    
    const currentPhrase = typingPhrases[phraseIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// ========== DARK MODE ==========
const themeToggle = document.getElementById('theme-toggle');
const themeToggleNav = document.getElementById('theme-toggle-nav');

function initDarkMode() {
    const savedMode = localStorage.getItem('tevins_portfolio_darkMode');
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
        updateThemeIcons(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcons(false);
    }
}

function updateThemeIcons(isDark) {
    const icons = document.querySelectorAll('#theme-toggle i, #theme-toggle-nav i');
    icons.forEach(icon => {
        if (isDark) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('tevins_portfolio_darkMode', isDark ? 'enabled' : 'disabled');
    updateThemeIcons(isDark);
}

// ========== READING PROGRESS BAR ==========
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileBtn.querySelector('i')) {
                    mobileBtn.querySelector('i').className = 'fas fa-bars';
                }
            });
        });
    }
}

// ========== ACTIVE NAVIGATION LINK ==========
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    });
}

// ========== PROJECT FILTERS ==========
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || (category && category.includes(filterValue))) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ========== COPY EMAIL BUTTON ==========
function initCopyEmail() {
    const copyBtn = document.getElementById('copyEmailBtn');
    const emailText = document.getElementById('email-text');
    
    if (copyBtn && emailText) {
        copyBtn.addEventListener('click', async () => {
            const email = emailText.textContent;
            try {
                await navigator.clipboard.writeText(email);
                const originalTooltip = copyBtn.getAttribute('data-tooltip');
                copyBtn.setAttribute('data-tooltip', 'Copied!');
                setTimeout(() => {
                    copyBtn.setAttribute('data-tooltip', originalTooltip);
                }, 1500);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    }
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch('https://formspree.io/f/maqlogko', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('✅ Message sent successfully! I\'ll get back to you within 24 hours.');
                form.reset();
                window.location.href = 'thanks.html';
            } else {
                const errorData = await response.json();
                console.error('Formspree error:', errorData);
                alert('❌ Submission failed. Please try again or email me directly at tevinmulinge48@gmail.com');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Network error. Please check your connection and try again.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}
// ========== CV DOWNLOAD ==========
function initCvDownload() {
    const cvBtn = document.getElementById('cv-download');
    if (cvBtn) {
        cvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('📄 CV download will be available soon. Check back later!');
        });
    }
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const sections = document.querySelectorAll('.projects, .skills, .hobbies, .credentials, .why-section, .contact');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ========== INITIALIZE ALL ==========
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 500);
    
    initDarkMode();
    if (themeToggle) themeToggle.addEventListener('click', toggleDarkMode);
    if (themeToggleNav) themeToggleNav.addEventListener('click', toggleDarkMode);
    
    initProgressBar();
    initMobileMenu();
    initActiveNavLink();
    initProjectFilters();
    initCopyEmail();
    initContactForm();
    initCvDownload();
    initSmoothScroll();
    initScrollAnimations();
});

// Add fade-in keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);