module.exports = app => {
    const subjects = require("../controllers/subject.controller.js");

    var router = require("express").Router();

    // CREAR NUEVA MATERIA
    router.post("/", subjects.create);

    // LISTAR TODAS LAS MATERIAS
    router.get("/", subjects.findAll);

    // Retrieve all published Tutorials
    //router.get("/published", tutorials.findAllPublished);

    // LISTAR UNA MATERIA POR ID
    router.get("/:id", subjects.findOne);

    // ACTUALIZAR UNA MATERIA POR ID
    router.put("/:id", subjects.update);

    // ELIMINAR UNA MATERIA POR ID
    router.delete("/:id", subjects.delete);

    // ELIMINAR TODAS LAS MATERIAS
    router.delete("/", subjects.deleteAll);

    app.use('/api/subjects', router);
}