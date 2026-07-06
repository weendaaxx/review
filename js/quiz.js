// =========================================
// QUIZ ENGINE V2
// =========================================

// Current subject
let currentSubject = null;

// Questions of current subject
let currentQuiz = [];
let originalQuiz = [];

// Current question number
let currentQuestion = 0;

// Stores selected answer for each question
// Example:
// [2,null,1,3,...]
let userAnswers = [];

// Stores status
// unanswered
// correct
// wrong
let answerStatus = [];
// =========================================
// BOOKMARKS & FLAGS
// =========================================



let flaggedQuestions = [];
// Review Mode
let reviewMode = false;

// Score
let score = 0;

// =========================================
// START QUIZ
// =========================================

async function startQuiz(subject){

    currentSubject = subject;

    // Copy original questions
    originalQuiz = await loadQuestionBank(subject.file);

    currentQuiz = originalQuiz.map(q => ({ ...q }));



    currentQuestion = 0;

    score = 0;

    userAnswers =
        new Array(currentQuiz.length).fill(null);

    answerStatus =
        new Array(currentQuiz.length)
            .fill("unanswered");

    flaggedQuestions =
        new Array(currentQuiz.length)
            .fill(false);

    document
        .getElementById("dashboard")
        .classList.add("hidden");

    document
        .getElementById("resultScreen")
        .classList.add("hidden");

    document
        .getElementById("quizScreen")
        .classList.remove("hidden");

    startTimer();

    loadQuestion();

}

// =========================================
// LOAD QUESTION
// =========================================

function loadQuestion() {

    const q = currentQuiz[currentQuestion];

    const quizScreen = document.getElementById("quizScreen");

    quizScreen.innerHTML = `

    <div class="quiz-header">

        <div>

            <h2 id="subjectTitle"></h2>

        </div>

        <div id="timer">

            02:00:00

        </div>

    </div>

    <div class="quiz-card">

        <h2>${currentSubject.name}</h2>

        <p>
            Question ${currentQuestion + 1}
            of
            ${currentQuiz.length}
        </p>

        <div class="progress">

            <div
                class="progress-fill"
                style="
                width:${((currentQuestion + 1)/currentQuiz.length)*100}%">
            </div>

        </div>
    

        <div class="question-meta">

            <span class="difficulty">

                ⭐ ${q.difficulty}

            </span>

            <span class="topic">

                📚 ${q.topic}

            </span>

            <span class="cognitive">

                🧠 ${q.cognitiveLevel}

            </span>

        </div>

        <h3 class="question">

            ${q.question}

        </h3>

       

        <div id="choices"></div>

        <div
            id="feedback"
            class="feedback">

        </div>

        <div class="navigation">

            <button id="prevBtn">

                ← Previous

            </button>

            <button id="nextBtn">

                Next →

            </button>

        </div>

        <div id="palette">

        </div>

    </div>

    `;

    renderChoices();

    createQuestionPalette();

    document
        .getElementById("prevBtn")
        .onclick = previousQuestion;

    document
        .getElementById("nextBtn")
        .onclick = nextQuestion;


}
// =========================================
// RENDER CHOICES
// =========================================

function renderChoices() {

    const q = currentQuiz[currentQuestion];

    const choicesDiv = document.getElementById("choices");

    choicesDiv.innerHTML = "";

    q.choices.forEach((choice, index) => {

        const btn = document.createElement("button");

        btn.className = "choice";

        btn.innerText = choice;

        // If user already answered
        if (userAnswers[currentQuestion] !== null) {

            btn.disabled = true;

            if (index === q.answer) {

                btn.classList.add("correct");

            }

            if (
                index === userAnswers[currentQuestion] &&
                index !== q.answer
            ) {

                btn.classList.add("wrong");

            }

        }

        btn.onclick = () => {

            selectAnswer(index);

        };

        choicesDiv.appendChild(btn);

    });

    // Restore explanation
    if (userAnswers[currentQuestion] !== null) {

        showExplanation();

    }

}
// =========================================
// SELECT ANSWER
// =========================================

function selectAnswer(selectedIndex) {

    // Prevent answering twice
    if (userAnswers[currentQuestion] !== null)
        return;

    const q = currentQuiz[currentQuestion];

    userAnswers[currentQuestion] = selectedIndex;

    if (selectedIndex === q.answer) {

        answerStatus[currentQuestion] = "correct";

        score++;

    }

    else {

        answerStatus[currentQuestion] = "wrong";

    }

    renderChoices();
    saveCurrentQuiz();
    updateQuestionPalette();

}
// =========================================
// SHOW EXPLANATION
// =========================================

// =========================================
// SHOW EXPLANATION
// =========================================

