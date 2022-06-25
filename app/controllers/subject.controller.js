const db = require("../models");
const Subject = db.subjects;
const Op = db.Sequelize.Op;

// CREANDO U GUARDANDO NUEVA MATERIA
exports.create = (req, res) => {
    // VALIDANDO REQUEST
    if (!req.body.name){
        res.status(400).send({ 
            message: "Contenido no puede estar vacio"
        });
        return;
    }

    // CREANDO UNA MATERIA
    const subject = {
        name: req.body.name,
        credits: req.body.credits,
        status: req.body.status,
    };

    // GUARDANDO MATERIA EN LA DB
    Subject.create(subject)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error creating subject."
        });
    });
};

// RECUPERANDO TODAS LA MATERIAS DE LA DB 

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%`}} : null;

    Subject.findAll({ where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error finding all subjects."
        });
    });
}

// BUSCAR UNA MATERIA POR SU ID
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Subject.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving subject with id=" + id
        });
      });
  };

// ACTUALIZAR MATERIA POR SU ID
exports.update = (req, res) => {
    const id = req.params.id;
  
    Subject.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Subject was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Subject with id=${id}. Maybe Subject was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Subject with id=" + id
        });
      });
  };

  // ELIMINAR UNA MATERIA POR SU ID
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Subject.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Subject was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Subject with id=${id}. Maybe Subject was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Subject with id=" + id
        });
      });
  };

  // ELIMINAR TODAS LA MATERIAS DE LA DB
exports.deleteAll = (req, res) => {
    Subject.destroy({  
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Subjects were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Subjects."
        });
      });
  };
  
  // BUSCAR TODAS LAS MATERIAS LOGRADAS
//   exports.findAllPublished = (req, res) => {
//     Tutorial.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };