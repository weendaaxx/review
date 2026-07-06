// =========================================
// SHUFFLE
// =========================================

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [array[i], array[j]] =
            [array[j], array[i]];

    }

}

// =========================================
// FORMAT TIME
// =========================================

function formatTime(seconds) {

    const h = Math.floor(seconds / 3600);

    const m = Math.floor((seconds % 3600) / 60);

    const s = seconds % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

}
// =========================================
// SHUFFLE CHOICES
// =========================================

function shuffleChoices(question) {

    // Pair each choice with its original index
    const paired = question.choices.map((choice, index) => ({
        text: choice,
        originalIndex: index
    }));

    // Shuffle the paired array
    shuffle(paired);

    // Find the new correct answer index
    const newAnswer =
        paired.findIndex(
            item => item.originalIndex === question.answer
        );

    return {

        ...question,

        choices: paired.map(item => item.text),

        answer: newAnswer

    };

}