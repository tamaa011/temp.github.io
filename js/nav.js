$(document).ready(function () {
    var sideNavActions = JSON.parse(localStorage.getItem("sideNavActions"));
    var role = JSON.parse(localStorage.getItem("role"));
    var username = localStorage.getItem("User");
    $("#username").html(username);


$.each( sideNavActions[0].Admin, function( key, value ) {
    $(".adminlink").append('<li class="nav-item"><a class="nav-link" href="'+ value.split(' ').join('')+'.html">'+ value + '</a></li>');

});

$.each( sideNavActions[0].Halls, function( key, value ) {
    $(".HallsLink").append('<li class="nav-item"><a class="nav-link" href="'+ value.split(' ').join('')+'.html">'+ value + '</a></li>');
});

$.each( sideNavActions[0].Users, function( key, value ) {
    $(".userslink").append('<li class="nav-item"><a class="nav-link" href="'+ value.split(' ').join('')+'.html">'+ value + '</a></li>');

});

$.each( sideNavActions[0].Other, function( key, value ) {
    $(".OtherLink").append('<li class="nav-item"><a class="nav-link" href="'+ value.split(' ').join('')+'.html">'+ value + '</a></li>');

});
    if(role === "admin") {
        document.getElementById("A").style.display = "none";
    }
        if(role === "worker") {
        document.getElementById("A").style.display = "none";
        document.getElementById("U").style.display = "none";
    }
  $(".bars").click(function () {
    $(".main").toggleClass("custom");
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.07)";
      document.body.style.transition = "0.3s";
      document.getElementById("op").style.opacity = "0.5";
  });

      $(".gb").click(function () {
    $(".main").remove("custom");
      document.body.style.backgroundColor = "white";
        document.getElementById("op").style.opacity = "1";
        document.body.style.transition = "0.3s";
  });
    




});
