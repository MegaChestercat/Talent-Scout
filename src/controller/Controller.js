function login(req, res){
    res.render("login/login")
}
function register(req, res){
    res.render("login/register")
}
function registerCompany(req, res){
    res.render("login/register_company")
}
function registerHunter(req, res){
    res.render("login/register_hunter_type")
}
function registerIndividual(req, res){
    res.render("login/register_individual")
}
function registerTalent(req, res){
    res.render("login/register_talent")
}

function home(req, res){
    res.render("home")
}

function createProject(req, res){
    res.render("others/createProject")
}

function createContract(req, res){
    res.render("others/contract")
}

function dash(req, res){
    res.render("menu/dashboard");
}

function speedDating(res, res){
    res.render("others/speeddating")
}

function projectList(res, res){
    res.render("menu/project_list")
}


module.exports = {
    login: login,
    register: register,
    registerCompany: registerCompany,
    registerHunter: registerHunter,
    registerIndividual: registerIndividual,
    registerTalent: registerTalent,
    home: home,
    dash: dash,
    create: createProject,
    contract: createContract,
    speed: speedDating,
    projectList: projectList,
}
