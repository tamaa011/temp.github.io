    $(function(){
  $(".sidebar").load("nav.html");
});
$(document).ready(function(){
    var token = window.localStorage.getItem('token');
   var id= window.localStorage.getItem('Id');
 $.ajax({
    url: "https://hidden-ocean-87285.herokuapp.com/halls/"+id,
    method: "get",
   
    beforeSend: function (xhr) {
      /* Authorization header */
      xhr.setRequestHeader('authorization', 'Bearer ' + token);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    },
    success: function (data) {
        window.localStorage.removeItem('Id');
        var halldata = data.data;
$("#hdName").val(halldata.hallName);
$("#hdDescription").val(halldata.hallDescription);
$("#hdPrice").val(halldata.hallPrice);
$("#hdLong").val(halldata.hallLocationLong);
$("#hdLat").val(halldata.hallLocationLat);
$("#hdOffer").val(halldata.hallSpecialOffers);
$("#hdPhone").val(halldata.hallPhoneNumber);
$("#hdAddress").val(halldata.hallAdress);

$.each( halldata.hallImage, function( key, value ) {
    $("#hdImages").append('<img src="'+ value+'"/>');
});
    }
  });
})