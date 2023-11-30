const sql = require("./db.js");

// constructor
const Poli = function(poli) {
    this.name = poli.name;
};

// Create and Save a new Poli
Poli.create = (newPoli, result) => {
    sql.query("INSERT INTO poli SET ?", newPoli, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created poli: ", { id: res.insertId, ...newPoli });
        result(null, { id: res.insertId, ...newPoli });
    });
};

// Retrieve all Poli from the database.
Poli.getAll = result => {
    sql.query("SELECT * FROM poli", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("poli: ", res);
        result(null, res);
    });
};

// Find a single Poli with a poliId
Poli.findById = (poliId, result) => {
    sql.query(`SELECT * FROM poli WHERE id = ${poliId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found poli: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Poli with the id
        result({ kind: "not_found" }, null);
    });
};

// Update a Poli identified by the poliId in the request
Poli.updateById = (id, poli, result) => {
    sql.query(
        "UPDATE poli SET name = ? WHERE id = ?",
        [poli.name, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Poli with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated poli: ", { id: id, ...poli });
            result(null, { id: id, ...poli });
        }
    );
};

// Delete a Poli with the specified poliId in the request
Poli.remove = (id, result) => {
    sql.query("DELETE FROM poli WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Poli with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted poli with id: ", id);
        result(null, res);
    });
};

// Delete all Poli from the database.
Poli.removeAll = result => {
    sql.query("DELETE FROM poli", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    });
};

module.exports = Poli;