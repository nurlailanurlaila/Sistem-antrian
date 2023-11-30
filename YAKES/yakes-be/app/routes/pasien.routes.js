module.exports = app => {

    const pasien = require("../controllers/pasien.controller.js");

    var router = require("express").Router();

    // Create a new Pasien
    router.post("/", pasien.create);

    // Retrieve all Pasien
    router.get("/", pasien.findAll);

    // Retrieve a single Pasien with id
    router.get("/:id", pasien.findOne);

    // Update a Pasien with id
    router.put("/:id", pasien.update);

    // Delete a Pasien with id
    router.delete("/:id", pasien.delete);

    app.use('/api/pasien', router);
};