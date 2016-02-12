var quotesArray = [];
quotesArray[0] = "In the end, just three things matter: How well we have lived, how well we have loved, how well we have learned to let go.";
quotesArray[1] = "When we get too caught up in the busyness of the world, we lose connection with one another - and ourselves.";
quotesArray[2] = "“O Nobly Born, remember the pure open sky of your own true nature. Return to it. Trust it. It is home.";
quotesArray[3] = "After climbing a great hill, one only finds that there are many more hills to climb.";
quotesArray[4] = "If you do not believe you can do it then you have no chance at all.";
quotesArray[5] = "Eighty percent of success is showing up.";
quotesArray[6] = "Every child is an artist.  The problem is how to remain an artist once he grows up";
quotesArray[7] = "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.";
quotesArray[8] = "Between stimulus and response, there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom.";
quotesArray[9] = "There is no way to happiness - happiness is the way.";

var authorArray = [];
authorArray[0] = "Jack Kornfield";
authorArray[1] = "Jack Kornfield";
authorArray[2] = "Buddha";
authorArray[3] = "Nelson Mandela";
authorArray[4] = "Arsene Wenger";
authorArray[5] = "Woody Allen";
authorArray[6] = "Pablo Picasso";
authorArray[7] = "Aristotle";
authorArray[8] = "Viktor Frankl";
authorArray[9] = "Thich Nhat Hanh";

$(document).ready(function(){ 
  // Set initial quote to display //
  var randomNum = [Math.floor(Math.random()*10)];
  var quote = quotesArray[randomNum];
  var author = authorArray[randomNum];    
  
  // Put that initial quote into the divs //
  $(".quote").html(quote);
  $(".author").html("<b>-"+author+"</b>");
  
  // random quote generator for My Favorites //
  
$("#getQuote").click(function() {   
    randomNum = [Math.floor(Math.random()*10)];
    quote = quotesArray[randomNum];
    author = authorArray[randomNum];
    $(".quote").html(quote);
    $(".author").html("<b>-"+author+"</b>");  
  });

$("#getRandom").click(function() {   
    //set quote = to the API quote generator thingy    
    $(".quote").html(quote);
    $(".author").html(" ");  
  });
  // tweet the quote
$("#tweetThis").click(function() {  
  $("a").attr("href", "https://twitter.com/intent/tweet?text=" + quote + "-" + author);  
});

});