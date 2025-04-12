// JavaScript for Virtus AI Chatbot Guide Website

document.addEventListener('DOMContentLoaded', function() {
    // Lead Capture Form Functionality
    const leadCaptureOverlay = document.getElementById('lead-capture-overlay');
    const leadCaptureForm = document.getElementById('lead-capture-form');
    const body = document.body;
    
    // Function to show the popup
    function showPopup() {
        leadCaptureOverlay.classList.add('active');
        body.classList.add('locked');
    }
    
    // Function to hide the popup
    function hidePopup() {
        leadCaptureOverlay.classList.remove('active');
        body.classList.remove('locked');
    }
    
    // Show popup by default
    showPopup();
    
    // Handle form submission
    if (leadCaptureForm) {
        leadCaptureForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(leadCaptureForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Store lead data in localStorage for persistence
            localStorage.setItem('virtusLeadData', JSON.stringify(formDataObj));
            
            // MailChimp Integration
            // This would typically be handled by a server-side script
            // For demonstration, we'll simulate the integration
            
            console.log('Lead data captured:', formDataObj);
            console.log('Ready to send to MailChimp');
            
            // MailChimp Integration Code
            // In a real implementation, you would use MailChimp's API or embed code
            // Example of how to integrate with MailChimp:
            /*
            // This would typically be on your server to protect your API key
            const mailchimpEndpoint = 'https://[YOUR_DC].api.mailchimp.com/3.0/lists/[YOUR_LIST_ID]/members';
            
            fetch(mailchimpEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': 'apikey [YOUR_API_KEY]',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email_address: formDataObj.email,
                    status: 'subscribed',
                    merge_fields: {
                        FNAME: formDataObj.name,
                        PHONE: formDataObj.phone,
                        COMPANY: formDataObj.company
                    }
                })
            })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
            */
            
         // Show success message and hide popup
        document.addEventListener('DOMContentLoaded', function() {
    const successDiv = document.getElementById('mce-success-response');
    const popupOverlay = document.getElementById('lead-capture-overlay');
    const body = document.body;

    if (successDiv && popupOverlay) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    if (successDiv.style.display !== 'none') {
                        // Form submitted successfully, replace form with success message
                        const form = document.getElementById('mc-embedded-subscribe-form');
                        if (form) {
                            const formContainer = form.parentElement;
                            formContainer.innerHTML = `
                                <div class="success-message">
                                    <h3>Thank You!</h3>
                                    <p>You now have full access to our comprehensive guide on transforming your lead response with AI chatbots.</p>
                                    <p>Start exploring the content below to discover how you can boost your conversion rates and grow your business.</p>
                                    <button class="submit-button" id="access-content-btn">Access Content Now</button>
                                </div>
                            `;

                            // Add event listener to the button
                            const accessBtn = document.getElementById('access-content-btn');
                            accessBtn.addEventListener('click', function() {
                                popupOverlay.classList.remove('active');
                                body.classList.remove('locked');
                            });

                            // Stop observing since we only need to handle success once
                            observer.disconnect();
                        }
                    }
                }
            });
        });

        observer.observe(successDiv, {
            childList: true,
            attributes: true,
            subtree: true
        });
    }
});
            
            // Add event listener to the new button
            document.getElementById('access-content-btn').addEventListener('click', function() {
                hidePopup();
            });
        });
    }
    
    // Check if user has already filled out the form
    const savedLeadData = localStorage.getItem('virtusLeadData');
    if (savedLeadData) {
        // User has already provided their information, hide the popup
        hidePopup();
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
    
    // MailChimp Form Integration Instructions
    /*
    To connect this form to your MailChimp account:
    
    1. Server-side integration (recommended):
       - Create a server-side script (PHP, Node.js, etc.) that handles the form submission
       - Use MailChimp's API to add subscribers to your list
       - This keeps your API key secure
    
    2. MailChimp's embedded form:
       - Replace the form HTML with MailChimp's embedded form code
       - Customize the styling to match the current design
       - Add the required fields (name, email, phone, company)
    
    3. Using MailChimp's jQuery plugin:
       - Include jQuery and the MailChimp jQuery plugin
       - Configure the plugin with your MailChimp endpoint
       - Customize the form submission handling
    
    Example of option 2 (embedded form):
    
    1. Log in to your MailChimp account
    2. Go to Audience > Signup forms > Embedded forms
    3. Customize the form fields to include Name, Email, Phone, Company
    4. Copy the generated code
    5. Replace the <form> element in index.html with the copied code
    6. Adjust the CSS to match your design
    */
});
