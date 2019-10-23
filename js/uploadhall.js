    $(function(){
  $(".sidebar").load("nav.html");
});
$(document).ready(function () {
        var token = window.localStorage.getItem('token');
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
    });
// add hall
    var token = window.localStorage.getItem('token');

    var SERVER_URL = 'https://hidden-ocean-87285.herokuapp.com';
    var IMAGES_UPLOAD_URL = '/halls/UploadImages';

    var $fileInputElement = $('input[type="file"]');
    var images= [];
    var fileLength=0;
    var uploadedImage=0;
    $('input[type=file]').change(function(){
      fileLength = this.files.length;
    });
    function upload() {

      var $name = $("#name");
          var $Adress = $("#ha");
          var $Description = $("#hd");
          var $Price = $("#hp");
          var $LocationLong = $("#hl");
          var $LocationLat = $("#hla");
          var $PhoneNumber = $("#hpn");
          var name = $name.val().trim();
          var Adress = $Adress.val().trim();
          var Description = $Description.val().trim();
          var Price = $Price.val().trim();
          var LocationLong = $LocationLong.val().trim();
          var LocationLat = $LocationLat.val().trim();
          var PhoneNumber = $PhoneNumber.val().trim();
          if(name.length < 1) {
              alert("Please Fill the Name field");
          }else if (Adress.length < 1) {
    alert("Please Fill the Adress field");
  }else if (Description.length < 1) {
    alert("Please Fill the Description field");
  }else if (Price.length < 1) {
    alert("Please Fill the Price field");
  }else if (LocationLong.length < 1) {
    alert("Please Fill the Hall Location Long field");
  }else if (LocationLat.length < 1) {
    alert("Please Fill the Hall Location Lat field");
  }else if (PhoneNumber.length < 1) {
    alert("Please Fill the Hall Phone Number field");
  }else {
            $fileInputElement.simpleUpload(SERVER_URL + IMAGES_UPLOAD_URL, {

        start: function handleStart(file) {

        },

        progress: function handleProgress(progress) {
          // Received progress
        },

        success: function handleSuccess(data) {
          uploadedImage++;
          images.push(data.result);
          if(fileLength == uploadedImage){
            var imagg = JSON.stringify(images)
            AddHall(imagg);
          }
        },

        error: function handleError(error) {
          // Upload failed

          console.error(error);
        }
      });
  }
        
        

    }
    function AddHall(imagesFiles) {

      var hallName = $("#name").val();
      var hallAdress = $("#ha").val();
      var hallCategory = $("#demo").val();
      var hallDescription = $("#hd").val();
      var hallPrice = $("#hp").val();
      var hallLocationLong = $("#hl").val();
      var hallLocationLat = $("#hla").val();
      var hallSpecialOffers = $("#hs").val();
      var hallPhoneNumber = $("#hpn").val();
      var hallImage = $("#hi").val();

      let requestBody = {
        hallName: hallName,
        hallAdress: hallAdress,
        hallCategory: hallCategory,
        hallDescription: hallDescription,
        hallPrice: hallPrice,
        hallLocationLong: hallLocationLong,
        hallLocationLat: hallLocationLat,
        hallSpecialOffers: hallSpecialOffers,
        hallPhoneNumber: hallPhoneNumber,
        hallImage: imagesFiles

      }

      $.ajax({
        url: "https://hidden-ocean-87285.herokuapp.com/halls",
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        beforeSend: function (xhr) {
          //xhr.setRequestHeader('file',JSON.parse( fd));

          xhr.setRequestHeader('authorization', 'Bearer ' + token);
        },

        data: requestBody,
        success: function (data) {
          alert(data.message);
            window.location.href = 'Addnewhall.html'
          // CallBack(result);
        },
      error: function (data) {
          
      }
      });


    }
