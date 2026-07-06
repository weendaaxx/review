// =========================================
// REVIEW WRONG ANSWERS
// =========================================

function reviewWrongAnswers() {

    // Collect only the wrong questions
    const wrongQuestions = [];

    currentQuiz.forEach((question, index) => {

        if (answerStatus[index] === "wrong") {

            wrongQuestions.push(question);

        }

    });

    if (wrongQuestions.length === 0) {

        alert("🎉 You answered every question correctly!");

        return;

    }

    // Save original quiz
    originalQuiz = [...currentQuiz];

    // Replace current quiz with wrong questions
    currentQuiz = wrongQuestions;

    currentQuestion = 0;

    userAnswers = new Array(currentQuiz.length).fill(null);

    answerStatus = new Array(currentQuiz.length).fill("unanswered");

    score = 0;

    document
        .getElementById("resultScreen")
        .classList.add("hidden");

    document
        .getElementById("quizScreen")
        .classList.remove("hidden");

    loadQuestion();

}