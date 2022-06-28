module.export = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        name: {
            type: Sequelize.STRING,
        },
        surname: {
            type: Sequelize.STRING,
        },
        university: {
            type: Sequelize.STRING,
        },
        career: {
            type: Sequelize.STRING,
        }
    });

    return Student;
}