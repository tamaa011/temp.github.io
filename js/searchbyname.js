      var token = window.localStorage.getItem('token');
    $(function(){
  $(".sidebar").load("nav.html");
});
$(document).ready(function () {
  $('#exampleName').DataTable({

    "scrollX": true,
    "ajax": {
      "url": "https://hidden-ocean-87285.herokuapp.com/halls/searchByName",
      "type": "POST"
    },
    "columns": [
      { "data": "_id" },
      { "data": "hallName" },
      { "data": "hallCategory.name" },
      { "data": "hallsAverageRating" },
      { "data": "hallPrice" },
      { "data": "hallPhoneNumber" }
    ]
  });
        });
//search by name       

function SearchByName(){

  $('#SearchByName').DataTable({

    "scrollX": true,
    "bDestroy": true,
    "ajax": {
      "url": "https://hidden-ocean-87285.herokuapp.com/halls/searchByName",
      "type": "POST",
      data : { 
        hallName : document.getElementById("SearchByName_Name").value,
          limit : 2000,
          offset : 0
      }
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
            return '<input  id="btnEdit" type="button" onclick="HallDetails(' + id +');" value="Details" />' +
            '<input id="btnEdit" type="button" onclick="EditHalls(' + id + ')" value="Update" />' + 
            '<input id="btnEdit" type="button" onclick="DeleteHalls(' + id + ')" value="Delete" />';
            
        }
    }
    ]
  });
}