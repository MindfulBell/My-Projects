//Simon Game created for the FreeCodeCamp curriculum. Strong exercise in functional programming, timing, and some jQuery! HAVE FUN!

var simonTurn, playerTurn, lightSpeed, simonSpeed;
var strict = false;
var gameOn = false;
var started = false;
var score = 0;
var grn = '#top-left-green';
var red = '#top-right-red';
var yel = '#bot-left-yel';
var blue = '#bot-right-blue';
var grn1Audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
grn1Audio.playbackRate = 1.25;
var red2Audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
red2Audio.playbackRate = 1.25;
var yel3Audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
yel3Audio.playbackRate = 1.25;
var blue4Audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
blue4Audio.playbackRate = 1.25;
var simonsMoves = [];
var playerMoves = [];
$(document).ready(function(){
  //resets to defaults
  function reset(){

    simonsMoves = [];
    playerMoves = [];
    score = 0;
    simonTurn = false;
    playerTurn = false;
    $('#count-num').text('--');


  }
  //simon has diff lightup behavior than player, so this is just for simon
  function simonlightUp(move){
    switch (move) {
      case 1:
          setTimeout(function(){
            grn1Audio.play();
            $(grn).css('background-color', '#00ff00')}, 300);
          setTimeout(function(){
            $(grn).css('background-color', 'green');
          }, lightSpeed);
          break;
        case 2:
          setTimeout(function(){
            red2Audio.play();
            $(red).css('background-color', '#ff1a1a')}, 300);
          setTimeout(function(){
            $(red).css('background-color', '#cc0000');
          }, lightSpeed);
          break;
        case 3:
          setTimeout(function(){
            yel3Audio.play();
            $(yel).css('background-color', '#ffffb3')}, 300);
          setTimeout(function(){
            $(yel).css('background-color', '#e4e600');
          }, lightSpeed);
          break;
        default:
          setTimeout(function(){
            blue4Audio.play();
            $(blue).css('background-color', '#b3d1ff')}, 300);
          setTimeout(function(){
            $(blue).css('background-color', '#0052cc');
          }, lightSpeed);
          break;
      }
  }
  //increases the speed based on length of players moves
  function speedCheck(step){
    if (step >=4 && step < 8) {
      //Lv2
      lightSpeed = 800;
      simonSpeed = 800;
    }
    else if (step >= 8 && step < 12) {
      //Lv3
      lightSpeed = 600;
      simonSpeed = 600;
    }
    else if (step >= 12) {
      //Lv4
      lightSpeed = 450;
      simonSpeed = 450;
    }
    else {
      //Lv1
      lightSpeed = 1000;
      simonSpeed = 1000;
    }
  }
 //Simons functionality got some help here from stackoverflow: users akosel and Arg0n
  function simonSaysLv1(){
    simonsMoves.push(Math.floor(Math.random() * (4-1+1)) + 1);
    doSimonMove(0);
  }
  function doSimonMove(index){
    if(index < simonsMoves.length){
      simonlightUp(simonsMoves[index]);
      setTimeout(function(){
        doSimonMove(index + 1);
        if (index + 1 === simonsMoves.length) {
          playerTurn = true; //prevents player from clicking on board when not their turn
          simonTurn = false;
            }
      }, simonSpeed);
    }
  }
  //on off switch
  $('#on-off').click(function(){
    var switchMargin = $('.switch').css('margin-left');
    if (switchMargin === '0px') {
      $('.switch').css('margin-left', '53px');
      gameOn = true;
    }
    else {
      $('.switch').css('margin-left', '0px');
      gameOn = false;
      started = false;
      reset();
    }
  });
  //strict mode (i.e. mess up and its over)
  $('#strict').click(function(){
    if (!strict) {
      strict = true;
      $('#strict').css('border-color', '#99ff66');
    }
    else {
      strict = false;
      $('#strict').css('border-color', '#00001a');
    }
  });
  //start the game already!
  $('#start-button').click(function(){
    if (gameOn && !started) {
      $('#count-num').text(simonsMoves.length+1);
      speedCheck(simonsMoves.length);
      setTimeout(simonSaysLv1, 800);
      simonTurn = true;
      started = true;
    }
    else if (!gameOn) {
      shake('#on-off');
    }
  });
  //shake various things, one to alert user that they didn't turn on the game, 2 shake the board if they mess up
  function shake(area) {
    $(area).removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass();
    });
  }
  //checks for errors
  function checkLoss(){
    for (var i=0; i<playerMoves.length; i++) {
      if (playerMoves[i] !== simonsMoves[i]) {
        return true;
      }
    }
  }
  //player clicking down on buttons
  $('.sim-button').mousedown(function(){
    if (playerTurn && started && gameOn) {
    var playerPress = '#' + this.id;
    switch(playerPress){
      case grn:
        grn1Audio.play();
        $(grn).css('background-color', '#00ff00');
        playerMoves.push(1);
        break;
      case red:
        red2Audio.play();
        $(red).css('background-color', '#ff1a1a');
        playerMoves.push(2);
        break;
      case yel:
        yel3Audio.play();
        $(yel).css('background-color', '#ffffb3');
        playerMoves.push(3);
        break;
      default:
        blue4Audio.play();
        $(blue).css('background-color', '#b3d1ff');
        playerMoves.push(4);
        break;
    }
    }
  });
  //letting go of click, this allows for lighting up to be more fluid with how user clicks
  $('.sim-button').mouseup(function(){
    if (playerTurn && started && gameOn) {
    var playerPress = '#' + this.id;
    switch(playerPress){
      case grn:
        $(grn).css('background-color', 'green');
        break;
      case red:
        $(red).css('background-color', '#cc0000');
        break;
      case yel:
        $(yel).css('background-color', '#e4e600');
        break;
      default:
        $(blue).css('background-color', '#0052cc');
        break;
    }
      //player win
      if (playerMoves.length === 21) {
        $('#win-message').fadeIn().delay(3000).fadeOut();
        setTimeout(reset, 3000);
        $('.switch').css('margin-left', '0px');
        started = false;
      }
      //fail on strict
      else if (checkLoss() && strict) {
        shake('#board');
        reset();
        setTimeout(simonSaysLv1, 1500);
        $('#strict').css('border-color', '#99ff66');
        $('#count-num').text(simonsMoves.length+1);
      }
      //fail on non strict
      else if (checkLoss()) {
        shake('#board');
        playerTurn = false;
        playerMoves = [];
        setTimeout(function() {
          doSimonMove(0);
        }, 1500);
      }
      //back to simon for his turn
      else if (playerMoves.length === simonsMoves.length) {
        speedCheck(simonsMoves.length);
        setTimeout(simonSaysLv1, 1200);
        $('#count-num').text(simonsMoves.length+1); //score
        playerMoves = [];
        simonTurn = true;
        playerTurn = false;
      }
    }
  });
  //if player wants to restart the game
  $('#reset').mouseup(function(){
    if (started && gameOn) {
      reset();
      setTimeout(simonSaysLv1, 1200);
      $('#count-num').text(simonsMoves.length+1);
    }
  });
});
