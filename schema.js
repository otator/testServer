const { Sequelize, Model, DataTypes } = require('sequelize');
const { default: fastify } = require('fastify');
const fileName = "my_database.sqlite3"
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: fileName
});

class Database extends Model { }

const Doctor = sequelize.define('Doctor',
    {
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    doctorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    appointmentsNumberPerDay: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    avaiable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    // table name
    }, 
    { sequelize, modelName: 'Doctor', tableName: 'doctors'});

const Appointment = sequelize.define('Appointment',
    {
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    patient_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    from: {
        type: DataTypes.DATE,
        allowNull: false
    },
    to: {
        type: DataTypes.DATE,
        allowNull: false
    },
    duration: {
        type: DataTypes.NUMBER,
    },
    
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // table name
    }, 
    { sequelize, modelName: 'Appointment', tableName: 'appointments'});





async function createDatabase() {
    try {
        await sequelize.sync();
        Doctor.hasMany(Appointment, {
            foreignKey: 'doctorId'
          })
        Appointment.belongsTo(Doctor)
        console.log("database created successfully!")
    }
    catch (error) {
        console.log(`Error in creating database => ${error}`);
    }
}




async function createRow(number, fact) {

    const catFact = await Database.create({
        number: number,
        fact: fact
    });
};

createDatabase();
module.exports = createRow;