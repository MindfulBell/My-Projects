$(document).ready(function(){
  //Quick Exercise in a simpe API endpoint use and a nice fade-in timing effect. 
  
  $('.title').addClass('animated fadeIn');
  //getting the API endpoing info to parse out
  
  $.getJSON('http://www.freecodecamp.com/news/hot', function(data){   
    
    //for each chunk of data, going deeper into lists and organizing user info: headline, image, author name
    $.each(data, function(key, val){   
      
      //fade in for each div, admittedly, a GARBLED MESS
      setTimeout(function(){
      $("#test").append("<div class='camper-box animated fadeInUp'><div class='link-wrap'><a href='"
      + val.link + "' target='_blank' class='article-link'><h4>"
      + val.headline + "</h4></a></div><img src='"
      + val.author.picture + "'><h5>Written by: "
      + val.author.username + "</h5><i class='fa fa-smile-o' style='margin-right: 10px'> "
      + val.upVotes.length + "</i> <a href='http://www.freecodecamp.com/news/"
      + val.storyLink.split(' ').join('-')
      + "' target='_blank'><button class='btn btn-sm btn-primary'>Discuss This!</button></div>");     
    }, key*50);      
    });    
  });    
});