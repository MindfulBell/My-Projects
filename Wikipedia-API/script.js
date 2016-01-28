//Exercise utilizing Wikipedia's API + creating a filter search bar!

//First API call to generate a list on the actual search from the user: https://en.wikipedia.org/w/api.php?action=query&format=json&generator=allpages&gaplimit=4&gapfrom=SEARCH QUERY GOES HERE&prop=info

//make an array or something to capture all the titles from the JSON object

//then plug those titles into the bottom extract API

//API format to use: https://en.wikipedia.org//w/api.php?action=query&prop=extracts&format=json&exsentences=1&explaintext=&titles=QUERY GOES HERE

// https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=SEARCH%20GOES%20HERE&limit=10&namespace=0&format=jsonfm use this for autocomplete

$(document).ready(function(){
  //for the random wiki entry function
  var randomWikiAPI = 'https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1&callback=?';
  var userQuery = '';
  //shows the auto-complete box when you are focused on it
  $('#wiki-query').on('focus', function(){
    $('.auto-complete').show();
  });

  //function to get the user's entry in the search bar and an autocomplete; sends that to the wikipedia api to get 5 entries for autocomplete, stores them in an array, appears below the search bar.
  $('#wiki-query').keyup(function() {
     userQuery = document.getElementById("wiki-query").value;
     $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + userQuery + '&limit=5&namespace=0&callback=?', function(data){
       var autoCompleteArray = data[1];
       var autoCompleteHTML = [];
       for (var j=0; j<autoCompleteArray.length; j++) {
         autoCompleteHTML.push('<p class="auto-entries">' + autoCompleteArray[j].substring(0,22) + '...</p>');
       }
       $('.auto-complete').html(autoCompleteHTML);
       //clickable auto complete entries to fill the search bar
       $('.auto-entries').click(function(){
         userQuery = $(this).text();
         document.getElementById('wiki-query').value = userQuery.slice(0, -3);
         $('#wiki-query').focus();
         $('.auto-complete').hide();
    });
     });

  });
  //random entry
  $('#random').click(function(){
    $.getJSON(randomWikiAPI, function(data){
    var randomEntry = data.query.random[0].title;
    document.getElementById('wiki-query').value = randomEntry;
      userQuery = randomEntry;
    });
  });

  //clears data, gets some new data, displays data by then calling displayData (below)
  function clearAndGetData(){
    $('#wiki-query').blur();
    $('.entries, .error').remove();
    $('.auto-complete').hide();
    if (userQuery === '') {
      $('#entry-holder').append('<h5 class="error animated rubberBand">Please try again!</h5>');
    }
    else {
      $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=' + userQuery + '&callback=?', function(data){
        displayData(data.query.search);
        console.log(data.query.search);
      });
    }
  }

  //displays the data on the page
  function displayData(data) {
    if (data.length === 0) {
      $('#entry-holder').append('<h5 class="error animated rubberBand">Please try again!</h5>');
    }
    else {
        for (var i=0; i<data.length; i++) {
          setTimeout(function(title, snippet) {
          $('#entry-holder').append('<a href="https://en.wikipedia.org/wiki/' + title + '"><div class="entries animated fadeIn"><h3 class="entries-title">' + title + '</h3><p class="snippet">' + snippet + '</p></div></a>');
          }, 300 * i, data[i].title, data[i].snippet );
        }
    }
  }

  //executs search for pressing search button and for pressing enter
  $('#submit-btn').click(clearAndGetData);
  $('#wiki-query').bind('enterKey', function(){
    clearAndGetData();
  });
  //enter key functionality
  $('#wiki-query').keyup(function(e){
    if (e.keyCode == 13) {
      $(this).trigger('enterKey');
    }
  });

  });
