// =========================================
// TIMER
// =========================================

let timerInterval;

let elapsedSeconds = 0;

function startTimer(){

    stopTimer();

    elapsedSeconds = 0;

    updateTimer();

    timerInterval = setInterval(()=>{

        elapsedSeconds++;
       
        updateTimer();
        saveCurrentQuiz();

    },1000);

}

function stopTimer(){

    clearInterval(timerInterval);

}

function updateTimer(){

    const timer =
        document.getElementById("timer");

    if(timer){

        timer.innerText =
            formatTime(elapsedSeconds);

    }

}