/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// let scores, roundScore, activePlayer, gamePlaying, lastRoll, setScore;

// init()


// document.querySelector('.btn-score').addEventListener('click',function(){
//     setScore = document.querySelector('.score-input').value;
//     document.querySelector('.score-input').placeholder= 'Score set to ' + setScore;
//     document.querySelector('.score-input').value= "";
    
//     console.log(setScore)
// })

// document.querySelector('.btn-roll').addEventListener('click', function() {
//     if(gamePlaying){
//         console.log(setScore)
//         console.log(activePlayer)
//        //Random number
//         let dice0 = Math.ceil(Math.random()*6);
//         let dice1 = Math.ceil(Math.random()*6);
//         console.log("dice0 = " +dice0, "lastRoll0 = " +lastRoll0)
//         console.log("dice1 = " +dice1, "lastRoll1 = " +lastRoll1)

//         //Display the result
//         let diceDom0 = document.querySelector('.dice-0')
//         let diceDom1 = document.querySelector('.dice-1')
//         diceDom0.style.display = 'block';
//         diceDom1.style.display = 'block';
//         diceDom0.src = 'dice-' + dice0 + '.png';
//         diceDom1.src = 'dice-' + dice1 + '.png';
        

//         //Update the round score IF the number was NOT a ONE or if ONE move to next player.
//         if(dice0 > 1 && dice1 > 1) {

//             //If a player rolls two sixes in a row, not on the same turn, then their total score goes to zero and lose their turn.
//             if((lastRoll0 === 6 || lastRoll1 === 6) && (dice0 === 6 || dice1 === 6)){
//                 document.getElementById('score-' + activePlayer).textContent = '0';
//                 scores[activePlayer] = 0;
//                 nextPlayer()
//             } else {
//                 //Adding the current dice to the current score and setting the previous dice to the current dice.
//                 roundScore += dice0 + dice1;
//                 document.querySelector('#current-' + activePlayer).textContent = roundScore;
//                 lastRoll0 = dice0;
//                 lastRoll1 = dice1
//             }
//         } else {
//             //if the player rolled a 1 than their turn is over
//             nextPlayer()
//         } 
//     }
// })

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
         //add current score to global score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]


        //check if player won
        if (scores[activePlayer] >= 50 && setScore === 0) {
            win()
            console.log("normal win")
        } else if(scores[activePlayer] >= setScore && setScore !== 0){
            win()
            console.log("set score win")
        } else { nextPlayer() }  
    }
     
})

function nextPlayer () {
    //sets the current total in active to 0
    document.getElementById('current-' + activePlayer).textContent = '0';

    //changes the active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //sets the variables to 0 for the next player
    roundScore = 0;
    lastRoll0 = 0;
    lastRoll1 = 0;


    //toggles the active class for both players.
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    // document.querySelector('.player-0-panel').classList.remove('active')
    // document.querySelector('.player-1-panel').classList.add('active')

    //takes the previous players dice away to show blank screen.
    setTimeout(function(){ document.querySelector('.dice-0').style.display = 'none'; }, 1000)
    setTimeout(function(){ document.querySelector('.dice-1').style.display = 'none'; }, 1000)
    //Note that the setTimeout functions run in parallel this shows that setTO doesn't stop the rest of the code from running but creates a timer in the background that performs something once the timer has run out.
}

document.querySelector('.btn-new').addEventListener('click', init)

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    lastRoll0 = 0;
    lastRoll1 = 0;
    setScore = 0;


    // document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
    //document.querySelector('#current-' + activePlayer).textContent = dice;

    //hiding the dice
    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';

    //setting the total and current scores to zero
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //setting players names to normal, removing winner class, removing active class and adding it to player the first player.
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')

    //setting the placeholder back to displaying "Score to?"
    document.querySelector('.score-input').placeholder= 'Score to?'
}

function win(){

    //Changing the active player text "WINNER!!!", adding class "winner" and removing class active.
    document.getElementById('name-' + activePlayer).textContent = "WINNER!!!";
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')

    //chaning the dice to not display
    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    gamePlaying = false;
}
