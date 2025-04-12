// JavaScript for Virtus AI Chatbot Guide Website

document.addEventListener('DOMContentLoaded', function() {
    // Lead Capture Form Functionality
    const leadCaptureOverlay = document.getElementById('lead-capture-overlay');
    const body = document.body;
    const mailchimpForm = document.getElementById('mc-embedded-subscribe-form');
    
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
    
    // Handle Mailchimp form submission
    if (mailchimpForm) {
        // Store original Mailchimp form action
        const originalAction = mailchimpForm.getAttribute('action');
        
        mailchimpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(mailchimpForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Store lead data in localStorage for persistence
            localStorage.setItem('virtusLeadData', JSON.stringify(formDataObj));
            
            // Submit the form to Mailchimp using AJAX
            const xhr = new XMLHttpRequest();
            xhr.open('POST', originalAction, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        // Success - show thank you message
                        showSuccessMessage();
                    } else {
                        // Error - show error message
                        const errorResponse = document.getElementById('mce-error-response');
                        if (errorResponse) {
                            errorResponse.innerHTML = 'Ocorreu um erro ao processar seu cadastro. Por favor, tente novamente.';
                            errorResponse.style.display = 'block';
                        }
                    }
                }
            };
            
            // Convert FormData to URL encoded string
            const urlEncodedData = new URLSearchParams(formData).toString();
            xhr.send(urlEncodedData);
        });
    }
    
    // Function to show success message
    function showSuccessMessage() {
        const formContainer = mailchimpForm.parentElement.parentElement;
        formContainer.innerHTML = `
            <div class="success-message">
                <h3>Obrigado!</h3>
                <p>Você agora tem acesso completo ao nosso guia abrangente sobre como transformar suas respostas a leads com chatbots de IA.</p>
                <p>Comece a explorar o conteúdo abaixo para descobrir como você pode aumentar suas taxas de conversão e fazer crescer seu negócio.</p>
                <button class="submit-button" id="access-content-btn">Acessar Conteúdo Agora</button>
            </div>
        `;
        
        // Add event listener to the new button
        document.getElementById('access-content-btn').addEventListener('click', function() {
            hidePopup();
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
});
