document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("internship-form");
    const status = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // UI Feedback
            submitBtn.disabled = true;
            submitBtn.innerText = document.body.classList.contains("lang-fi") ? "Lähetetään..." : "Sending...";
            status.style.display = "none";

            const formData = {
                company: document.getElementById("company").value,
                name: document.getElementById("name").value,
                contact: document.getElementById("user-contact").value,
                message: document.getElementById("message").value,
                timestamp: new Date().toLocaleString()
            };

            // NOTE: The user needs to replace this URL with their Google Apps Script Web App URL
            const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbykunVrtoLt1jjNRwEPkmcFxlWwWEjBYW42eE6IarxFmyvVpIaiTtaR_i08XhTV1nzf/exec";

            try {
                // If the URL is still the placeholder, we'll simulate a success for now 
                // so the user can see the UI working, but warn them in the console.
                if (GOOGLE_SCRIPT_URL.includes("YOUR_SCRIPT_ID")) {
                    console.warn("Form Submission: Google Script URL not configured. Simulating success.");
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } else {
                    await fetch(GOOGLE_SCRIPT_URL, {
                        method: "POST",
                        mode: "no-cors", // Required for Google Apps Script
                        cache: "no-cache",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData)
                    });
                }

                status.innerText = document.body.classList.contains("lang-fi") ? "Kiitos! Viestisi on lähetetty." : "Thank you! Your message has been sent.";
                status.className = "success";
                form.reset();
            } catch (error) {
                console.error("Submission Error:", error);
                status.innerText = document.body.classList.contains("lang-fi") ? "Hups! Jotain meni vikaan. Yritä uudelleen." : "Oops! Something went wrong. Please try again.";
                status.className = "error";
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = document.body.classList.contains("lang-fi") ? "Lähetä" : "Submit";
            }
        });
    }
});
