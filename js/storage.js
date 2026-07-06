// =========================================
// QUIZ SAVE / RESUME
// =========================================

const QUIZ_SAVE_KEY = "psychReviewerCurrentQuiz";

// =========================================
// SAVE CURRENT QUIZ
// =========================================

function saveCurrentQuiz(){

    const saveData={

        subjectId:currentSubject.id,

        currentQuestion,

        currentQuiz,

        userAnswers,

        answerStatus,

        bookmarkedQuestions,

        flaggedQuestions,

        score,

        elapsedSeconds

    };

    localStorage.setItem(

        QUIZ_SAVE_KEY,

        JSON.stringify(saveData)

    );

}

// =========================================
// LOAD SAVED QUIZ
// =========================================

function loadSavedQuiz(){

    const data=

        localStorage.getItem(QUIZ_SAVE_KEY);

    if(!data) return null;

    return JSON.parse(data);

}

// =========================================
// DELETE SAVED QUIZ
// =========================================

function clearSavedQuiz(){

    localStorage.removeItem(QUIZ_SAVE_KEY);

}