const express=require("express");
const { addProject, editProject, getAllProject } = require("../controllers/project.controllers");
const upload = require("../middlewares/multerFileHandler");
const router=express.Router();

router.get("/",getAllProject)
router.post("/add-project",upload('project').single('logo'),addProject);
router.put("/edit-project/:id",editProject);

module.exports=router;
