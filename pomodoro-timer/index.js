//TIMER made for FreeCodeCamp
//Riddled with poor code, global variables aplenty, one of my weaker efforts. 

$(document).ready(function (){
  
  var timerIsRunning = false;
  
  // plus minus button functionality; making sure to do a few things...
    // 1. stop the timer if it is running
    // 2. get a new value for timer or break length
    // 3. reset the color of the button back to red
    // 4. get a new master total secs value for either break or timer 
    // basically, account for all changes to the timer/break
  
  var breakNum = parseInt($('#break-num').html());
  var timerNum = parseInt($('#timer-num').html());
  var seconds = 0;
  var countSecs = 59;  
  var countTotalSecs = (timerNum * 60);
  
  $('#break-plus').click(function (){    
    breakNum += 1;
    seconds = 0;
    countSecs = 59;
    var breakTotalSecs = (breakNum * 60);
    timerIsRunning = false;
    $('#break-num').text(breakNum);   
    timerNum = parseInt($('#timer-num').html());
    $('#clock').text(timerNum + ":0" + seconds);
    $('#timer-start').css("background-color", "maroon");
    $('#timer-start').css("color", "white");
    clearInterval(myInterval);
  }); 
  
  $('#break-minus').click(function (){
    
    breakNum -= 1;
    if (breakNum <= 0) {
      breakNum = 1;
    }
    seconds = 0;
    countSecs = 59;
    var breakTotalSecs = (breakNum * 60);
    timerIsRunning = false;
    $('#break-num').text(breakNum);    
    timerNum = parseInt($('#timer-num').html());
    $('#clock').text(timerNum + ":0" + seconds);
    $('#timer-start').css("background-color", "maroon");
    $('#timer-start').css("color", "white");
    clearInterval(myInterval);
  });     
  
   
  $('#clock').text(timerNum + ":0" + seconds);
    
    $('#timer-plus').click(function (){
      timerNum += 1;
      seconds = 0;
      countSecs = 59;
      countTotalSecs = (timerNum * 60)
      timerIsRunning = false;
      $('#timer-num').text(timerNum);
      $('#clock').text(timerNum + ":0" + seconds); 
      $('#timer-start').css("background-color", "maroon");
    $('#timer-start').css("color", "white");
      clearInterval(myInterval);
     
  });  
  
  $('#timer-minus').click(function (){    
    timerNum -= 1; 
    if (timerNum <= 0) {
      timerNum = 1;
    }
    seconds = 0;
    countSecs = 59;
    countTotalSecs = (timerNum * 60);
    timerIsRunning = false;
    $('#timer-num').text(timerNum);
     $('#clock').text(timerNum + ":0" + seconds);    
    clearInterval(myInterval);
    $('#timer-start').css("background-color", "maroon");
    $('#timer-start').css("color", "white");
  });     
  
  // ticking function; could be much cleaner i think. Only way I could figure to do it. Having a total value of seconds for both timer length and break is what made this possible. 
  
  function ticking() { 
    
    if (countTotalSecs > 0 && countSecs >= 10 && countSecs <=59){
    countTotalSecs -= 1; 
    $('#clock').text(Math.floor((countTotalSecs/60)) + ":" + countSecs);     
    countSecs -= 1;
    }
    else if (countTotalSecs > 0 && countSecs < 10 && countSecs > 0){
    countTotalSecs -= 1;
    $('#clock').text(Math.floor((countTotalSecs/60)) + ":0" + countSecs)
    countSecs -=1;
    }    
    else if (countTotalSecs > 0 && countSecs == 0){
    countTotalSecs -= 1;
    $('#clock').text(Math.floor((countTotalSecs/60)) + ":0" + countSecs)
    countSecs +=59;      
    }
    
    else if (countTotalSecs == 0) {
      
      $('#timer-start').css("background-color", "yellow");
      $('#timer-start').css("color", "maroon");
      
      if (breakTotalSecs > 0 && countSecs >= 10 && countSecs <=59){    
        breakTotalSecs -= 1; 
        $('#clock').text(Math.floor((breakTotalSecs/60)) + ":" + countSecs);     
    countSecs -= 1;
    }
      
    else if (breakTotalSecs > 0 && countSecs < 10 && countSecs > 0){
    breakTotalSecs -= 1;
    $('#clock').text(Math.floor((breakTotalSecs/60)) + ":0" + countSecs)
    countSecs -=1;
    }    
      
    else if (breakTotalSecs > 0 && countSecs == 0){
    breakTotalSecs -= 1;
    $('#clock').text(Math.floor((breakTotalSecs/60)) + ":0" + countSecs)
    countSecs +=59;
    }
      else if (breakTotalSecs == 0 && countTotalSecs == 0) {
        clearInterval(myInterval);
        $('#timer-start').css("background-color", "green");
        $('#timer-start').css("color", "black");        
        $('#clock').append("<br><p>Please reset your timer...</p>");
        
      }     
    }
  }  
  // On off button for the timer.  
  $('#timer-start').click(function (){    
    
    if (!timerIsRunning) {
      myInterval = setInterval(ticking, 1000);
      timerIsRunning = true;
    }
    
    else {
      clearInterval(myInterval);
      timerIsRunning = false;
    }      
  });       
});