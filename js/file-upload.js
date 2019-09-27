
      var token = window.localStorage.getItem('token');
    $(function(){
  $(".sidebar").load("nav.html");
});
$(document).ready(function () {

      obj = { table: "customers", limit: 20 };
  $.ajax({
    url: "https://hidden-ocean-87285.herokuapp.com/roles/listRoles",
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
        $('.roles').append($('<option>').text(obj.role).attr('value', obj._id));
      });
    }
  });
    });
//add new admin
  function AddNewAdmin(){
      
    $.ajax({
    url: "https://hidden-ocean-87285.herokuapp.com/users/addUser",
    method: "POST",
    data: {
      userEmail: $("#UserEmail").val(),
      userName : $("#UserName").val(),
      userPassword : $("#UserPassword").val(),
      userRole : $(".roles").val()
    },
    beforeSend: function (xhr) {
      /* Authorization header */
      xhr.setRequestHeader('authorization', 'Bearer ' + token);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    },
    success: function (data) {
     console.log("addedd Successfully");
    },
      success: function (data) {
        alert("add Successfully");
          window.location.href = 'Addnewadmin.html'
      },
      error: function (data) {
          var $Email = $("#UserEmail");
          var $name = $("#UserName");
          var mail = $Email.val().trim();
          var name = $name.val().trim();
          if(name.length < 1) {
              alert("Please Fill the Name field");
          }else if (mail.length < 1) {
    alert("Please Fill the Email field");
  }
      }
  });
  }