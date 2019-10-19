      var token = window.localStorage.getItem('token');
    $(function(){
  $(".sidebar").load("nav.html");
}); 
  function changePass(){
    $.ajax({
    url: "https://hidden-ocean-87285.herokuapp.com/users/updatePassword",
    method: "POST",
    data: {
        userPassword: $("#name").val(),
        newPassword: $("#re").val(), 
        rePassword: $("#new").val(),
        
    },
    beforeSend: function (xhr) {
      /* Authorization header */
      xhr.setRequestHeader('authorization', 'Bearer ' + token);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    },
    success: function (data) {
       alert("user password updated");
        window.location.href = 'changePassword.html'
    },
      error: function (data) {
        var response = JSON.stringify(data);
        response = JSON.parse(response);
      var message="";
        
         $.each(response.responseJSON.message, function (i, obj) {
        message+= " , " + obj.message;
      });

       alert(message);

      }
  });
  }