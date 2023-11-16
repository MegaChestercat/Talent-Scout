const sql = require("rest-mssql-nodejs");

const db = new sql({
    user: "sa",
    password: "SAPB1Admin",
    server: "192.168.100.100",
    database: "TalentosDB",
    port: 1433
});

/*
setTimeout(async () => {
    res = await db.executeQuery("select * from [dbo].[Account]");
    test = res.data[0]
    res2 = test.find(obj => obj.AccId == 1)
    console.log(res2.AccId)
}, 300)
*/
module.exports = {db};