/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, lastRoll, setScore;

init()


document.querySelector('.btn-score').addEventListener('click',function(){
    setScore = document.querySelector('.score-input').value;
    console.log(setScore)
})

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying){
       //Random number
        let dice = Math.ceil(Math.random()*6)
        console.log("dice = " +dice, "lastRoll = " +lastRoll)

        //Display the result
        let diceDom = document.querySelector('.dice')
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
        

        //Update the round score IF the number was NOT a ONE or if ONE move to next player.
        if(dice > 1) {
            if(lastRoll === 6 && dice === 6){
                nextPlayer()
            } else {
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                lastRoll = dice;
            }
        } else {
            nextPlayer()
        } 
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
         //add current score to global score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]


        //check if player won
        if (scores[activePlayer] >= 20 && setScore === 0) {
            win()
            console.log("normal win")
        } else if(scores[activePlayer] >= setScore && setScore !== 0){
            win()
            console.log("set score win")
        } else { nextPlayer() }  
    }
     
})

function nextPlayer () {
    document.getElementById('current-' + activePlayer).textContent = '0';

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastRoll = 0;

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    // document.querySelector('.player-0-panel').classList.remove('active')
    // document.querySelector('.player-1-panel').classList.add('active')
    setTimeout(function(){ document.querySelector('.dice').style.display = 'none'; }, 1000)
}

document.querySelector('.btn-new').addEventListener('click', init)

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    lastRoll = 0;
    setScore = 0;
    console.log(setScore)


    // document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
    //document.querySelector('#current-' + activePlayer).textContent = dice;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}

function win(){
    document.getElementById('name-' + activePlayer).textContent = "WINNER!!!";
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
    document.querySelector('.dice').style.display = 'none';
    gamePlaying = false;
}
