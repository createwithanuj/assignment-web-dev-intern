// Select appointment buttons that are not inside a form
const appointButtonsNotInForm = document.querySelectorAll('.appointment-button:not(form .appointment-button)');

// Handle appointment form logic
document.querySelectorAll('.appointment-form').forEach(form => {
    const captchaField = form.querySelector('[name="captcha"]');
    let generatedCaptcha = captchaField.getAttribute('data-captcha');
    if (!generatedCaptcha) {
        generatedCaptcha = generateCaptcha();
        setCaptcha(form, captchaField, generatedCaptcha);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.querySelector('[name="name"]').value.trim();
        const mobile = form.querySelector('[name="mobile"]').value.trim();
        const captcha = form.querySelector('[name="captcha"]').value.trim();
        const checkbox = form.querySelector('[name="checkbox"]').checked;

        if (!validateFields(name, mobile, captcha, checkbox, generatedCaptcha)) return;

        alert('Appointment booked successfully!');
        form.reset();
        generatedCaptcha = generateCaptcha();
        setCaptcha(form, captchaField, generatedCaptcha);
    });
});

// Appointment button click: scroll to form and focus name input
appointButtonsNotInForm.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        const form = document.querySelector('.appointment-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const nameInput = form.querySelector('[name="name"]');
            if (nameInput) nameInput.focus();
        }
    });
});


appointButtonsNotInForm.forEach(btn => {
    btn.addEventListener('click', (event) => {
        if (window.innerWidth < 1024) {
            const form = document.querySelector('.form-for-mobile');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const nameInput = form.querySelector('[name="name"]');
            if (nameInput) nameInput.focus();
        }
        }
    });
});

// Callback button: initiate phone call
const callbackButton = document.getElementById('callbackButton');
if (callbackButton) {
    callbackButton.addEventListener('click', () => {
        window.location.href = 'tel:9856589510';
    });
}

// --- Helper Functions ---

function generateCaptcha() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

function setCaptcha(form, captchaField, value) {
    captchaField.setAttribute('data-captcha', value);
    const captchaSpan = form.querySelector('.captcha');
    if (captchaSpan) captchaSpan.textContent = value;
}

function validateFields(name, mobile, captcha, checkbox, generatedCaptcha) {
    
    if (!name || !mobile || !captcha || !checkbox) {
        alert('Please fill all the fields and agree to the terms.');
        return false;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert('Please enter a valid name (letters and spaces only).');
        return false;
    }

   
    let normalizedMobile = mobile.replace(/^(\+91|91|0)/, '').replace(/\D/g, '');
    if (!/^\d{10}$/.test(normalizedMobile)) {
        alert('Please enter a valid 10-digit mobile number.');
        return false;
    }

    if (!/^\d+$/.test(captcha) || captcha !== generatedCaptcha) {
        alert('Incorrect captcha. Please try again.');
        return false;
    }
    return true;
}
