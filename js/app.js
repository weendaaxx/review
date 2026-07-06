// =========================================
// APP INITIALIZATION
// =========================================

document.addEventListener("DOMContentLoaded", initApp);

// =========================================
// START APPLICATION
// =========================================

function initApp() {

    loadTheme();

    const saved=loadSavedQuiz();

    if(saved){

        if(confirm("Resume previous quiz?")){

            resumeQuiz(saved);

            return;

        }

        clearSavedQuiz();

    }

    createDashboard();

    attachHeaderButtons();

}

// =========================================
// HEADER BUTTONS
// =========================================

function attachHeaderButtons() {

    const darkBtn =
        document.getElementById("darkModeBtn");

    if (darkBtn) {

        darkBtn.onclick = toggleDarkMode;

    }

    const settingsBtn =
        document.getElementById("settingsBtn");

    if (settingsBtn) {

        settingsBtn.onclick = openSettings;

    }

}

// =========================================
// DARK MODE
// =========================================

function toggleDarkMode() {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "darkMode",
        dark
    );

    updateDarkButton();

}

function loadTheme() {

    const dark =
        localStorage.getItem("darkMode");

    if (dark === "true") {

        document.body.classList.add("dark");

    }

    updateDarkButton();

}

function updateDarkButton() {

    const btn =
        document.getElementById("darkModeBtn");

    if (!btn) return;

    if (
        document.body.classList.contains("dark")
    ) {

        btn.innerHTML = "☀️";

    }

    else {

        btn.innerHTML = "🌙";

    }

}

// =========================================
// SETTINGS
// =========================================

function openSettings() {

    alert(
`Settings

This page will be added later.

Future features:

• Timer On/Off
• Shuffle Questions
• Shuffle Choices
• Question Count
• Reset Progress
• Import Questions
• Export Progress`
    );

}

// =========================================
// RETURN TO HOME
// =========================================

function goHome() {

    showDashboard();

}

// =========================================
// REBUILD DASHBOARD
// =========================================

function refreshDashboard() {

    createDashboard();

}
const SETTINGS_KEY = "psychReviewerSettings";

function loadSettings() {

    return JSON.parse(
        localStorage.getItem(SETTINGS_KEY)
    ) || {

        shuffleQuestions: true,

        shuffleChoices: true,

        showTimer: true

    };

}