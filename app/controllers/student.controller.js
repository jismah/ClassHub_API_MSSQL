const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.name) {
        res.status(400).send({
            message: "Faltan datos para hacer el Request!"
        });
        return;
    }

    // CREANDO UN ESTUDIANTE
    const student = {
        name: req.body.name,
        surname: req.body.surname,
        university: req.body.university,
        career: req.body.career,
    };

    // GUARDANDO ESTUDIANTE EN LA DB
    Student.create(student)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error creating student."
            })
        })
};

// RECUPERANDO TODOS LOS ESTUDIANTES DE LA DB 
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Student.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error finding all Students."
            });
        });
}

// BUSCAR UN ESTUDIANTE POR SU ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Student with id=" + id
            });
        });
};

// ACTUALIZAR ESTUDIANTE POR SU ID
exports.update = (req, res) => {
    const id = req.params.id;

    Student.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Student was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Student with id=" + id
            });
        });
};

// ELIMINAR UN ESTUDIANTE POR SU ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Student.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Student was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Student with id=" + id
            });
        });
};

// ELIMINAR TODOS LOS ESTUDIANTES DE LA DB
exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Students were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Students."
            });
        });
};
