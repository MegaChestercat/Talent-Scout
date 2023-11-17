const express = require("express");
const Controller = require("../controller/Controller");
const router = express.Router();

router.get("/login", Controller.login);
router.get("/register", Controller.register);
router.get("/register/hunter", Controller.registerHunter);
router.get("/register/individual", Controller.registerIndividual);
router.get("/register/company", Controller.registerCompany);
router.get("/register/talent", Controller.registerTalent);

module.exports = router;