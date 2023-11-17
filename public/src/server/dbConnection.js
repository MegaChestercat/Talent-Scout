const sql_server = require("mssql")
const dotenv = require('dotenv')
dotenv.config()

const dbConfig = {
    server: process.env.SERVER,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 1433,
    options: {trustServerCertificate:true}
};

setTimeout(async ()=> {
    await sql_server.connect(dbConfig)
    let products = await sql_server.query`select * from [dbo].[Account]`;
console.log(products)
}, 2)


/*
setTimeout(async () => {
    res = await db.executeQuery("select * from [dbo].[Account]");
    test = res.data[0]
    res2 = test.find(obj => obj.AccId == 1)
    console.log(res2.AccId)
}, 300)
*/
//module.exports = {db};