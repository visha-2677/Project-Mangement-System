const express=require("express");
const { addProject, editProject, getAllProject } = require("../controllers/project.controllers");
const router=express.Router();

router.get("/",getAllProject)
router.post("/add-project",addProject);
router.put("/edit-project/:id",editProject);

module.exports=router;
