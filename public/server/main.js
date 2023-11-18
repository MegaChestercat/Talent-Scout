//but = document.getElementById("regCompany")
//console.log(but)
/*
$(document).ready(function (){
  $("#compReg")[0].reset();
});*/

$("#loginBtn").click(function(event){
  event.preventDefault();
  $.ajax({
    url: "/login",
    method: "POST",
    timeout: 15000,
    data: $("#loginForm").serialize(),
    dataType: "json",
    beforeSend:function(){
      $("#loginBtn").attr("disabled", "disabled");
    },
    success: function(data){
      $("#loginForm").attr("disabled", false)
      msg = data.message
      if(msg == "No exist"){
        Swal.fire("The account does not exist in the system")
      }
      if(msg == "Incorrect Password"){
        Swal.fire("The password you set is incorrect")
      }
    },
    error:function(data){

    }
  })
})

$("#regCompany").click(function(event){
  event.preventDefault();
  $.ajax({
    url: "/register/company",
    method: "POST",
    timeout: 15000,
    data: $("#compReg").serialize(),
    dataType: "json",
    beforeSend:function(){
      $("#regCompany").attr("disabled", "disabled");
    },
    success: function(data){
      msg = data.message
      $("#compReg").attr("disabled", false)
      if(msg  == "exist"){
        Swal.fire("The Account already exists");
        return false;
      }
      if(msg == "Saved"){
        Swal.fire("Account Saved Succesfully");
        return false;
      }
    },
    error: function(error){
      console.log(error);
    }
    
  })
})