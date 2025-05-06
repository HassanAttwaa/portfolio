// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Theme Switcher
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme);

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});

// Scroll Progress Bar
const progressBar = document.querySelector('.progress-bar');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');
const submitBtn = contactForm.querySelector('.submit-btn');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Basic form validation
    let isValid = true;
    formInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.parentElement.classList.add('error');
        } else {
            input.parentElement.classList.remove('error');
        }
    });

    if (isValid) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const templateParams = {
                from_name: contactForm.querySelector('#name').value,
                from_email: contactForm.querySelector('#email').value,
                message: contactForm.querySelector('#message').value,
                to_name: 'Hassan Attwa',
                to_email: 'hattwa@outlook.com'
            };

            await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
            
            // Show success message
            submitBtn.textContent = 'Message Sent!';
            contactForm.reset();
            
            // Redirect to thank you page
            setTimeout(() => {
                window.location.href = 'thanks.html';
            }, 1500);
        } catch (error) {
            console.error('Error sending email:', error);
            submitBtn.textContent = 'Error! Try Again';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    }
});

// Certificate Gallery Image Preview
const certificateImages = document.querySelectorAll('.certificate-image img, .icdl-image img');

certificateImages.forEach(img => {
    img.addEventListener('click', () => {
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        preview.innerHTML = `
            <div class="preview-content">
                <img src="${img.src}" alt="Certificate Preview">
                <button class="close-preview">&times;</button>
            </div>
        `;
        
        document.body.appendChild(preview);
        document.body.style.overflow = 'hidden';

        preview.querySelector('.close-preview').addEventListener('click', () => {
            preview.remove();
            document.body.style.overflow = '';
        });

        preview.addEventListener('click', (e) => {
            if (e.target === preview) {
                preview.remove();
                document.body.style.overflow = '';
            }
        });
    });
});

// Add CSS for image preview
const style = document.createElement('style');
style.textContent = `
    .image-preview {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .preview-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }

    .preview-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }

    .close-preview {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
    }

    .form-group.error input,
    .form-group.error textarea {
        border-bottom-color: #ff4444;
    }

    .form-group.error label {
        color: #ff4444;
    }
`;
document.head.appendChild(style); 