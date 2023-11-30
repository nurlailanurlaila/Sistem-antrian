const Poli = require("../models/poli.model.js");

// Create and Save a new Poli
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a Poli
    const poli = new Poli({
        name: req.body.name
    });

    // Save Poli in the database
    Poli.create(poli, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Poli."
        });
        else res.send(data);
    });
};

// Retrieve all Poli from the database.
exports.findAll = (req, res) => {
    Poli.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving poli."
        });
        else res.send(data);
    });
};

// Find a single Poli by Id
exports.findOne = (req, res) => {
    Poli.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Poli with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error retrieving Poli with id " + req.params.id
            });
            }
        } else res.send(data);
    });
};

// Update a Poli identified by the poliId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    Poli.updateById(
        req.params.id,
        new Poli(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Poli with id ${req.params.id}.`
                });
                } else {
                res.status(500).send({
                    message: "Error updating Poli with id " + req.params.id
                });
                }
            } else res.send(data);
        }
    );
};

// Delete a Poli with the specified poliId in the request
exports.delete = (req, res) => {
    Poli.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Poli with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Could not delete Poli with id " + req.params.id
            });
            }
        } else res.send({ message: `Poli was deleted successfully!` });
    });
};

// Delete all Poli from the database.
exports.deleteAll = (req, res) => {
    Poli.removeAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all poli."
        });
        else res.send({ message: `All Poli were deleted successfully!` });
    });
};