
      var token = window.localStorage.getItem('token');
    $(function(){
  $(".sidebar").load("nav.html");
});
$(document).ready(function () {

// privacy 
      var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
      document.getElementById("demo").innerHTML = myObj.data.text;
    }
  };
  xhttp.open("POST", "https://hidden-ocean-87285.herokuapp.com/policyAndPrivacy/getPolicyAndPrivacy", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("type=privacy");
// terms 
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
      document.getElementById("demo").innerHTML = myObj.data.text;
    }
  };
  xhttp.open("POST", "https://hidden-ocean-87285.herokuapp.com/policyAndPrivacy/getPolicyAndPrivacy", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("type=service");
// list halls
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
      { "data": "hallImage" },
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
// list halls category 
    
  $('#exampleCategories').DataTable({

    "scrollX": true,

    "ajax": {
      "url": "https://hidden-ocean-87285.herokuapp.com/category/listCategories",
      "type": "POST",
      beforeSend: function (xhr) {
        /* Authorization header */
        xhr.setRequestHeader('authorization', 'Bearer ' + token);
      },
    },
    "columns": [
      { "data": "_id" },
      { "data": "name" }
    ]
  });
//search by name
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
//search by category 
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
  //users 
 $('#exampleUsers').DataTable({
    "scrollX": true,
    "ajax": {
      "url": "https://hidden-ocean-87285.herokuapp.com/users",
      "type": "POST",
      beforeSend: function (xhr) {
        /* Authorization header */
        xhr.setRequestHeader('authorization', 'Bearer ' + token);
      },

      error: function (data) {
        if (data.statusText == "Bad Request") {
          localStorage.setItem("token", data.responseJSON.token);
          listuser();
        }
      }
    },
    "columns": [
      { "data": "userName" },
      { "data": "userEmail" },
      { "data": "_id" },
      { "data": "formatedDate" }
    ]
  });


  function listuser() {
    $('#exampleUsers').html('');
    $('#exampleUsers').DataTable({
      "scrollX": true,
      "ajax": {
        "url": "https://hidden-ocean-87285.herokuapp.com/users",
        "type": "POST",
        beforeSend: function (xhr) {
          /* Authorization header */
          xhr.setRequestHeader('authorization', 'Bearer ' + token);
        },
        error: function (data) {
          if (data.statusText == "Bad Request") {
            localStorage.setItem("token", data.responseJSON.token);
          }
        }

      },
      "columns": [
        { "data": "_id" },
        { "data": "userName" },
        { "data": "userEmail" },
          { "data": "formatedDate" }
      ]
    });
  }
// list admins 
      $('#exampleAdmin').DataTable({

    "scrollX": true,

    "ajax": {
      "url": "https://hidden-ocean-87285.herokuapp.com/users/listSystemUsers",
      "type": "POST",
      beforeSend: function (xhr) {
        /* Authorization header */
        xhr.setRequestHeader('authorization', 'Bearer ' + token);
      },
    },
    "columns": [
      { "data": "userName" },
      { "data": "userEmail" },
      { "data": "userRole.role" },
      { "data": "_id" },
        { "data": "formatedDate" },
                 {
      "data": null,
        'render': function (data, type, row) {
          var id = "'"+data._id.toString()+"'";
            return '<input id="btnEdit" type="button" onclick="DeleteAdmins(' + id + ')" value="Delete" />';
            
        }
    }
    ]
  });
// list feedback
        //list feedback
      $('#exampleFeedBack').DataTable({
    "scrollX": true,
    "ajax": {
      "url": "https://hidden-ocean-87285.herokuapp.com/feedback/listFeedback",
      "type": "POST",
      beforeSend: function (xhr) {
        /* Authorization header */
        xhr.setRequestHeader('authorization', 'Bearer ' + token);
      },

      error: function (data) {
        if (data.statusText == "Bad Request") {
          localStorage.setItem("token", data.responseJSON.token);
          listuser();
        }
      }
    },
    "columns": [
      { "data": "email" },
      { "data": "text" },
        { "data": "formatedDate" }
    ]
  });


  function listfeedback() {
    alert("list feedback , mean that have an error");
    $('#exampleFeedBack').html('');
    $('#exampleFeedBack').DataTable({
      "scrollX": true,
      "ajax": {
        "url": "https://hidden-ocean-87285.herokuapp.com/users",
        "type": "POST",
        beforeSend: function (xhr) {
          /* Authorization header */
          xhr.setRequestHeader('authorization', 'Bearer ' + token);
        },
        error: function (data) {
          if (data.statusText == "Bad Request") {
            localStorage.setItem("token", data.responseJSON.token);
          }
        }

      },
      "columns": [
        { "data": "email" },
        { "data": "text" }
      ]
    });
  }
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
//send notifications
  function sendNotification() {
    var token = window.localStorage.getItem('token');
          var $title = $("#Title");
          var $body = $("#body");
          var title = $title.val().trim();
          var body = $body.val().trim();
      if(title < 1){
          alert("Please Fill the Title field")
      }else if(body < 1){
          alert("Please Fill the Body field")
      }else{
    $.ajax({
      url: "https://hidden-ocean-87285.herokuapp.com/notification/pushNotification",
      method: "POST",
      data: {
        title: $("#Title").val(),
        body: $("#body").val()
      },
      beforeSend: function (xhr) {
        /* Authorization header */
        xhr.setRequestHeader('authorization', 'Bearer ' + token);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      },
      success: function (data) {
        alert(data.message);
          window.location.href = 'Sendnotification.html'
      },
      error: function (data) {
        alert(data.message);
      }

    });}

  }
// send privacy 
    //edit
    function editT() {
        document.getElementsByTagName("textarea")[0].removeAttribute("disabled"); 
        document.getElementById("ed").style.display = "none";
        document.getElementById("pri").removeAttribute("disabled"); 
}
        
    //savePrivacy
      function savePrivacy() {
    var token = window.localStorage.getItem('token');

    $.ajax({
      url: "https://hidden-ocean-87285.herokuapp.com/policyAndPrivacy/addPolicyAndPrivacy",
      method: "POST",
        
      data: {
        text: $("#demo").val(),
          type: "privacy"
        
      },
      beforeSend: function (xhr) {
        /* Authorization header */
        xhr.setRequestHeader('authorization', 'Bearer ' + token);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      },
      success: function (data) {
        alert(data.message);
          window.location.href = 'Privacypolicy.html'
      },
      error: function (data) {
        alert(data.message);
          window.location.href = 'Privacypolicy.html'
      }

    });
      }
// terms
    //edit
function editP() {
        document.getElementsByTagName("textarea")[0].removeAttribute("disabled"); 
        document.getElementById("bt").removeAttribute("disabled"); 
        document.getElementById("it").style.display = "none";
        
}
    
    //saveTerms
      function saveTerms() {
    var token = window.localStorage.getItem('token');
    $.ajax({
      url: "https://hidden-ocean-87285.herokuapp.com/policyAndPrivacy/addPolicyAndPrivacy",
      method: "POST",
        
      data: {
        text: $("#demo").val(),
          type: "service"
        
      },
      beforeSend: function (xhr) {
        /* Authorization header */
        xhr.setRequestHeader('authorization', 'Bearer ' + token);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      },
      success: function (data) {
        alert(data.message);
          window.location.href = 'Termsofservice.html'
      },
      error: function (data) {
        alert(data.message);
          window.location.href = 'Termsofservice.html'
      }

    });

  }
//search by category
function SearchByCategory(){
  $('#SearchByCategoryTable').DataTable({

    "scrollX": true,
    "bDestroy": true,
    "ajax": {
      "url": "https://hidden-ocean-87285.herokuapp.com/halls/searchByCategory",
      "type": "POST",
      data : {
        hallCategory : document.getElementById("SearchByCategory").value
      }
    },
    "columns": [
      { "data": "_id" },
      { "data": "hallName" },
      { "data": "hallsAverageRating" },
      { "data": "hallsRatingCounter" },
      { "data": "hallImage" },
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
//search by name
function SearchByName(){

  $('#SearchByName').DataTable({

    "scrollX": true,
    "bDestroy": true,
    "ajax": {
      "url": "https://hidden-ocean-87285.herokuapp.com/halls/searchByName",
      "type": "POST",
      data : { 
        hallName : document.getElementById("SearchByName_Name").value
      }
    },
    "columns": [
      { "data": "_id" },
      { "data": "hallName" },
      { "data": "hallCategory.name" },
      { "data": "hallsAverageRating" },
      { "data": "hallsRatingCounter" },
      { "data": "hallImage" },
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
