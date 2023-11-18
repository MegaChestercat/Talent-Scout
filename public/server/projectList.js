$(document).ready(function (){
    $.ajax({
        url: "/project/list",
        method: "GET",
        timeout: 15000,
        data: jsonData,
        dataType: "json",
        beforeSend:function(){
        },
        success: function(data){
          if(data.message == "fail"){
          }
          else{
            for(let i = 0; i < data.length; i++){
                let tr = document.createElement('tr');
                let col1 = document.createElement('td');
                col1.textContent = `${data[i].ProjectID}`;

                let col2 = document.createElement('td');
                col2.textContent = `${data[i].HunterID}`;

                let col3 = document.createElement('td');
                col3.textContent = `${data[i].Titulo}`;

                let col4 = document.createElement('td');
                col4.textContent = `${data[i].FechaPub}`;

                let col5 = document.createElement('td');
                col5.textContent = `${data[i].FechaVen}`;

                let col6 = document.createElement('td');
                col6.textContent = `${data[i].Descripcion}`;

                let JoinBtnRow = document.createElement('td');
                JoinBtnRow.className = "DelBtnCon"
                let JoinBtn = document.createElement('a');
                JoinBtn.textContent = `Join`;

                JoinBtn.addEventListener('click', joinProject);

                tableBody.appendChild(tr);
                tr.appendChild(col1)
                tr.appendChild(col2)
                tr.appendChild(col3)
                tr.appendChild(col4)
                tr.appendChild(col5)
                tr.appendChild(col6)
                tr.appendChild(JoinBtnRow)
                JoinBtnRow.appendChild(JoinBtn)
            }
          }
        },
        error: function(error){
          console.log(error);
        }
      })
})
