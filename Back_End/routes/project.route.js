const express=require("express");
const { addProject } = require("../controllers/project.controllers");
const router=express.Router();

router.post("/add-project",addProject);

module.exports=router;
