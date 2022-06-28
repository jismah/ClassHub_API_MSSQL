module.export = (sequelize, Sequelize) => {
    const Period = sequelize.define("period", {
        numPerCursado: {
            type: Sequelize.INTEGER,
        },
        idStudent: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.STRING,
        }
    });

    return Period;
}