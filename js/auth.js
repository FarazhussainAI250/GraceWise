// Authentication System
class AuthSystem {
    constructor() {
        this.adminCredentials = {
            email: 'admin@gracewise.com',
            password: 'admin123'
        };
        this.users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    // Check if user is admin
    isAdmin(email) {
        return email === this.adminCredentials.email;
    }

    // Check if email already exists
    emailExists(email) {
        return this.users.some(user => user.email === email);
    }

    // Register new user
    register(userData) {
        if (this.emailExists(userData.email)) {
            return { success: false, message: 'Email already registered. Please sign in instead.' };
        }

        const newUser = {
            id: Date.now(),
            firstName: userData.firstName,
            email: userData.email,
            password: userData.password,
            registeredAt: new Date().toISOString()
        };

        this.users.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(this.users));
        
        // Auto login after registration
        const userData2 = {
            id: newUser.id,
            firstName: newUser.firstName,
            email: newUser.email,
            isAdmin: false
        };
        
        this.currentUser = userData2;
        localStorage.setItem('currentUser', JSON.stringify(userData2));
        
        return { success: true, message: 'Registration successful! Welcome!' };
    }

    // Login user
    login(email, password) {
        // Check admin credentials
        if (email === this.adminCredentials.email && password === this.adminCredentials.password) {
            const adminUser = {
                id: 'admin',
                firstName: 'Admin',
                email: email,
                isAdmin: true
            };
            
            this.currentUser = adminUser;
            localStorage.setItem('currentUser', JSON.stringify(adminUser));
            return { success: true, isAdmin: true, message: 'Admin login successful!' };
        }

        // Check regular user credentials
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            const userData = {
                id: user.id,
                firstName: user.firstName,
                email: user.email,
                isAdmin: false
            };
            
            this.currentUser = userData;
            localStorage.setItem('currentUser', JSON.stringify(userData));
            return { success: true, isAdmin: false, message: 'Login successful!' };
        }

        return { success: false, message: 'Invalid email or password!' };
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Redirect based on user type
    redirectAfterLogin(isAdmin) {
        if (isAdmin) {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'index.html';
        }
    }

    // Check access permissions
    checkAccess() {
        const currentPage = window.location.pathname.split('/').pop();
        const adminPages = ['admin-dashboard.html', 'all-users.html', 'admin-curriculum.html'];
        
        if (adminPages.includes(currentPage)) {
            if (!this.isLoggedIn() || !this.currentUser.isAdmin) {
                alert('Access denied! Admin privileges required.');
                window.location.href = 'index.html';
                return false;
            }
        }
        
        const userPages = ['dashboard.html', 'curriculum.html', 'ai-assistant.html', 'devotional.html', 'progress.html'];
        if (userPages.includes(currentPage)) {
            if (!this.isLoggedIn()) {
                alert('Please sign in to access this page.');
                window.location.href = 'sign_in.html';
                return false;
            }
        }
        
        return true;
    }
}

// Initialize auth system
const auth = new AuthSystem();

// Check access on page load
document.addEventListener('DOMContentLoaded', function() {
    auth.checkAccess();
});