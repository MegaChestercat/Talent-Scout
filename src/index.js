const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const sql_server = require("mssql")
const session = require('express-session')
const path = require("path")
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require('body-parser')
const routes = require("./routes/index")

const dbConfig = {
    server: process.env.SERVER,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 1433,
    options: {trustServerCertificate:true}
}

var app = express();

app.set('views',path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("view engine", "ejs")
app.use(express.static("public"));
app.use('/css', express.static(__dirname + "public/css"))
app.use('/images', express.static(__dirname + "public/images"))
app.use('/server', express.static(__dirname + "public/server"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.get("/", function (req, res){
    res.render("home")
});
app.get("", function (req, res){
    res.render("home")
});
app.use('/', routes);




//Create
app.post('/register/company', function(request, response) {
    var CompEmail = request.body.CompEmail;
    var Comppassword = request.body.Comppassword;
    var CompPhoneNum = request.body.CompPhoneNum;
    var CompLocation = request.body.CompLocation;
    var Compdesc = request.body.Compdesc;
    var CompProjectActivity = request.body.CompProjectActivity;
    var CompanyName = request.body.CompanyName;
    var LegalRepresentative = request.body.LegalRepresentative;
    var BusinessActivity = request.body.BusinessActivity;
    var EstDate = request.body.EstDate;
    
    setTimeout(async ()=> {
        await sql_server.connect(dbConfig)
        var exist = await sql_server.query`SELECT * from [dbo].[Account] where Email =${CompEmail}`
        if(exist.recordset.length == 1){
            response.json({message: "exist"})
        }
        else{
            await sql_server.query
            `INSERT INTO [dbo].[Account] (Email, Password, PhoneNum, Location, Description, Score, AccountType)
            VALUES (${CompEmail}, ${Comppassword}, ${CompPhoneNum}, ${CompLocation}, ${Compdesc}, ${0}, ${"Hunter"})`;

            AccEnt = await sql_server.query`SELECT AccId from [dbo].[Account] where Email =${CompEmail} and Description =${Compdesc}`
            console.log(AccEnt)
            id = AccEnt.recordset[0].AccId
            
            await sql_server.query
                `INSERT INTO [dbo].[Hunter] (AccID, GiroProyectos)
                VALUES (${parseInt(id, 10)}, ${CompProjectActivity})`;
            
            HuntEnt = await sql_server.query`SELECT HunterID from [dbo].[Hunter] where AccID =${id}`
            hid = HuntEnt.recordset[0].HunterID

            await sql_server.query
                `INSERT INTO [dbo].[Company] (HunterID, NombreCompania, GiroEmpresarial, FechaEstablecimiento, RepresentanteLegal)
                VALUES (${parseInt(hid, 10)}, ${CompanyName}, ${BusinessActivity}, ${EstDate}, ${LegalRepresentative})`;
            
            response.json({message: "Saved"})
        }
    }, 3)
});

//Read
app.post("/login", function(request, response){
    var emailLogin = request.body.emailLogin
    var passwordLogin = request.body.passwordLogin
    
    setTimeout(async ()=> {
        await sql_server.connect(dbConfig)
        exist = await sql_server.query`SELECT * from [dbo].[Account] where Email = ${emailLogin}`
        if(exist.recordset.length == 1){
            if(exist.recordset[0].Password != passwordLogin){
                response.json({message: "Incorrect Password"})
            }
            else{
                request.session.loggedin = true;
                request.session.name = exist.recordset[0].AccId;
                response.render('/')
            }
        }
        else{
            response.json({message: "No exist"})
        }
        
    }, 1)
})
app.get('/getAll', function(request, response) {
});

//Update


//Delete


app.listen(process.env.SPORT, function() { console.log("Running Express")});
