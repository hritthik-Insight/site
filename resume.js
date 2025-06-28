// Configuration constants at the top
const CONFIG = {
    RESUME_FILENAME: "HritthikBose-resume-0625.pdf",
    RESUME_DISPLAY_NAME: "Hritthik Bose - Resume.pdf",
};

document.addEventListener("DOMContentLoaded", function () {
    // Theme toggle functionality
    const themeBulb = document.getElementById("theme-toggle-bulb");
    const lightIcon = themeBulb.querySelector(".light-icon");
    const darkIcon = themeBulb.querySelector(".dark-icon");

    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute("data-theme", "dark");
        lightIcon.style.display = "none";
        darkIcon.style.display = "block";
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        lightIcon.style.display = "block";
        darkIcon.style.display = "none";
    }

    // Toggle theme when bulb is clicked
    themeBulb.addEventListener("click", function () {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");
        let newTheme;

        if (currentTheme === "light") {
            newTheme = "dark";
            lightIcon.style.display = "none";
            darkIcon.style.display = "block";
            // Add a small animation effect that preserves vertical centering
            themeBulb.style.transform = "translateY(-50%) scale(1.2)";
            setTimeout(() => {
                themeBulb.style.transform = "translateY(-50%) scale(1)";
            }, 300);
        } else {
            newTheme = "light";
            lightIcon.style.display = "block";
            darkIcon.style.display = "none";
            // Add a small animation effect that preserves vertical centering
            themeBulb.style.transform = "translateY(-50%) scale(1.2)";
            setTimeout(() => {
                themeBulb.style.transform = "translateY(-50%) scale(1)";
            }, 300);
        }

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    // Resume PDF generation
    const resumeButton = document.getElementById("resumeButton");

    // Resume PDF generation functionality - download pdf.
    resumeButton.addEventListener("click", async function () {
        try {
            // Fetch the PDF as a blob to ensure proper handling
            const response = await fetch(CONFIG.RESUME_FILENAME);

            if (!response.ok) {
                throw new Error("PDF file not found");
            }

            const blob = await response.blob();

            // Create blob URL
            const blobUrl = window.URL.createObjectURL(blob);

            // Create download link
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = CONFIG.RESUME_DISPLAY_NAME;

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up blob URL
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download failed:", error);
            // Fallback to direct link
            window.open(CONFIG.RESUME_FILENAME, "_blank");
        }
    });

    const navbar = document.querySelector(".navbar");
    const offset = navbar.offsetHeight; // You can adjust this value as needed
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            const top = target.offsetTop - offset;
            window.scrollTo({
                top: top,
                behavior: "smooth",
            });
        });
    });

    function adjustWrapperMargin() {
        var navbarHeight = document.querySelector(".navbar").offsetHeight;
        document.querySelector(".wrapper").style.marginTop =
            navbarHeight + 5 + "px";
    }

    window.onload = adjustWrapperMargin;
    window.onresize = adjustWrapperMargin;

    // Handle contact form submission - COMMENTED OUT
    /*
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Create success message
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <h3>Thank you for your message!</h3>
                <p>Hi ${name}, I've received your message and will get back to you soon.</p>
                <button id="newMessageBtn" class="submit-btn">Send another message</button>
            `;
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // Add event listener to "Send another message" button
            document.getElementById('newMessageBtn').addEventListener('click', function() {
                contactForm.reset();
                successMessage.remove();
                contactForm.style.display = 'flex';
            });
        });
    }
    */
});

// Add CSS for success message
const style = document.createElement("style");
style.textContent = `
    .success-message {
        background-color: var(--bg-color);
        padding: 20px;
        border-radius: 4px;
        border: 1px solid var(--border-color);
        margin-top: 20px;
        text-align: center;
    }
    
    .success-message h3 {
        color: var(--link-color);
        margin-top: 0;
    }
`;
document.head.appendChild(style);
