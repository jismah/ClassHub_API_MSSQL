module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define("subject", {
        name: {
            type: Sequelize.STRING,
        },
        credits: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.STRING,
        }
    });

    return Subject;
}