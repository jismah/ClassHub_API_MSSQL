// LLAMANDO LOS PARAMETROS
const dbConfig = require("../config/db.config.js");

// INICIALIZANDO LOS PARAMETROS
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect
});

// CREANDO CONEXION CON BASE DE DATOS
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.subjects = require("./subject.model.js")(sequelize, Sequelize);

// EXPORTANDO CONEXION
module.exports = db;