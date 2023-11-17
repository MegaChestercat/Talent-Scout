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

module.exports = {
    login: login,
    register: register,
    registerCompany: registerCompany,
    registerHunter: registerHunter,
    registerIndividual: registerIndividual,
    registerTalent: registerTalent,
}
