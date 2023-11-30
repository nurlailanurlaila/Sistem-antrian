module.exports = app => {
    const poli = require("../controllers/poli.controller.js");

    var router = require("express").Router();

    // Create a new Poli
    router.post("/", poli.create);

    // Retrieve all Poli
    router.get("/", poli.findAll);

    // Retrieve a single Poli with id
    router.get("/:id", poli.findOne);

    // Update a Poli with id
    router.put("/:id", poli.update);

    // Delete a Poli with id
    router.delete("/:id", poli.delete);

    // Delete all Poli
    router.delete("/", poli.deleteAll);

    app.use('/api/polis', router);
};