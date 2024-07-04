let score = JSON.parse(localStorage.getItem('score')) || {
    Win: 0,
    Lose: 0,
    Tie: 0
};
const updateScore = () => {
    const myScore = document.getElementById("myScore");
    const compScore = document.getElementById("compScore");
    const draws = document.getElementById("draws");
    myScore.innerHTML = `${score.Win}`;
    compScore.innerHTML = `${score.Lose}`;
    draws.innerHTML = `${score.Tie}`;
}
updateScore();
const resetButton = () => {
    localStorage.removeItem('score');
    score.Win = 0;
    score.Lose = 0;
    score.Tie = 0;
    updateScore();
};

const compMove = () => {
    const randomNumber = Math.random();
    let Computermove = '';
    if (randomNumber >= 0 && randomNumber < 0.33){
        Computermove = "rock";
    }
    else if(randomNumber >= 0.33 && randomNumber <= 0.67){
        Computermove = "paper";
    }
    else if (randomNumber > 0.67 && randomNumber <= 1){
        Computermove = "scissor";
    }
    console.log (Computermove);
    return Computermove;
}

let isAutoPlaying = false;
let intervalId;
const autoPlay = () => {
    const autoPlayBtn = document.getElementById("autoPlayBtn");
    if (!isAutoPlaying) {
        intervalId = setInterval(function(){
            const playerMove = compMove();
            playGame(playerMove);
        },1000)
        isAutoPlaying = true;
        autoPlayBtn.textContent = "Stop"; 
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoPlayBtn.textContent = "Auto Play";
    }
}

const playGame = (playerMove) => {
    const moves = document.getElementById("moves");
    const Computermove = compMove();
    
    let result = '';
    if (playerMove === "rock"){
        if (Computermove === "rock"){
            result = "Draw!";
        }
        else if (Computermove === "paper"){
            result = "You Lose!";
        }
        else if (Computermove === "scissor"){
            result = "You Win!";
        }
    }
    else if (playerMove === "paper"){
        if (Computermove === "rock"){
            result = "You Win!";
        }
        else if (Computermove === "paper"){
            result = "Draw!";
        }
        else if (Computermove === "scissor"){
            result = "You Lose!";
        }
    }
    else if (playerMove === "scissor"){
        if (Computermove === "rock"){
            result = "You Lose!";
        }
        else if (Computermove === "paper"){
            result = "You Win!";
        }
        else if (Computermove === "scissor"){
            result = "Draw!";
        }
    }
    if (result === "You Win!"){
        score.Win += 1;
        myScore.innerHTML = `${score.Win}`;
    }
    else if (result === "You Lose!"){
        score.Lose += 1;
        compScore.innerHTML = `${score.Lose}`;
    }
    else if (result === "Draw!"){
        score.Tie += 1;
        draws.innerHTML = `${score.Tie}`;
    }
    localStorage.setItem('score', JSON.stringify(score));
    moves.innerHTML = 
        `<p class="myMove" style="text-align: center;">Your Move <br>
            <img src="assets/${playerMove}-emoji.png" alt=""> 
        </p>    
        <p class="resultDisplay">
            ${result}
        </p>
        <p class="compMove" style="text-align: center;">Computer's Move <br>
            <img src="assets/${Computermove}-emoji.png" alt=""> 
        </p>`;
    console.log(score);
}

