const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const sql_server = require("mssql")

//const {getConnection} = require("./public/src/server/dbConnection")

const dbConfig = {
    server: process.env.SERVER,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 1433,
    options: {trustServerCertificate:true}
}

var app = express();

app.use('/', express.static('public'));

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.redirect(301,'/home.html')
});
app.get('', function(request, response) {
    response.redirect(301,'/home.html')
});


//Create
app.post('/register_company', function(request, response) {
    var CompEmail = request.body.CompEmail;
    var Comppassword = request.body.Comppassword;
    var CompPhoneNum = request.body.CompPhoneNum;
    var CompLocation = request.body.CompLocation;
    var Compdesc = request.body.Compdesc;
    var CompProjectActivity = request.body.CompProjectActivity;
    var CompanyName = request.body.CompanyName;
    var LegalRepresentative = request.body.LegalRepresentative;
    var BusinessActivity = request.body.BusinessActivity;
    var EstDate = request.body.BusinessActivity;

    setTimeout(async ()=> {
        await sql_server.connect(dbConfig)
        await sql_server.query
            `INSERT INTO [dbo].[Account] (Email, Password, PhoneNum, Location, Description, Score, AccountType)
            VALUES (${CompEmail}, ${Comppassword}, ${CompPhoneNum}, ${CompLocation}, ${Compdesc}, ${0}, ${"Hunter"})`;

        AccEnt = await sql_server.query`SELECT AccId from [dbo].[Account] where Email =${CompEmail} and Description =${Compdesc}`
        console.log(AccEnt)
        id = AccEnt.recordset[0].AccId
        console.log(id)
        
        await sql_server.query
            `INSERT INTO [dbo].[Hunter] (AccID, GiroProyectos)
            VALUES (${parseInt(id, 10)}, ${CompProjectActivity}`;
        
        HuntEnt = await sql_server.query`SELECT HunterID from [dbo].[Hunter] where AccID =${id}`
        hid = HuntEnt.recordset[0].HunterID

        await sql_server.query
            `INSERT INTO [dbo].[Company] (HunterID, NombreCompania, GiroEmpresarial, FechaEstablecimiento, RepresentanteLegal)
            VALUES (${parseInt(hid, 10)}, ${CompanyName}, ${CompPhoneNum}, ${BusinessActivity}, ${EstDate}, ${LegalRepresentative})`;
        response.json({message: "Data saved"})
    }, 3)

    
    //"${CompProjectActivity}","${CompanyName}", "${LegalRepresentative}, "${BusinessActivity}", "${EstDate}"
});

//Read
app.get('/getAll', function(request, response) {
    
});

//Update


//Delete


app.listen(process.env.SPORT, function() { console.log("Running Express")});
