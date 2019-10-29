
var halldata;
var token = window.localStorage.getItem('token');
   var id= window.localStorage.getItem('Id');
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



  $("#UpdateHallSubmit").click(function(){
var SERVER_URL = 'https://hidden-ocean-87285.herokuapp.com';
    var IMAGES_UPLOAD_URL = '/halls/UploadImages';
    var $fileInputElement = $('input[type="file"]');
if($("#Updatedhallimage").val() == ""){
updateHall(halldata.hallImage);
}

else{
upload(SERVER_URL,IMAGES_UPLOAD_URL,$fileInputElement);
}
      
     


    
  })
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

function upload(SERVER_URL,IMAGES_UPLOAD_URL,$fileInputElement) {

      $fileInputElement.simpleUpload(SERVER_URL + IMAGES_UPLOAD_URL, {

        start: function handleStart(file) {

        },

        progress: function handleProgress(progress) {
          // Received progress
        },

        success: function handleSuccess(data) {

          let images = data.result;
          halldata.hallImage.push(images);
          updateHall(halldata.hallImage)
        },

        error: function handleError(error) {
          // Upload failed

          console.error(error);
        }
      });

    }
function updateHall(hallimage){
      var hallName = $("#Updatedhallname").val();
      var hallAdress = $("#UpdatedHallAdress").val();
      var hallCategory = $("#hc").val();
      var hallDescription = $("#Updatedhalldescription").val();
      var hallPrice = $("#Updatedhallprice").val();
      var hallLocationLong = $("#Updatedhalllong").val();
      var hallLocationLat = $("#Updatedhalllat").val();
      var hallSpecialOffers = $("#Updatedhallspecial").val();
      var hallPhoneNumber = $("#Updatedhallphone").val();
      var hallImage = hallimage;
      let requestBody = {
          hallId : halldata._id,
        hallName: hallName,
        hallAdress: hallAdress,
        hallCategory: hallCategory,
        hallDescription: hallDescription,
        hallPrice: hallPrice,
        hallLocationLong: hallLocationLong,
        hallLocationLat: hallLocationLat,
        hallSpecialOffers: hallSpecialOffers,
        hallPhoneNumber: hallPhoneNumber,
        hallImage: hallImage

      }
      $.ajax({
        url: "https://hidden-ocean-87285.herokuapp.com/halls/update",
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        beforeSend: function (xhr) {
          //xhr.setRequestHeader('file',JSON.parse( fd));

          xhr.setRequestHeader('authorization', 'Bearer ' + token);
        },

        data: requestBody,
        success: function (result) {
          alert("success");
          // CallBack(result);
        },
        error: function (error) {
          alert("error");
        }
      });
}

function EditHalls(id){
            var token = window.localStorage.getItem('token');
       var role = JSON.parse(localStorage.getItem("role"));
       if(role === "worker") {
           alert("You can't edit this hall");
       }else if (role === "admin"){
           alert("You can't edit this hall");
       }else{
    localStorage.setItem("Id" , id);
    window.open("updataHall.html");}
    
  }
     function DeleteHalls(id){
    var token = window.localStorage.getItem('token');
   var role = JSON.parse(localStorage.getItem("role"));
       if(role === "worker") {
           alert("You can't delete hall");
       }else if (role === "admin"){
           alert("You can't delete hall");
       }else{
  $.ajax({
    url: "https://hidden-ocean-87285.herokuapp.com/halls/"+id,
    method: "Delete",
   
    beforeSend: function (xhr) {

      /* Authorization header */
      xhr.setRequestHeader('authorization', 'Bearer ' + token);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    },
    success: function (data) {
      alert(data.message);
        window.location.href = 'Listhalls.html'
    },
        error: function (data) {
      alert(data.message);
    }
  });}
  }


   function HallDetails(id){
     
     localStorage.setItem("Id" , id);

       window.open("HallDetails.html");
  }