//Tic Tac Toe game made for the Free Code Camp curriculum
//Could not achieve a 'smart computer' using minimax algorithm.

//variables 

var playerChoice, compChoice, playerOrder, compOrder, playerTurn;
var playerMoves = [];
var compMoves = [];
//winning combinations to detect win conditions later
var endingCombos = [
[1,2,3],
[4,5,6],
[7,8,9],
[1,4,7],
[2,5,8],
[3,6,9], 
[1,5,9], 
[3,5,7]];

$(document).ready(function(){   
  preGame();    
//get player preference for X or O and first or second, reset everything on pregame
  function preGame(){
    playerTurn = false;
    $('.game-space-p').delay(1000).fadeOut(400, function(){
       $('.game-space-p').empty().show();
     });
    playerMoves = [];
    compMoves = []; 
    playerChoice = '';
    compChoice = '';
    playerOrder = '';
    compOrder = '';   

    $('#X-or-O').fadeIn(800);  
    //Establishing player as X or O
    $('.XO').unbind('click').click(function(){      
    playerChoice = this.innerHTML;
      if (playerChoice == 'X') {
        compChoice = 'O';
      }
      else {
        compChoice = 'X';
      }      
      $('#X-or-O').fadeOut(400);
      $('#first-or-second').delay(400).fadeIn(1000);
  });
 $('.1st2nd').unbind('click').click(function(){
   //establishing turn order  
   playerOrder = this.innerHTML;
   if (playerOrder == '1st') {
     compOrder = '2nd';
     playerTurn = true;   
   }
   else {
     compOrder = '1st';
     playerTurn = false;     
     compTurn();
   }
   $('#first-or-second').fadeOut(400);
 });
  }
  
  $('.game-space').mousedown(function(){     
    if (playerTurn && $('p', this).text() === '') {     
      $('p', this).text(playerChoice);    
      playerTurn = false;
      playerMoves.push(parseInt(this.getAttribute('id').slice(-1)));
      //keep track of where player moves for scoring later
      if (winner(playerMoves)) {
        $('#you-win').fadeIn(800);
        $('#you-win').delay(1500).fadeOut(800);
        preGame();
      }
      else if (checkCatsGame()) {
        $('#cats-game').fadeIn(800);
        $('#cats-game').delay(1500).fadeOut(800);
        preGame();
      }
      else {
        setInterval(compTurn(), 1000);
        if (winner(compMoves)) {
          $('#you-lose').fadeIn(800);
          $('#you-lose').delay(1500).fadeOut(800);
          preGame();
        } 
        else if (checkCatsGame()) {
          $('#cats-game').fadeIn(800);
          $('#cats-game').delay(1500).fadeOut(800);
          preGame();
        }
      }
    }        
  });  
    
function compTurn(){
  var spaceNum = Math.floor(Math.random() * (9 - 1 + 1)) + 1; 
  var compSpace = '#space' + spaceNum;
  if ($(compSpace).text() === '') {
    $(compSpace).find('p').html(compChoice);    
    compMoves.push(spaceNum);
    playerTurn = true;
    //keep track of where comp moves
  }
  else {
    //re-run to find an empty space if necessary
    compTurn();
  }
}
    
  //some help from @SaintPeter here
  function winner(arr){
    for (var i=0; i<endingCombos.length; i++) {      
        // check to see if this combo exists in the user array
        var result = endingCombos[i].every(function(move) {
                return arr.indexOf(move) !== -1;
      });
      // if we win, return true
      if(result) {
        return true;
      }
    }
  // no wins is false
    return false;
  }
  
  function checkCatsGame(){     
    var catsGame = true;  
    $('p').each(function(){
      if ($(this).text() === '') {
        catsGame = false;
      }      
    });
    return catsGame;
}
});