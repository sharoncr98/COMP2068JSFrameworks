const express = require('express');
const router = express.Router();
const Project = require("../models/project");
const project = require('../models/project');
//HTTP handlers
router.get("/", async(req, res, next) =>{
    let projects = await Project.find();
    res.status(200).json(projects);
  });

router.post("/", (req,res ,next) => {
  Project.create(req.body).then
   (project=>{
    
      return res.status(201).json(project); // successfully
    
  });
});

router.delete("/:_id", (req, res, next) =>{
  Project.remove({_id: req.params._id}, (err, project)=>{
    return res.status(204).json(project); // deleted successfully
  });
});

router.put("/", async (req, res, next) => {
  Project.findOneAndUpdate({_id: req.body._id}, req.body).then(project =>{
    return res.status(202).json(project); // updated successfully
  })
  .catch(err =>{
    return res.status(500).json(err);
  });
});


module.exports = router;