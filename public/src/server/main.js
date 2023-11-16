const {db} = require(`./dbConnection`);



doc = document.getElementById("regCompany")

doc.addEventListener("click", (ev) =>{
    console.log("Hola Guapuras")
})
    
function Test(){
    setTimeout(async () => {
        res = await db.executeQuery("select * from [dbo].[Account]");
        test = res.data
        //res2 = test.find(obj => obj.AccId == 1)
        console.log(test)
    }, 300)
}
/*
btn.click(function(){
    console.log("Heroe")
    setTimeout(async () => {
    res = await db.executeQuery("select * from [dbo].[Account]");
    test = res.data
    //res2 = test.find(obj => obj.AccId == 1)
    console.log(test)
}, 300)
})
*/
//res = await db.executeQuery("select 1");
