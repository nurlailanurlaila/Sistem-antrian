const Pasien = require("../models/pasien.model.js");

// Create and Save a new Pasien
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nama) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Pasien
    const pasien = new Pasien({
        nama: req.body.nama,
        dokter_id: req.body.dokter_id,
        nik: req.body.nik,
        alamat: req.body.alamat,
        bpjs: req.body.bpjs,
        phone: req.body.phone,
    });

    Pasien.findTodayMaxNomorAntrian(pasien.dokter_id, (err, data) => {
        if (err) {
            pasien.nomor_antrian = 1
            Pasien.create(pasien, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating pasien."
                    });
                else res.send(data);
            });
        } else {
            if (data.nomor_antrian == undefined) {
                pasien.nomor_antrian = 1
            } else {
                pasien.nomor_antrian = data.nomor_antrian + 1   
            }
            Pasien.create(pasien, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating pasien."
                    });
                else res.send(data);
            });
        }
    })
};

// Retrieve all Pasien from the database.
exports.findAll = (req, res) => {
    Pasien.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pasien."
            });
        else res.send(data);
    });
};

// Find a single Pasien with a pasienId
exports.findOne = (req, res) => {
    Pasien.findById(req.params.pasienId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Pasien with id ${req.params.pasienId} not found.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Pasien with id " + req.params.pasienId
                });
            }
        } else res.send(data);
    });
};

// Update a Pasien identified by the pasienId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    Pasien.updateById(
        req.params.pasienId,
        new Pasien(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Pasien with id ${req.params.pasienId} not found.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Pasien with id " + req.params.pasienId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Pasien with the specified pasienId in the request
exports.delete = (req, res) => {
    Pasien.remove(req.params.pasienId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Pasien with id ${req.params.pasienId} not found.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Pasien with id " + req.params.pasienId
                });
            }
        } else res.send({ message: `Pasien was deleted successfully!` });
    });
};