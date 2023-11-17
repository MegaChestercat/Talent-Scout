//but = document.getElementById("regCompany")
//console.log(but)
/*
$(document).ready(function (){
  $("#compReg")[0].reset();
});*/

$("#regCompany").click(function(event){
  event.preventDefault();
  Swal.fire("Account Created Succesfully");
  $.ajax({
    url: "http://localhost:3000/register_company/",
    method: "POST",
    timeout: 15000,
    data: $("#compReg").serialize(),
    dataType: "json",
    beforeSend:function(){
      $("#regCompany").attr("disabled", "disabled");
    },
    success: function(data){
      $("#compReg").attr("disabled", false)
    },
    error: function(error){
      console.log(error);
    }
    
  })
})