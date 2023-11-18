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


//Registers HTTP Consults

$("#RegTal").click(function(event){
  $.ajax({
    url: "/register/talent",
    method: "POST",
    timeout: 15000,
    data: $("#TalReg").serialize(),
    dataType: "json",
    beforeSend:function(){
      $("#RegTal").attr("disabled", "disabled");
    },
    success: function(data){
      setTimeout(()=>{
        window.location.href = "/home"
      }, 2000)
    },
    error: function(error){
      console.log(error);
    }
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
      setTimeout(()=>{
        window.location.href = "/login"
      }, 2000)
    },
    error: function(error){
      console.log(error);
    }
  });
});

$("#regInd").click(function(event){
  $.ajax({
    url: "/register/individual",
    method: "POST",
    timeout: 15000,
    data: $("#indReg").serialize(),
    dataType: "json",
    beforeSend:function(){
      $("#regInd").attr("disabled", "disabled");
    },
    success: function(data){
      setTimeout(()=>{
        window.location.href = "/login"
      }, 2000)
    },
    error: function(error){
      console.log(error);
    }
  });
});

$("#cprojectbtn").click(function(event){
  const val = sessionStorage.getItem("id")
  const data ={
    id: val
  }
  const jsonData= jQuery.param(data)
  $.ajax({
    url: "/dashboard/project",
    method: "POST",
    timeout: 15000,
    data: jsonData,
    dataType: "json",
    beforeSend:function(){
    },
    success: function(data){
      if(data.message == "fail"){
        Swal.fire("The account does not have the enough rights")
      }
      else{
        setTimeout(()=>{
          window.location.href = "/create/project"
        }, 100)
      }
    },
    error: function(error){
      console.log(error);
    }
  })
})

$("#AvailableProjects").click(function(event){
  setTimeout(()=>{
    window.location.href = "/project/list"
  }, 1)
})

$("#uploadButton").click(function(event){
  const val = sessionStorage.getItem("id")
  const data ={
    id: val,
    content: $("#createProjectForm")
  }
  const jsonData= jQuery.param(data)
  $.ajax({
    url: "/create/project",
    method: "POST",
    timeout: 15000,
    data: jsonData,
    dataType: "json",
    beforeSend:function(){
      $("#uploadButton").attr("disabled", "disabled");
    },
    success: function(data){
      if(data.message == "exist"){
        Swal.fire("Ya existe un proyecto con ese nombre registrado")
      }
      if(data.message == "success"){
        setTimeout(()=>{
          window.location.href = "/dashboard"
        }, 400)
      }
    },
    error: function(error){
      console.log(error);
    }
  });
})