// =========================================
// DASHBOARD
// =========================================

// List of all available subjects
const subjects = [

    {
        id: "developmental",
        name: "Developmental Psychology",
        icon: "🧠",
        file: "developmental.json",
        total: 100
    },

    {
        id: "abnormal",
        name: "Abnormal Psychology",
        icon: "🧩",
        file: "abnormal.json",
        total: 100
    },

    {
        id: "assessment",
        name: "Psychological Assessment",
        icon: "📋",
        file: "assessment.json",
        total: 100

    },

    {
        id: "industrial",
        name: "Industrial Psychology",
        icon: "💼",
        file: "industrial.json",
        total: 100
    }

];

// =========================================
// CREATE DASHBOARD
// =========================================

function createDashboard() {

    const dashboard =
        document.getElementById("dashboard");

    dashboard.innerHTML = "";

    subjects.forEach(subject => {

        dashboard.appendChild(
            createSubjectCard(subject)
        );

    });

    dashboard.appendChild(
        createMockExamCard()
    );

}

// =========================================
// SUBJECT CARD
// =========================================

function createSubjectCard(subject) {

    const stats =
        getStatistics(subject.id);

    const card =
        document.createElement("div");

    card.className = "subject-card";

    const progress =
        stats.bestScore || 0;

    card.innerHTML = `

        <h2>

            ${subject.icon}
            ${subject.name}

        </h2>

        <p>

            📚 Questions:
            ${subject.total}

        </p>

        <p>

            🏆 Best Score:
            ${progress}%

        </p>

        <p>

            📝 Attempts:
            ${stats.attempts}

        </p>

        <div class="progress">

            <div
                class="progress-fill"
                style="
                width:${progress}%">

            </div>

        </div>

        <button
            class="primary-btn">

            Practice

        </button>

    `;

    card
        .querySelector("button")
        .onclick = () => {

            startQuiz(subject);

        };

    return card;

}

// =========================================
// MOCK EXAM CARD
// =========================================

function createMockExamCard() {

    const card =
        document.createElement("div");

    card.className =
        "subject-card";

    const totalQuestions =
       subjects.reduce(

            (sum, subject)=> sum + subject.total,

            0

        );

    card.innerHTML = `

        <h2>

            🎯 Mock Board Exam

        </h2>

        <p>

            Mixed Questions

        </p>

        <p>

            Available:

            ${totalQuestions}

        </p>

        <p>

            100 Random Questions

        </p>

        <button
            class="success-btn">

            Start Mock Exam

        </button>

    `;

    card
        .querySelector("button")
        .onclick = () => {

            startMockExam();

        };

    return card;

}