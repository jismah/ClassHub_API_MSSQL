module.export = (sequelize, Sequelize) => {
    const Teacher = sequelize.define("teacher", {
        name: {
            type: Sequelize.STRING,
        },
        surname: {
            type: Sequelize.STRING,
        }
    });

    return Teacher;
}