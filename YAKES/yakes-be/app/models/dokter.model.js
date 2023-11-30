const sql = require("./db.js");

// constructor
const Dokter = function(dokter) {
    this.name = dokter.name;
    this.poli_id = dokter.poli_id;
    this.jam_praktek = dokter.jam_praktek;
};

// Create and Save a new Dokter
Dokter.create = (newDokter, result) => {
    sql.query("INSERT INTO dokter SET ?", newDokter, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created dokter: ", { id: res.insertId, ...newDokter });
        result(null, { id: res.insertId, ...newDokter });
    });
};

// Retrieve all Dokter from the database.
Dokter.getAll = result => {
    sql.query("SELECT * FROM dokter", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("dokter: ", res);
        result(null, res);
    });
};

// Find a single Dokter with a dokterId
Dokter.findById = (dokterId, result) => {
    sql.query(`SELECT * FROM dokter WHERE id = ${dokterId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found dokter: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Dokter with the id
        result({ kind: "not_found" }, null);
    });
};

// Update a Dokter identified by the dokterId in the request
Dokter.updateById = (id, dokter, result) => {
    sql.query(
        "UPDATE dokter SET name = ?, poli_id = ?, jam_praktek = ? WHERE id = ?",
        [dokter.name, dokter.poli_id, dokter.jam_praktek, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Dokter with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated dokter: ", { id: id, ...dokter });
            result(null, { id: id, ...dokter });
        }
    );
};

// Delete a Dokter with the specified dokterId in the request
Dokter.remove = (id, result) => {
    sql.query("DELETE FROM dokter WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Dokter with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted dokter with id: ", id);
        result(null, res);
    });
};

// Delete all Dokter from the database.
Dokter.removeAll = result => {
    sql.query("DELETE FROM dokter", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    });
};

// Retrieve all Dokter by poli_id from the database.
Dokter.getAllByPoliId = (poliId, result) => {
    sql.query(`SELECT * FROM dokter WHERE poli_id = ${poliId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } else {
            console.log("dokter: ", res);
            result(null, res);
        }
    });
};

module.exports = Dokter;