// JavaScript for Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
    }

    // Toggle dark mode on switch change
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // Basic form submission handling (for demonstration, no actual backend)
    const bookingForm = document.querySelector('.booking-form-section form');
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // You can add more sophisticated form validation here
        if (this.checkValidity()) {
            // In a real application, you would send this data to a server
            console.log('Form submitted successfully!');
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            console.log('Booking Details:', formObject);

            // Display a simple confirmation message (instead of alert)
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-check-circle me-2"></i>Booking Submitted!';
            submitButton.classList.remove('btn-primary');
            submitButton.classList.add('btn-success');
            submitButton.disabled = true;

            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.classList.remove('btn-success');
                submitButton.classList.add('btn-primary');
                submitButton.disabled = false;
                this.reset(); // Reset the form after a short delay
            }, 3000); // Reset after 3 seconds
        } else {
            // If form is invalid, Bootstrap will show validation messages
            console.log('Form validation failed.');
        }
    });
});