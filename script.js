document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const leadCaptureOverlay = document.getElementById('lead-capture-overlay');
    const body = document.body;

    // Function to hide the popup
    function hidePopup() {
        leadCaptureOverlay.classList.remove('active');
        body.classList.remove('locked');
    }

    // Check if the form was previously submitted
    if (localStorage.getItem('formSubmitted') === 'true') {
        hidePopup();
    } else {
        // Show popup by default if not previously submitted
        leadCaptureOverlay.classList.add('active');
        body.classList.add('locked');
    }

    // Monitor Mailchimp success message
    const successDiv = document.getElementById('mce-success-response');
    if (successDiv && leadCaptureOverlay) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    if (successDiv.style.display !== 'none') {
                        // Form submitted successfully
                        localStorage.setItem('formSubmitted', 'true');
                        hidePopup();
                        observer.disconnect(); // Stop observing after success
                    }
                }
            });
        });

        observer.observe(successDiv, {
            attributes: true,
            attributeFilter: ['style']
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
