// ==========================================================================
// Web Development Lab - JavaScript Functionality
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const helloBtn = document.querySelector('#helloBtn');
    const quoteBtn = document.querySelector('#quoteBtn');
    const statusText = document.querySelector('#status');
    const themeToggleBtn = document.querySelector('#themeToggle');
    const htmlEl = document.documentElement;

    // --------------------------------------------------------------------------
    // 1. Say Hello Button (Lab Requirement)
    // --------------------------------------------------------------------------
    let clickCount = 0;
    if (helloBtn && statusText) {
        helloBtn.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 1) {
                statusText.textContent = 'Hello from GitHub Pages! ✨';
            } else {
                statusText.textContent = `Hello from GitHub Pages! (Clicked ${clickCount} times 🚀)`;
            }
            statusText.style.transform = 'scale(1.05)';
            setTimeout(() => {
                statusText.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // --------------------------------------------------------------------------
    // 2. Dynamic Motivation / Tech Quotes
    // --------------------------------------------------------------------------
    const quotes = [
        '“Automating your deployment saves time and prevents human error.” 🚀',
        '“Continuous Integration & Deployment makes software delivery seamless.” ⚡',
        '“Clean code and good documentation are superpowers.” 💻',
        '“Always test before you deploy!” 🧪',
        '“GitHub Actions: Write once, automate everywhere.” ⚙️'
    ];
    let quoteIndex = 0;

    if (quoteBtn && statusText) {
        quoteBtn.addEventListener('click', () => {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            statusText.textContent = quotes[quoteIndex];
            statusText.style.transform = 'scale(1.05)';
            setTimeout(() => {
                statusText.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // --------------------------------------------------------------------------
    // 3. Theme Toggle (Exercise 3: Light / Dark Mode with Persistence)
    // --------------------------------------------------------------------------
    const applyTheme = (theme) => {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('.theme-icon');
            const label = themeToggleBtn.querySelector('.theme-label');
            if (theme === 'dark') {
                if (icon) icon.textContent = '☀️';
                if (label) label.textContent = 'Light Mode';
            } else {
                if (icon) icon.textContent = '🌙';
                if (label) label.textContent = 'Dark Mode';
            }
        }
    };

    // Load saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
});
