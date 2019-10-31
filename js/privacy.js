
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
      document.getElementById("show").innerHTML = myObj.data.text;
    }
  };
  xhttp.open("POST", "https://hidden-ocean-87285.herokuapp.com/policyAndPrivacy/getPolicyAndPrivacy", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("type=privacy");
    });
// send privacy 
    //edit
    function editT() {
        document.getElementById("demo").style.display = "none";
        document.getElementsByTagName("textarea")[0].removeAttribute("hidden"); 
        document.getElementById("ed").style.display = "none";
        document.getElementById("pri").removeAttribute("hidden"); 
}
   
        //savePrivacy
      function savePrivacy() {
    var token = window.localStorage.getItem('token');

    $.ajax({
      url: "https://hidden-ocean-87285.herokuapp.com/policyAndPrivacy/addPolicyAndPrivacy",
      method: "POST",
        
      data: {
        text: $("#show").val(),
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