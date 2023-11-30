const Dokter = require("../models/dokter.model.js");

// Create and Save a new Dokter
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a Dokter
    const dokter = new Dokter({
        name: req.body.name,
        poli_id: req.body.poli_id,
        jam_praktek: req.body.jam_praktek
    });

    // Save Dokter in the database
    Dokter.create(dokter, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Dokter."
        });
        else res.send(data);
    });
};

// Retrieve all Dokter from the database.
exports.findAll = (req, res) => {
    Dokter.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving dokter."
        });
        else res.send(data);
    });
};

// Find a single Dokter by Id
exports.findOne = (req, res) => {
    Dokter.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Dokter with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error retrieving Dokter with id " + req.params.id
            });
            }
        } else res.send(data);
    });
};

// Update a Dokter identified by the dokterId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    Dokter.updateById(
        req.params.id,
        new Dokter(req.body),
        (err, data) => {
            if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Dokter with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                message: "Error updating Dokter with id " + req.params.id
                });
            }
            } else res.send(data);
        }
    );
};

// Delete a Dokter with the specified dokterId in the request
exports.delete = (req, res) => {
    Dokter.remove(req.params.id, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found Dokter with id ${req.params.id}.`
            });
        } else {
            res.status(500).send({
            message: "Could not delete Dokter with id " + req.params.id
            });
        }
        } else res.send({ message: `Dokter was deleted successfully!` });
    });
};

// Delete all Dokter from the database.
exports.deleteAll = (req, res) => {
    Dokter.removeAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all dokter."
        });
        else res.send({ message: `All Dokter were deleted successfully!` });
    });
};

// Find all Dokter with a poliId
exports.findAllByPoliId = (req, res) => {
    Dokter.getAllByPoliId(req.params.poli_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Dokter with poliId ${req.params.poli_id}.`
            });
            } else {
            res.status(500).send({
                message: "Error retrieving Dokter with poliId " + req.params.poli_id
            });
            }
        } else res.send(data);
    });
};