function showExplanation() {

    const q = currentQuiz[currentQuestion];

    const feedback = document.getElementById("feedback");

    const correct =
        userAnswers[currentQuestion] === q.answer;

    feedback.style.display = "block";

    feedback.className =
        correct
        ? "feedback correct"
        : "feedback wrong";

    let html = `

    <div class="feedback-title">

        <h2>

            <span class="icon">

                ${correct ? "✓" : "✕"}

            </span>

            ${correct ? "Correct" : "Incorrect"}

        </h2>

    </div>

    <h3>

        Correct Answer

    </h3>

    <div class="correct-answer">

    ✅ ${q.choices[q.answer]}

    </div>

    <div class="explanation-card">

        <h3>

            📘 Explanation

        </h3>

        <p>

            ${q.explanation}

        </p>

    </div>

    `;

    // Show incorrect explanations
   if(q.incorrectExplanations){

        html += `

        <div class="section-title">

            ❌ Why the other choices are incorrect

        </div>

        <div class="wrong-container">

        `;

        Object.entries(q.incorrectExplanations).forEach(

            ([index,text])=>{

                html += `

                <div class="wrong-choice">

                    <div class="choice-badge">

                        ${String.fromCharCode(65+Number(index))}

                    </div>

                    <strong>

                        ${q.choices[index]}

                    </strong>

                    <p>

                        ${text}

                    </p>

                </div>

                `;

            }

        );

        html += `</div>`;

    }

    // Board Tip
        if(q.boardTip){

        html += `

        <div class="board-tip">

            <div class="icon">

                💡

            </div>

            <div class="content">

                <strong>

                    Board Tip

                </strong>

                <p>

                    ${q.boardTip}

                </p>

            </div>

        </div>

        `;

    }
        if(q.keywords){

        html += `

        <div class="keyword-box">

            <h3>

                🏷 Keywords

            </h3>

        `;

        q.keywords.forEach(keyword=>{

            html += `

            <span class="keyword">

                ${keyword}

            </span>

            `;

        });

        html += `

        </div>

        `;

    }

    feedback.innerHTML = html;

}
// =========================================
// PREVIOUS QUESTION
// =========================================

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();
        saveCurrentQuiz();

    }

}
// =========================================
// NEXT QUESTION
// =========================================

function nextQuestion() {

    if (currentQuestion < currentQuiz.length - 1) {

        currentQuestion++;

        loadQuestion();
        saveCurrentQuiz();

    } else {

        finishQuiz();

    }

}
// =========================================
// CREATE QUESTION PALETTE
// =========================================

function createQuestionPalette() {

    const palette =
        document.getElementById("palette");

    palette.innerHTML = "";

    currentQuiz.forEach((q, index) => {

        const btn =
            document.createElement("button");

        btn.className = "palette-btn";

        btn.innerText = index + 1;

        if (index === currentQuestion) {

            btn.classList.add("current");

        }

        if (answerStatus[index] === "correct") {

            btn.classList.add("correct");

        }

        if (answerStatus[index] === "wrong") {

            btn.classList.add("wrong");

        }
   

        if(flaggedQuestions[index]){

            btn.classList.add("flagged");

        }
        

        btn.onclick = () => {

            currentQuestion = index;

            loadQuestion();

        };

        palette.appendChild(btn);

    });

}
// =========================================
// UPDATE QUESTION PALETTE
// =========================================

function updateQuestionPalette() {

    createQuestionPalette();

}
// =========================================
// FINISH QUIZ
// =========================================

// =========================================
// FINISH QUIZ
// =========================================

function finishQuiz() {

    stopTimer();

    clearSavedQuiz();

    document
        .getElementById("quizScreen")
        .classList.add("hidden");

    document
        .getElementById("resultScreen")
        .classList.remove("hidden");

    const total = currentQuiz.length;

    const correct = score;

    const wrong = total - score;

    const percent =
        Math.round((correct / total) * 100);

    saveScore(
        currentSubject.id,
        percent,
        elapsedSeconds
    );

    const stats =
        getStatistics(currentSubject.id);

    document.getElementById("resultScreen").innerHTML = `

    <div class="result-card">

    <h1>🎉 Quiz Finished</h1>

    <h2>${currentSubject.name}</h2>

    <div class="result-score">

    ${correct} / ${total}

    </div>

    <div class="result-percent">

    ${percent}%

    </div>

    <div class="result-grid">

    <div>

    ✅ Correct

    <h2>${correct}</h2>

    </div>

    <div>

    ❌ Wrong

    <h2>${wrong}</h2>

    </div>

    <div>

    ⏱ Time

    <h2>${formatTime(elapsedSeconds)}</h2>

    </div>

    <div>

    🏆 Best

    <h2>${stats.bestScore}%</h2>

    </div>

    <div>

    📈 Average

    <h2>${stats.averageScore}%</h2>

    </div>

    <div>

    📝 Attempts

    <h2>${stats.attempts}</h2>

    </div>

    </div>

    <div class="result-buttons">

    <button onclick="showDashboard()">

    🏠 Home

    </button>

    <button onclick="startQuiz(currentSubject)">

    🔄 Retry

    </button>

    <button onclick="exportResults()">

    📄 Export

    </button>

    </div>

    </div>

    `;

}
// =========================================
// HOME
// =========================================

function showDashboard() {

    document
        .getElementById("dashboard")
        .classList.remove("hidden");

    document
        .getElementById("quizScreen")
        .classList.add("hidden");

    document
        .getElementById("resultScreen")
        .classList.add("hidden");

    createDashboard();

}


// =========================================
// FLAG
// =========================================

function toggleFlag() {

    flaggedQuestions[currentQuestion] =
        !flaggedQuestions[currentQuestion];

    createQuestionPalette();

}


// =========================================
// RESUME QUIZ
// =========================================

function resumeQuiz(data){

    currentSubject=

        subjects.find(

            s=>s.id===data.subjectId

        );

    currentQuiz=data.currentQuiz;

    currentQuestion=data.currentQuestion;

    userAnswers=data.userAnswers;

    answerStatus=data.answerStatus;

    

    flaggedQuestions=data.flaggedQuestions;

    score=data.score;

    elapsedSeconds=data.elapsedSeconds;

    document

        .getElementById("dashboard")

        .classList.add("hidden");

    document

        .getElementById("quizScreen")

        .classList.remove("hidden");

    loadQuestion();

    startTimer();

}