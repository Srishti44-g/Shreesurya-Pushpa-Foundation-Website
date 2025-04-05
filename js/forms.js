document.addEventListener('DOMContentLoaded', function() {
    // Initialize all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Check for success/error parameters in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        showNotification('success', getSuccessMessage(urlParams.get('formType')));
    } else if (urlParams.has('error')) {
        showNotification('error', 'Something went wrong. Please try again later.');
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formType = form.querySelector('[name="form_type"]').value;
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerText;
    submitButton.disabled = true;
    submitButton.innerText = 'Submitting...';

    try {
        const response = await fetch('process_forms.php', {
            method: 'POST',
            body: new FormData(form)
        });

        if (response.ok) {
            showNotification('success', getSuccessMessage(formType));
            form.reset();
        } else {
            showNotification('error', 'Something went wrong. Please try again later.');
        }
    } catch (error) {
        showNotification('error', 'Connection error. Please check your internet connection.');
    } finally {
        submitButton.disabled = false;
        submitButton.innerText = originalText;
    }
}

function showNotification(type, message) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            ${message}
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => notification.remove(), 5000);
}

function getSuccessMessage(formType) {
    switch(formType) {
        case 'contact':
            return 'Thank you for contacting us! We will get back to you soon.';
        case 'volunteer':
            return 'Thank you for your interest in volunteering! We will contact you shortly.';
        case 'visit':
            return 'Your visit request has been scheduled. We look forward to meeting you!';
        default:
            return 'Form submitted successfully!';
    }
}
