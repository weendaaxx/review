let bookmarkedQuestions = [];

function toggleBookmark(index) {

    if (bookmarkedQuestions.includes(index)) {

        bookmarkedQuestions =
            bookmarkedQuestions.filter(
                i => i !== index
            );

    } else {

        bookmarkedQuestions.push(index);

    }

}

function isBookmarked(index) {

    return bookmarkedQuestions.includes(index);

}