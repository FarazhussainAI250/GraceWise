document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Store user data in localStorage
    localStorage.setItem('userName', firstName);
    localStorage.setItem('userEmail', email);
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
});