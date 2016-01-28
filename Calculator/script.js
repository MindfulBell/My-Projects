//background taken from epsolutions.com

$(document).ready(function(){
  
  // variables to hold two inputs, answer, what the operation is, and a flag to indicate when found an answer
  var input1 = ''; 
  var input2 = '';
  var myOpp = '';
  var foundAnswer = false;
  
  // function to evaluate the operation itself (do math)
  var operation = function(num1, num2) {
    
   if (eval(num1 + myOpp + num2)%1 !==0) {
      return eval(num1 + myOpp +num2).toFixed(3).toString();
    }
    else {
      return eval(num1 + myOpp + num2).toString();
      }
   };
  
  // handler for when the operations are clicked. 
  // If input1 is empty, make sure that pressing an operation does nothing as it would break the program sort of
  // else if input 1 and input 2 are full, treat the operation button as an equal sign also to display the answer as well as update input1 to equal the answer and input 2 to equal nothing (this is the same as the = below); this allows chaining together operations
  // else (i.e. just have input1 filled) this just inputs the myOpp value
  $('.opp-button').click(function(){    
    if (input1 === '') {
      input1 = '';
      input2 = '';
      myOpp = '';      
    }
    else if (input1 && input2) {               
        $('#display').html(operation(input1, input2));        
        input1 = operation(input1, input2);
        input2 = '';
        myOpp = $(this).data('operator');        
        foundAnswer = true;
    }
    else {
      myOpp = $(this).data('operator');      
         }  
  });
  
  //other calc buttons
  //AC and CE just clear everything and set back to normal
  //numbers take number inputs, if oppDone is true it will start updating input2
  $('.calcbutton-sm').click(function(){   
    var pressedButton = $(this).html();    
    switch (pressedButton){
      case 'AC':
      case 'CE':
        input1 = '';
        input2 = '';
        myOpp = '';
        foundAnswer = false;
        $('#display').html(input1);        
        break; 
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':             
        if (myOpp === '') {
          //functionality to start a new operation whenever you want
          if (foundAnswer) {           
            input1 = ''; 
            foundAnswer = false;
          }
          input1 += $(this).html().toString();
          $('#display').html(input1);        
        }
        //once myOpp gets a value (i.e. press an operator, then starts updating input2)
        else {
          input2 += $(this).html().toString();
          $('#display').html(input2);          
        }
        break;
      case '.':        
      console.log(input1, input2);
        if (myOpp === '') {
          if (foundAnswer) {            
            input1 = '';   
            foundAnswer = false;
          }
          if (input1.toString().indexOf('.') === -1){
            input1 += $(this).html().toString();
            $('#display').html(input1);
          }
        }
        
        else if (input2.toString().indexOf('.') === -1) {
          input2 += $(this).html().toString();
          $('#display').html(input2);   
        }      
        
        break;
      case '=':        
        $('#display').html(operation(input1, input2));        
        input1 = operation(input1, input2);
        input2 = '';  
        myOpp = '';       
        foundAnswer = true;        
        break;    }
  });  
});