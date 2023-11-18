$("#loginBtn").click(function(event){
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
      msg = data.id
      msg2 = data.name
      console.log(msg)
      console.log(msg2)
      if(msg == "No exist"){
        Swal.fire("The account does not exist in the system")
      }
      else if(msg == "Incorrect Password"){
        Swal.fire("The password you set is incorrect")
      }
      else{
        console.log(msg)
        sessionStorage.setItem("id", msg)
        sessionStorage.setItem("name", msg2)
        setTimeout(()=>{
          window.location.href = "/dashboard"
        }, 10)
      }
    },
    done:function(data){
    },
    error:function(data){

    },
  })
})

$("#regCompany").click(function(event){
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
    },
    error: function(error){
      console.log(error);
    }
  })
})

$("cprojectbtn").click(function(event){
})