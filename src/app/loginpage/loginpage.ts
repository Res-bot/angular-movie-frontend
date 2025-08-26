import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-loginpage',
  imports: [],
  templateUrl: './loginpage.html',
  styleUrl: './loginpage.css'
})
export class Loginpage implements OnInit, AfterViewInit {
  protected title = 'stream-login';
  private activeTab = 'login';
  private isLoading = false;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.initAuthTabs();
  }

  private initAuthTabs() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', (e: any) => {
        const tab = e.target.dataset.tab;
        this.setActiveTab(tab);
      });
    });

    // Form submissions
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
      loginForm.addEventListener('submit', (e: any) => {
        e.preventDefault();
        this.handleLogin(e.target);
      });
    }

    if (registerForm) {
      registerForm.addEventListener('submit', (e: any) => {
        e.preventDefault();
        this.handleRegister(e.target);
      });
    }

    // Real-time validation
    this.setupRealTimeValidation();

    // Forgot password
    const forgotPasswordBtn = document.querySelector('.forgot-password');
    if (forgotPasswordBtn) {
      forgotPasswordBtn.addEventListener('click', () => {
        alert('Forgot password functionality would be implemented here.');
      });
    }
  }

  private setActiveTab(tab: string) {
    if (this.isLoading) return;

    this.activeTab = tab;

    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeButton = document.querySelector(`[data-tab="${tab}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.add('hidden');
    });
    const activeTab = document.getElementById(`${tab}-tab`);
    if (activeTab) {
      activeTab.classList.remove('hidden');
    }

    // Clear form errors when switching tabs
    this.clearAllErrors();
  }

  private setupRealTimeValidation() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input as HTMLInputElement));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input as HTMLInputElement);
        }
        // Special case for password confirmation
        if (input.name === 'password' && (document.getElementById('confirmPassword') as HTMLInputElement)?.value) {
          this.validatePasswordMatch();
        }
        if (input.name === 'confirmPassword') {
          this.validatePasswordMatch();
        }
      });
    });
  }

  private validateField(field: HTMLInputElement) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (!errorElement) return true;

    let isValid = true;
    let errorMessage = '';

    // Required validation
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = `${this.getFieldLabel(field.name)} is required`;
    }
    // Email validation
    else if (field.type === 'email' && field.value && !this.isValidEmail(field.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email';
    }
    // Minlength validation
    else if (field.hasAttribute('minlength') && field.value && field.value.length < parseInt(field.getAttribute('minlength') || '0')) {
      isValid = false;
      errorMessage = `${this.getFieldLabel(field.name)} must be at least ${field.getAttribute('minlength')} characters`;
    }
    // Checkbox validation
    else if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
      isValid = false;
      errorMessage = 'You must agree to the terms';
    }

    this.setFieldError(field, errorElement, isValid, errorMessage);
    return isValid;
  }

  private validatePasswordMatch() {
    const password = document.getElementById('register-password') as HTMLInputElement;
    const confirmPassword = document.getElementById('confirmPassword') as HTMLInputElement;
    const errorElement = document.getElementById('confirmPassword-error');

    if (!password || !confirmPassword || !errorElement) return true;

    if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
      this.setFieldError(confirmPassword, errorElement, false, 'Passwords do not match');
      return false;
    } else if (confirmPassword.value) {
      this.setFieldError(confirmPassword, errorElement, true, '');
      return true;
    }
    return true;
  }

  private setFieldError(field: HTMLInputElement, errorElement: HTMLElement, isValid: boolean, message: string) {
    if (isValid) {
      field.classList.remove('error');
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    } else {
      field.classList.add('error');
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }

  private validateForm(form: HTMLFormElement) {
    const inputs = form.querySelectorAll('input');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input as HTMLInputElement)) {
        isValid = false;
      }
    });

    // Special password match validation for register form
    if (form.id === 'register-form') {
      if (!this.validatePasswordMatch()) {
        isValid = false;
      }
    }

    return isValid;
  }

  private async handleLogin(form: HTMLFormElement) {
   if (!this.validateForm(form)) return;

  this.setLoading(true);

  // ✅ Cast data so TS knows it has string values
  const formData = new FormData(form);
  const data = Object.fromEntries(formData) as { [key: string]: string };

  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser) as { [key: string]: string };

      if (user['email'] === data['email'] && user['password'] === data['password']) {
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login successful!');
        window.location.href = '/home'; // later replace with Angular Router
      } else {
        alert('Invalid email or password');
      }
    } else {
      alert('No user registered. Please create an account.');
    }
  } finally {
    this.setLoading(false);
  }
  }

  private async handleRegister(form: HTMLFormElement) {
    if (!this.validateForm(form)) return;

  this.setLoading(true);
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    localStorage.setItem('user', JSON.stringify(data));
    alert('Account created successfully! Please log in.');
    this.setActiveTab('login');
  } finally {
    this.setLoading(false);
  }
  }

  private setLoading(loading: boolean) {
    this.isLoading = loading;
    const submitButtons = document.querySelectorAll('.submit-button');
    
    submitButtons.forEach(button => {
      const buttonText = button.querySelector('.button-text');
      if (!buttonText) return;
      
      if (loading) {
        (button as HTMLButtonElement).disabled = true;
        if (button.closest('#login-tab')) {
          buttonText.innerHTML = '<span class="loading">Signing In...</span>';
        } else {
          buttonText.innerHTML = '<span class="loading">Creating Account...</span>';
        }
      } else {
        (button as HTMLButtonElement).disabled = false;
        if (button.closest('#login-tab')) {
          buttonText.textContent = 'Sign In';
        } else {
          buttonText.textContent = 'Create Account';
        }
      }
    });
  }

  private clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorInputs = document.querySelectorAll('input.error');
    
    errorMessages.forEach(error => {
      error.textContent = '';
      error.classList.remove('show');
    });
    
    errorInputs.forEach(input => {
      input.classList.remove('error');
    });
  }

  private getFieldLabel(fieldName: string) {
    const labels: { [key: string]: string } = {
      email: 'Email',
      password: 'Password',
      firstName: 'First name',
      lastName: 'Last name',
      confirmPassword: 'Confirm password',
      agreeToTerms: 'Terms agreement'
    };
    return labels[fieldName] || fieldName;
  }

  private isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
