document.addEventListener("DOMContentLoaded", () => {
    const langToggle = document.getElementById("lang-toggle");
    const body = document.body;

    // Check for saved language preference
    const savedLang = localStorage.getItem("portfolio-lang") || "en";
    setLanguage(savedLang);

    if (langToggle) {
        langToggle.addEventListener("click", () => {
            const currentLang = body.classList.contains("lang-fi") ? "en" : "fi";
            setLanguage(currentLang);
        });
    }

    function setLanguage(lang) {
        if (lang === "fi") {
            body.classList.add("lang-fi");
            body.classList.remove("lang-en");
            if (langToggle) langToggle.innerText = "FI / EN";
        } else {
            body.classList.add("lang-en");
            body.classList.remove("lang-fi");
            if (langToggle) langToggle.innerText = "EN / FI";
        }
        localStorage.setItem("portfolio-lang", lang);
    }
});
