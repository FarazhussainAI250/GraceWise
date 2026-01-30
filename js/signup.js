document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Validate password length
        if (password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }
        
        const userData = {
            firstName: firstName,
            email: email,
            password: password
        };
        
        const result = auth.register(userData);
        
        if (result.success) {
            alert(result.message);
            // Update navbar if updateNavbar function exists
            if (typeof updateNavbar === 'function') {
                updateNavbar();
            }
            window.location.href = 'index.html';
        } else {
            alert(result.message);
        }
    });
});