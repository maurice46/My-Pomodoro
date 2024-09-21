document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll("#buttons button");
    const displayTime = document.querySelector("#time-display");

    let podomoro = 25 * 60; // minutes in seconds
    let shortBreak = 5 * 60; 
    let longBreak = 15 * 60;
    let currentTime = podomoro;
    let timer;

    // function for displaying pomodoro, short break, or long break
    const updateDisplay = () => {
        // current time is in seconds, dividing by 60 gives number of complete minutes
        const minutes = Math.floor(currentTime / 60);
        // calculates remainder of current time, gives seconds after minutes are accounted for 
        const seconds = currentTime % 60;
        // padStart ensures two digits, adding leading zero if necessary 
        displayTime.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    // function to start the timer 
    const startTimer = () => {
        clearInterval(timer); // in case a running timer exists
        timer = setInterval(() => {
            if (currentTime > 0){
                currentTime--; // decrement time by 1 second
                updateDisplay(); // refresh display
            } else {
                clearInterval(timer);
                displayTime.textContent = "Time's Up!";
            }
        }, 1000); // will execute arrow function every 1000 milliseconds (update every second)
    }

    // function to pause the timer
    const pauseTimer = () => {
        clearInterval(timer);
    }

    // function to resume the timer
    const resumeTimer = () => {
        startTimer();
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {

            if (button.classList.contains("twentyfive")){
                currentTime = podomoro;
                updateDisplay();
            } else if (button.classList.contains("shortbreak")){
                currentTime = shortBreak;
                updateDisplay();
            } else if (button.classList.contains("longbreak")) {
                currentTime = longBreak;
                updateDisplay();
            }  
        })
        
    });

    document.getElementById("start").addEventListener('click', startTimer);
    document.getElementById("pause").addEventListener('click', pauseTimer);
    document.getElementById("start").addEventListener('click', resumeTimer);
    updateDisplay();

});