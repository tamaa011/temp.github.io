      var token = window.localStorage.getItem('token');
var halldata;
var token = window.localStorage.getItem('token');
   var id= window.localStorage.getItem('Id');
    $(function(){
  $(".sidebar").load("nav.html");
});
$(document).ready(function () {

  $('#example').DataTable({

    "scrollX": true,
    "ajax": {
      "url": "https://hidden-ocean-87285.herokuapp.com/halls/listHalls",
      "type": "POST"
    },
      
    "columns": [
      { "data": "_id" },
      { "data": "hallName" },
      { "data": "hallCategory.name" },
      { "data": "hallsAverageRating" },
      { "data": "hallsRatingCounter" },
      { "data": "hallImage.length" },
      { "data": "formatedDate" },
         {
      "data": null,
        'render': function (data, type, row) {
          var id = "'"+data._id.toString()+"'";
            return '<input id="btnEdit" type="button" onclick="HallDetails(' + id +');" value="Details" />' +
            '<input id="btnEdit"  type="button" onclick="EditHalls(' + id + ')" value="Update" />' + 
            '<input id="btnEdit" type="button" onclick="DeleteHalls(' + id + ')" value="Delete" />';
                

            
        }
    }
    ]
      
  });

   if(id != null){
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
        halldata = data.data;
$("#Updatedhallname").val(halldata.hallName);
$("#Updatedhalldescription").val(halldata.hallDescription);
$("#Updatedhallprice").val(halldata.hallPrice);
$("#Updatedhalllong").val(halldata.hallLocationLong);
$("#Updatedhalllat").val(halldata.hallLocationLat);
$("#Updatedhallspecial").val(halldata.hallSpecialOffers);
$("#Updatedhallphone").val(halldata.hallPhoneNumber);
$("#UpdatedHallAdress").val(halldata.hallAdress);
    }
  });
   }
        });