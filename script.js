// Main DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
    function adjustLayout() {
        const width = window.innerWidth;

        // If the screen width is less than or equal to 768px (commonly tablet and mobile)
        if (width <= 768) {
            // Modify layout for mobile view
            document.body.style.fontSize = '14px';
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.flexDirection = 'column';
                navbar.style.width = '100%';
            }

            // Example: Make projects grid stack vertically
            const grid = document.querySelector('.grid');
            if (grid) {
                grid.style.gridTemplateColumns = '1fr';
            }
        } else {
            // Reset to desktop view
            document.body.style.fontSize = '16px';
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.flexDirection = 'row';
                navbar.style.width = '80%';
            }

            const grid = document.querySelector('.grid');
            if (grid) {
                grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            }
        }
    }

    // Scroll Animation using Intersection Observer
    const sections = document.querySelectorAll('.content-section');

    const options = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Adjust layout on window resize
    window.addEventListener('resize', adjustLayout);
    adjustLayout();

    // Function to highlight active section in navbar
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar nav ul li a');
    
        let currentSection = '';
    
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
    
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
    
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Welcome text pop-out effect
    const welcomeText = document.querySelector('.pop-out-text');
    const paragraph = document.querySelector('.pop-out-paragraph');

    // Immediately pop out the welcome text
    welcomeText.classList.add('pop-out');

    // Use a timeout to add the pop-out effect to the paragraph after 1 second
    setTimeout(() => {
        paragraph.classList.add('pop-out');
    }, 1000);

    // Typewriter Effect
    function typeWriter(element, texts, delay = 150, pause = 1500) {
        let currentTextIndex = 0; // Track the current text index
        let currentCharIndex = 0; // Track the character index for typing
        let isDeleting = false; // Flag to check if we're deleting

        function type() {
            const currentText = texts[currentTextIndex];
            const textToDisplay = isDeleting 
                ? currentText.substring(0, currentCharIndex--) // Deleting characters
                : currentText.substring(0, currentCharIndex++); // Typing characters

            // Update the inner HTML of the dynamic text span
            element.innerHTML = textToDisplay;

            // Check if we need to switch between typing and deleting
            if (!isDeleting && currentCharIndex === currentText.length) {
                setTimeout(() => { isDeleting = true; }, pause); // Pause before deleting
            } else if (isDeleting && currentCharIndex < 0) {
                isDeleting = false; // Start typing next text
                currentTextIndex = (currentTextIndex + 1) % texts.length; // Move to the next text
                currentCharIndex = 0; // Reset character index for new text
            }

            // Continue typing or deleting
            setTimeout(type, isDeleting ? 75 : delay); // Speed for typing or deleting
        }

        type(); // Start the typing effect
    }

    // Setup Typewriter Effect for About Section
    const aboutSection = document.getElementById('about');
    const dynamicTextElement = document.querySelector('.dynamic-text');
    const typewriterTexts = ["Student.", "Fast Learner.", "Developer."]; // Add your phrases here

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(dynamicTextElement, typewriterTexts); // Trigger typewriter effect
                aboutObserver.unobserve(entry.target); // Stop observing after it has been triggered
            }
        });
    });

    // Observe the About section for typewriter effect
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    // Form validation function
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || message === '') {
                alert('Please fill out all fields.');
                event.preventDefault();
            }
        });
    }

    // Submit button function
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const subject = 'Contact Form Submission from ' + name;
        const body = `${message}`;
        const mailtoLink = `mailto:ahmad.syaifuddin@binus.ac.id?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        const confirmation = confirm("Do you want to open Outlook to send this message?");
        
        if (confirmation) {
            window.location.href = mailtoLink;
        } else {
            alert("Message not sent.");
        }
    });
});

// Lightbox Functionality
function openLightbox(image) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.display = "block";
    lightboxImg.src = image.src;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = "none";
}
