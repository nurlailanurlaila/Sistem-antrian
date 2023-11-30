const sql = require("./db.js");

// constructor
const Pasien = function(pasien) {
    this.nama = pasien.nama;
    this.dokter_id = pasien.dokter_id;
    this.nik = pasien.nik;
    this.alamat = pasien.alamat;
    this.bpjs = pasien.bpjs;
    this.phone = pasien.phone;
    this.nomor_antrian = pasien.nomor_antrian;
};

// Create and Save a new Pasien
Pasien.create = (newPasien, result) => {
    sql.query("INSERT INTO pasien SET ?", newPasien, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // console.log("created pasien: ", { id: res.insertId, ...newPasien });
        result(null, { id: res.insertId, ...newPasien });
    });
};

// Retrieve all Pasien from the database.
Pasien.getAll = result => {
    sql.query("SELECT * FROM pasien", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("pasien: ", res);
        result(null, res);
    });
};

// Find a single Pasien with a pasienId
Pasien.findById = (pasienId, result) => {
    sql.query(`SELECT * FROM pasien WHERE id = ${pasienId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found pasien: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Pasien with the id
        result(null, res);
    });
};

// Update a Pasien identified by the pasienId in the request
Pasien.updateById = (id, pasien, result) => {
    sql.query(
        "UPDATE pasien SET nama = ?, dokter_id = ?, nik = ?, alamat = ?, bpjs = ?, phone = ?, nomor_antrian = ? WHERE id = ?",
        [pasien.nama, pasien.dokter_id, pasien.nik, pasien.alamat, pasien.bpjs, pasien.phone, pasien.nomor_antrian, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

        if (res.affectedRows == 0) {
            // not found Pasien with the id
            result({ kind: "not_found" }, null);
            return;
        }

        // console.log("updated pasien: ", { id: id, ...pasien });
        result(null, { id: id, ...pasien });
    });
};

// Delete a Pasien with the specified pasienId in the request
Pasien.remove = (id, result) => {
    sql.query("DELETE FROM pasien WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
            // not found Pasien with the id
            result({ kind: "not_found" }, null);
            return;
        }

        // console.log("deleted pasien with id: ", id);
        result(null, res);
    });
};

// Find a single Pasien with created_at is current date (today) and max nomor_antrian
Pasien.findTodayMaxNomorAntrian = (dokterId, result) => {
    sql.query(`SELECT * FROM pasien WHERE date(created_at) = CURDATE() and dokter_id = ${dokterId} ORDER BY nomor_antrian DESC LIMIT 1`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        return;
        }

        if (res.length) {
            console.log("found pasien: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Pasien with the id
        result(null, res);
    });
};

module.exports = Pasien;