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

app.use('/', routes);

app.get("/", function (req, res){
    if(req.session.loggedin){
        res.redirect("/dashboard")
    }
    else{
        res.redirect("/home")
    }
})

//Create
app.post('/register/talent', function(request, response){
    var TalEmail = request.body.TalEmail;
    var Talpassword = request.body.Talpassword;
    var TalPhoneNum = request.body.TalPhoneNum;
    var TalLocation = request.body.TalLocation;
    var Taldesc = request.body.Taldesc;
    var TalProjectActivity = request.body.TalProjectActivity;
    var TalName = request.body.TalName;
    var TalLastName = request.body.TalLastName;
    var TalBirthDate = request.body.TalBirthDate;
    var TalProfileTitle = request.body.TalProfileTitle;
    var TalFormacion = request.body.TalAcademicBackground;
    var TalAvTime = request.body.TalAvTime;
    var TalAvPlace = request.body.TalAvPlace;

    var TalCapacities = request.body.TalProfileTitle;
    var TalProfActivity = request.body.TalAcademicBackground;
    var TalCost = request.body.TalCost;
    var TalCostType = request.body.TalCostType;

    setTimeout(async ()=>{
        await sql_server.connect(dbConfig)
        var exist = await sql_server.query`SELECT * from [dbo].[Account] where Email =${TalEmail}`
        if(exist.recordset.length == 1){
            response.json({message: "exist"})
        }
        else{
            await sql_server.query
            `INSERT INTO [dbo].[Account] (Email, Password, PhoneNum, Location, Description, Score, AccountType)
            VALUES (${TalEmail}, ${Talpassword}, ${TalPhoneNum}, ${TalLocation}, ${Taldesc}, ${0}, ${"Talent"})`;
            
            var AccEnt = await sql_server.query`SELECT AccId from [dbo].[Account] where Email =${TalEmail}`
            var id = AccEnt.recordset[0].AccId
            
            await sql_server.query
                `INSERT INTO [dbo].[Talent] (AccId, Nombre, Apellidos, BirthDate, ProjectActivity, Formacion, TituloPerfil, DispTime, DispPlace, Capacidades, ProfActivity, Cost, CostType)
                VALUES (${parseInt(id, 10)}, ${TalName}, ${TalLastName}, ${TalBirthDate}, ${TalProjectActivity}, ${TalFormacion}, ${TalProfileTitle}, ${TalAvTime},  ${TalAvPlace},  ${TalCapacities}, ${TalProfActivity}, ${TalCost}, ${TalCostType})`;
            
            response.json({message: "success"})
        }
    }, 3)
})







app.post('/register/individual', function(request, response){
    var IndEmail = request.body.IndEmail;
    var Indpassword = request.body.Indpassword;
    var IndPhoneNum = request.body.IndPhoneNum;
    var IndLocation = request.body.IndLocation;
    var Inddesc = request.body.Inddesc;
    var IndProjectActivity = request.body.IndProjectActivity;
    var IndName = request.body.IndName;
    var IndLastName = request.body.IndLastName;
    var IndBirthDate = request.body.IndBirthDate;
    var IndProfileTitle = request.body.IndProfileTitle;

    setTimeout(async ()=>{
        await sql_server.connect(dbConfig)
        var exist = await sql_server.query`SELECT * from [dbo].[Account] where Email =${IndEmail}`
        if(exist.recordset.length == 1){
            response.json({message: "exist"})
        }
        else{
            await sql_server.query
            `INSERT INTO [dbo].[Account] (Email, Password, PhoneNum, Location, Description, Score, AccountType)
            VALUES (${IndEmail}, ${Indpassword}, ${IndPhoneNum}, ${IndLocation}, ${Inddesc}, ${0}, ${"Hunter"})`;

            var AccEnt = await sql_server.query`SELECT AccId from [dbo].[Account] where Email =${IndEmail}`
            var id = AccEnt.recordset[0].AccId
            
            await sql_server.query
                `INSERT INTO [dbo].[Hunter] (AccID, GiroProyectos)
                VALUES (${parseInt(id, 10)}, ${IndProjectActivity})`;
            
            var HuntEnt = await sql_server.query`SELECT HunterID from [dbo].[Hunter] where AccID =${id}`
            var hid = HuntEnt.recordset[0].HunterID

            await sql_server.query
                `INSERT INTO [dbo].[Individual] (HunterID, Nombre, Apellidos, DateBirth, TituloPerfil)
                VALUES (${parseInt(hid, 10)}, ${IndName}, ${IndLastName}, ${IndBirthDate}, ${IndProfileTitle})`;
            response.json({message: "success"})
        }
    }, 3)
})


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

            AccEnt = await sql_server.query`SELECT AccId from [dbo].[Account] where Email =${CompEmail}`
            id = AccEnt.recordset[0].AccId
            
            await sql_server.query
                `INSERT INTO [dbo].[Hunter] (AccID, GiroProyectos)
                VALUES (${parseInt(id, 10)}, ${CompProjectActivity})`;
            
            HuntEnt = await sql_server.query`SELECT HunterID from [dbo].[Hunter] where AccID =${id}`
            hid = HuntEnt.recordset[0].HunterID

            await sql_server.query
                `INSERT INTO [dbo].[Company] (HunterID, NombreCompania, GiroEmpresarial, FechaEstablecimiento, RepresentanteLegal)
                VALUES (${parseInt(hid, 10)}, ${CompanyName}, ${BusinessActivity}, ${EstDate}, ${LegalRepresentative})`;
            response.json({message: "success"})
        }
    }, 3)
});

