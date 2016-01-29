// Exercise utilizing APIs, bootstrap nav-tabs, as well as building a filtering search bar

var userArray = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas", "MedryBW", "beohoff"];

$(document).ready(function(){  
  
  //first API call to get the user logos and set up divs for each one with their user names as classes; making it easier to target later
  userArray.map(function(user){    
    
    var streamLink = "https://twitch.tv/";      
    $.getJSON("https://api.twitch.tv/kraken/search/channels?q=" + user, function(data){
      
      var views = ("<b>Views</b>: " + data.channels[0].views);
      var followers = ("<b>Followers</b>: " + data.channels[0].followers);
      var game = data.channels[0].game !== null ? ("<b>Stream</b>: " + data.channels[0].game) : "<b>Not set up!</b>";
      var imgLogo = data.channels[0].logo !== null ? data.channels[0].logo : 'http://www.grammarly.com/blog/wp-content/uploads/2015/01/Silhouette-question-mark.jpeg';
      var twitchLink = "<a href=" + streamLink + user + " target='_blank'>";
      
      $("<div class='" + user + "'><div class='user-names'><img src='" + imgLogo + "' class='img-responsive logos'><p class='userNameText'>" + user + "</p></div></div>").appendTo("#users");
      
      var userClass = '.' + user;
      
      $('.' + user).after("<div class='" + user + "-info stream-info container-fluid'>" + game + "<br>" + views + "<br>" + followers + "<br>" + twitchLink + "<i class='fa fa-twitch fa-2x'></i>" + "</a><br>" +"</div>");      
      $('.' + user + '-info').hide();
      var userClassInfo = '.' + user + '-info'; 
      
      $(userClass).click(function(){
        $(userClassInfo).toggle(500);        
      });      
      
      $.getJSON("https://api.twitch.tv/kraken/streams/" + user, function(data){
        //checking if online or offline to give them a special background color as well as help with filtering in the Online/Offline tabs
      if (data.stream === null) {
        $(userClass).addClass('streamOff');               
           }        
      else {
        $(userClass).addClass('streamOn');       
           }       
      });           
    }); 
  });
  
  //nav bar functionality  
  $('li').click(function() {
    $('li').removeClass("active");
    $(this).addClass("active");
    //clear search bar when changing list filters
    $('#search-bar').val("");
    $('#search-bar').attr("placeholder", "Find a user...click for more details!");    
  
    if ($("#offline").hasClass("active")){
      $(".streamOn").hide();
      $(".streamOff").show();
    }    
    else if ($("#online").hasClass("active")) {
      $(".streamOff").hide();
      $(".streamOn").show();
    }    
    else {
      $(".streamOff").show();
      $(".streamOn").show();
    }   
  });
  
  //filter search bar; used .includes() as the filter method to compare the users search with the divs. The divs were given classes == to their user name during the first JSON runthrough above; this made it easy to target them.
  $("#search-bar").keyup(function(){    
    var userSearch = document.getElementById("search-bar").value.toLowerCase();     
    userArray.map(function(user){ 
      //if we are working with the ONLINE list as active
      if ($("#online").hasClass("active")) {      
        if (!user.toLowerCase().includes(userSearch)){        
            $('.' + user).hide();          
        }
        else if ((user.toLowerCase().includes(userSearch)) && ($('.' + user).hasClass("streamOn"))) {      
            $('.' + user).show();
        }
      }
      //if we are working with the OFFLINE list as active
      else if ($("#offline").hasClass("active")) {        
        if (!user.toLowerCase().includes(userSearch)) {
          $('.' + user).hide();
        }
        else if ((user.toLowerCase().includes(userSearch)) && ($('.' + user).hasClass("streamOff"))) {
          $('.' + user).show();
        }
      }
      //if we are in ALL
      else {
        if (!user.toLowerCase().includes(userSearch)) {
          $('.' + user).hide();
        }
        else if ((user.toLowerCase().includes(userSearch))) {
          $('.' + user).show();
        }
      }
    });
  });  
});


