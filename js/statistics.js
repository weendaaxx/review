// =========================================
// STATISTICS ENGINE
// =========================================

const STATS_KEY = "psychReviewerStats";

// =========================================
// LOAD ALL STATISTICS
// =========================================

function loadStatistics() {

    const data = localStorage.getItem(STATS_KEY);

    if (data) {

        return JSON.parse(data);

    }

    return {};

}

// =========================================
// SAVE ALL STATISTICS
// =========================================

function saveStatistics(stats) {

    localStorage.setItem(
        STATS_KEY,
        JSON.stringify(stats)
    );

}

// =========================================
// GET STATISTICS OF A SUBJECT
// =========================================

function getStatistics(subjectId) {

    const stats = loadStatistics();

    if (!stats[subjectId]) {

        stats[subjectId] = {

            attempts: 0,

            bestScore: 0,

            averageScore: 0,

            totalScore: 0,

            totalTime: 0,

            lastPlayed: null

        };

        saveStatistics(stats);

    }

    return stats[subjectId];

}

// =========================================
// SAVE A QUIZ RESULT
// =========================================

function saveScore(subjectId, score, timeSpent = 0) {

    const stats = loadStatistics();

    if (!stats[subjectId]) {

        stats[subjectId] = {

            attempts: 0,

            bestScore: 0,

            averageScore: 0,

            totalScore: 0,

            totalTime: 0,

            lastPlayed: null

        };

    }

    const subject = stats[subjectId];

    subject.attempts++;

    subject.totalScore += score;

    subject.averageScore =
        Math.round(
            subject.totalScore /
            subject.attempts
        );

    if (score > subject.bestScore) {

        subject.bestScore = score;

    }

    subject.totalTime += timeSpent;

    subject.lastPlayed =
        new Date().toLocaleString();

    saveStatistics(stats);

}

// =========================================
// RESET ALL STATISTICS
// =========================================

function resetStatistics() {

    localStorage.removeItem(STATS_KEY);

}

// =========================================
// GET ALL SUBJECT STATS
// =========================================

function getAllStatistics() {

    return loadStatistics();

}