//Read
app.post("/login", function(request, response){
    var emailLogin = request.body.emailLogin
    var passwordLogin = request.body.passwordLogin
    
    setTimeout(async ()=> {
        await sql_server.connect(dbConfig)
        var exist = await sql_server.query`SELECT * from [dbo].[Account] where Email = ${emailLogin}`
        if(exist.recordset.length == 1){
            if(exist.recordset[0].Password != passwordLogin){
                response.json({message: "Incorrect Password"})
            }
            else{
                var t1 = await sql_server.query`SELECT * from [dbo].[Hunter] where AccID = ${exist.recordset[0].AccId}`
                var t2 = await sql_server.query`SELECT * from [dbo].[Talent] where AccId = ${exist.recordset[0].AccId}`
                //console.log(t2.recordset)
                //console.log(t1.recordset)
                if(t2.recordset.length == 1){
                    response.json({id: exist.recordset[0].AccId, name: t2.recordset[0].Nombre})
                }
                else if(t1.recordset.length == 1){
                    t1 = await sql_server.query`SELECT * from [dbo].[Company] where HunterID = ${t1.recordset[0].HunterID}`
                    t2 = await sql_server.query`SELECT * from [dbo].[Individual] where HunterID = ${t1.recordset[0].HunterID}`
                    //console.log(t2.recordset)
                    //console.log(t1.recordset)
                    if(t1.recordset.length == 1){
                        response.json({id: exist.recordset[0].AccId, name: t1.recordset[0].NombreCompania})
                    }
                    else if(t2.recordset.length == 1){
                        response.json({id: exist.recordset[0].AccId, name: t2.recordset[0].Nombre})
                    }
                }
            }
        }
        else{
            response.json({message: "No exist"})
        } 
    }, 1)
})

app.post("/dashboard/project", function(req, res){
    var id = req.body.id
    setTimeout(async () =>{
        await sql_server.connect(dbConfig)
        var exist2 = await sql_server.query`SELECT * from [dbo].[Hunter] where AccID = ${id}`
        if(exist2.recordset.length == 1){
            res.json({message: "success"});
        }
        else{
            res.json({message: "fail"});
        }
    })
})

app.post("/create/project", function(req, res){
    console.log(req.body.data)
    var PName = req.body.data.projectName
    var PStart = req.body.data.startDate
    var PEnd = req.body.data.endDate
    var PType = req.body.data.paymentType
    var PAmount = req.body.data.paymentAmount
    var PDesc = req.body.data.description
    var PDes = req.body.data.desirableAbilities
    var PNed = req.body.data.requiredAbilities
    var HunterID = req.body.id

    setTimeout(async () =>{
        await sql_server.connect(dbConfig)
        var title = await sql_server.query`SELECT * FROM [dbo].[Project] where Titulo=${PName}`
        if(title.recordset.length == 1){
            response.json({message: "exist"})
        }
        await sql_server.query
        `INSERT INTO [dbo].[Project] (HunterID, Titulo, FechaPub, FechaVen, TipoPago, Cantidad, Descripcion, HabDeseadas, HabReq)
        VALUES (${HunterID}, ${PName}, ${PStart}, ${PEnd}, ${PType}, ${PAmount}, ${PDesc}, ${PDes}, ${PNed})`

        response.json({message: "success"})
    }, 1)
})

app.post('/project/list', function(request, response) {
    setTimeout(async () =>{
        await sql_server.connect(dbConfig)
        var exist2 = await sql_server.query`SELECT * from [dbo].[Project]`
        if(exist2.recordset.length > 0){
            response.json(exist2.recordset);
        }
        else{
            response.json({message: "fail"});
        }
    }, 1)
});



app.listen(process.env.SPORT, function() { console.log("Running Express")});
