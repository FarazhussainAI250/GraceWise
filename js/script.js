// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Check user authentication status and update navbar
    updateNavbar();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Only prevent default for anchor links (starting with #)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // Let normal links (like dashboard.html) work normally
        });
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar input');
    
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
            // Add actual search functionality here
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // Button click animations
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-card h3');
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const finalNumber = stat.textContent.replace(/[^0-9]/g, '');
            if (finalNumber) {
                animateNumber(stat, 0, parseInt(finalNumber), 2000);
            }
        });
    };

    function animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            const suffix = element.textContent.includes('+') ? '+' : '';
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 16);
    }

    // Trigger stats animation when section is visible
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });
});

// Update navbar based on authentication status
function updateNavbar() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const mainCtaBtn = document.getElementById('mainCtaBtn');
    
    if (currentUser) {
        // User is logged in - show logout, hide signup and main CTA
        signupBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        if (mainCtaBtn) mainCtaBtn.style.display = 'none';
    } else {
        // User is not logged in - show signup and main CTA, hide logout
        signupBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        if (mainCtaBtn) mainCtaBtn.style.display = 'inline-block';
    }
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        updateNavbar();
        window.location.href = 'index.html';
    }
}

// Mobile menu toggle function
function toggleMobileMenu() {
    const nav = document.getElementById('mobileNav');
    nav.classList.toggle('active');
}

// Check user and redirect function
function checkUserAndRedirect() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        if (currentUser.isAdmin) {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    } else {
        window.location.href = 'sign_in.html';
    }
}

// Search function
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        alert(`Searching for: ${searchTerm}`);
        // Add actual search functionality here
    }
}