/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//document.querySelector('#current-' + activePlayer).textContent = dice;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function() {
    //Random number
    let dice = Math.ceil(Math.random()*6)

    //Display the result
    let diceDom = document.querySelector('.dice')
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
    

    //Update the round score IF the number was NOT a ONE.
    if(dice > 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer()
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]


    //check if player won
    if (scores[activePlayer] >= 20) {
        document.getElementById('name-' + activePlayer).textContent = "WINNER!!!";
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
        document.querySelector('.dice').style.display = 'none';
    }else{ nextPlayer() }    
})

function nextPlayer () {
    document.getElementById('current-' + activePlayer).textContent = '0';

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    // document.querySelector('.player-0-panel').classList.remove('active')
    // document.querySelector('.player-1-panel').classList.add('active')
    setTimeout(function(){ document.querySelector('.dice').style.display = 'none'; }, 1000)
}
