module.exports = app => {
  
    const dokter = require("../controllers/dokter.controller.js");

    var router = require("express").Router();

    // Create a new Dokter
    router.post("/", dokter.create);

    // Retrieve all Dokter
    router.get("/", dokter.findAll);

    // Retrieve a single Dokter with id
    router.get("/:id", dokter.findOne);

    // Update a Dokter with id
    router.put("/:id", dokter.update);

    // Delete a Dokter with id
    router.delete("/:id", dokter.delete);

    // Delete all Dokter
    router.delete("/", dokter.deleteAll);

    // Retrieve all Dokter by poli_id
    router.get("/poli/:poli_id", dokter.findAllByPoliId);

    app.use('/api/dokter', router);
};