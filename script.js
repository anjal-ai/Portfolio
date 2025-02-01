// Replace particlesJS with tsParticles
tsParticles.load("tsparticles", {
    fullScreen: {
        enable: true,
        zIndex: -1
    },
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#00ff94"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
        },
        links: {
            enable: true,
            distance: 150,
            color: "#00ff94",
            opacity: 0.2,
            width: 1
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                links: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Add smooth animations with GSAP
gsap.from('.hero-text', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    stagger: 0.2
});

gsap.from('.floating-icons .icon-wrapper', {
    duration: 1,
    scale: 0,
    opacity: 0,
    ease: 'back.out(1.7)',
    stagger: 0.1,
    delay: 0.5
});

// Enhanced parallax effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    gsap.to('.glow', {
        duration: 1,
        x: mouseX * 50,
        y: mouseY * 50,
        ease: 'power2.out'
    });

    gsap.to('.floating-icons .icon-wrapper', {
        duration: 1,
        x: mouseX * 30,
        y: mouseY * 30,
        rotation: mouseX * 10,
        ease: 'power2.out',
        stagger: 0.02
    });
});

// Add tilt effect to project cards
VanillaTilt.init(document.querySelectorAll('.project-card'), {
    max: 10,
    speed: 400,
    glare: true,
    'max-glare': 0.3
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-in, .scale-in').forEach(element => {
    observer.observe(element);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Form submission handling
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    form.reset();
});

// Update typing animation configuration
const phrases = [
    "AI & ML Enthusiast",
    "Python Developer",
    "Data Science Student",
    "Machine Learning Engineer"
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;      // Increased from 50 to 100
let deletingSpeed = 50;     // Increased from 25 to 50
let pauseEnd = 3000;        // Increased from 1500 to 3000 (3 seconds pause after typing)
let pauseStart = 1000;      // Increased from 500 to 1000 (1 second pause before typing)

function typeText() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        // Deleting text
        typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(typeText, pauseStart);
        } else {
            setTimeout(typeText, deletingSpeed);
        }
    } else {
        // Typing text
        typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;

        if (currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeText, pauseEnd);
        } else {
            // Add slight random variation to typing speed for more natural effect
            const randomSpeed = typingSpeed + Math.random() * 50;
            setTimeout(typeText, randomSpeed);
        }
    }
}

// Start the typing animation with a longer initial delay
window.addEventListener('load', () => {
    setTimeout(typeText, 1500); // Increased from 500 to 1500
});

// Add this to your existing script.js
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Message sent successfully!
    `;
    document.body.appendChild(successMessage);
    
    // Show the message
    setTimeout(() => successMessage.classList.add('show'), 100);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
        setTimeout(() => successMessage.remove(), 300);
    }, 3000);
    
    // Reset form
    this.reset();
});

// Add this to your existing script.js
document.querySelectorAll('.expertise-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});

// Add mouse movement effect for about card
const aboutCard = document.querySelector('.about-card');
if (aboutCard) {
    aboutCard.addEventListener('mousemove', (e) => {
        const rect = aboutCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        aboutCard.style.setProperty('--mouse-x', `${x}px`);
        aboutCard.style.setProperty('--mouse-y', `${y}px`);
    });
}

// Initialize tilt effect
VanillaTilt.init(document.querySelector(".about-card"), {
    max: 3,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.02
});

// Custom cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add lag to cursor outline
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Add interactive hover effects
document.querySelectorAll('a, button, .interactive-element').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.borderColor = 'var(--primary-color)';
        element.classList.add('hovered');
    });

    element.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = 'var(--primary-color)';
        element.classList.remove('hovered');
    });
});

// Section hover effects
document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        section.style.setProperty('--mouse-x', `${x}px`);
        section.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add parallax effect to elements
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    gsap.to('.interactive-element', {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: 'power2.out'
    });
});

// Smooth scroll with enhanced animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: target,
                offsetY: 70
            },
            ease: "power3.inOut"
        });
    });
});

// Add magnetic effect to buttons
document.querySelectorAll('.primary-btn, .secondary-btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) * 0.1;
        const moveY = (y - centerY) * 0.1;
        
        gsap.to(button, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Enhanced smooth scrolling and active link handling
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    // Function to get current section
    const getCurrentSection = () => {
        let current = '';
        const scrollPosition = window.pageYOffset + headerHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        return current;
    };

    // Update active link
    const updateActiveLink = () => {
        const currentSection = getCurrentSection();
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    // Smooth scroll with better offset calculation
    const smoothScroll = (targetId) => {
        const targetSection = document.querySelector(targetId);
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };

    // Add click event to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Add active class immediately for better UX
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            smoothScroll(targetId);
        });
    });

    // Throttle scroll event for better performance
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateActiveLink();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Update active link on page load
    updateActiveLink();
});

// Enhanced scroll to section with intersection observer
const observerOptions = {
    root: null,
    rootMargin: '-80px 0px 0px 0px', // Accounts for fixed header
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Add offset to scroll position to account for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerOffset = 100; // Adjust this value based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
}); 