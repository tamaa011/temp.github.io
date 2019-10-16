
      var token = window.localStorage.getItem('token');
    $(function(){
  $(".sidebar").load("nav.html");
});
$(document).ready(function () {
  obj = { table: "customers", limit: 20 };
      $.ajax({
    url: "https://hidden-ocean-87285.herokuapp.com/category/listCategories",
    method: "POST",
    data: {
      x: JSON.stringify(obj)
    },
    beforeSend: function (xhr) {
      /* Authorization header */
      xhr.setRequestHeader('authorization', 'Bearer ' + token);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    },
    success: function (data) {
      $.each(data.data, function (i, obj) {
        
        $('#SearchByCategory').append($('<option>').text(obj.name).attr('value', obj._id));

        $('#demo').append($('<option>').text(obj.name).attr('value', obj._id));
      });
    }
  });
  function SearchByCategory(){
    $('#exampleCategory').DataTable({

      "scrollX": true,
      "ajax": {
        "url": "https://hidden-ocean-87285.herokuapp.com/halls/searchByCategory",
        "type": "POST",
        data : {
          hallCategory : document.getElementById("SearchByCategory").value //this 
        }
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
  }
 });
function SearchByCategory(){
  $('#SearchByCategoryTable').DataTable({

    "scrollX": true,
    "bDestroy": true,
    "ajax": {
      "url": "https://hidden-ocean-87285.herokuapp.com/halls/searchByCategory",
      "type": "POST",
      data : {
        hallCategory : document.getElementById("SearchByCategory").value,
        limit : 2000,
          offset : 0
      }
    },
    "columns": [
      { "data": "_id" },
      { "data": "hallName" },
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