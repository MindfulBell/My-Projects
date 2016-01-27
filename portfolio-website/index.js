$(document).ready(function() {
  $('.navbar-right li').click(function() {
    console.log(this);
    $('li').removeClass('active');
    $(this).addClass('active');
  })
});
