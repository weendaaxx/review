// =========================================
// MOCK BOARD EXAM
// =========================================

function startMockExam() {

    // Collect all questions
    let allQuestions = [];

    subjects.forEach(subject => {

        const taggedQuestions = subject.questions.map(q => ({
            ...q,
            subject: subject.name
        }));

        allQuestions.push(...taggedQuestions);

    });

    // Shuffle all questions
   shuffle(allQuestions);

    currentQuiz = allQuestions
        .slice(0,100)
        .map(q => shuffleChoices(q));

    currentSubject = {

        id: "mock",

        name: "Mock Board Exam"

    };

    currentQuestion = 0;

    score = 0;

    userAnswers = new Array(currentQuiz.length).fill(null);

    answerStatus = new Array(currentQuiz.length).fill("unanswered");

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