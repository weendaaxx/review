// =========================================
// LOAD QUESTION BANK
// =========================================

async function loadQuestionBank(fileName) {

    const response = await fetch(`data/${fileName}`);

    if (!response.ok) {

        throw new Error(`Failed to load ${fileName}`);

    }

    return await response.json();

}