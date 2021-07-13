'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cuota: {
        type: Sequelize.INTEGER
      },
      fechaPago: {
        type: Sequelize.DATE
      },
      importe: {
        type: Sequelize.DECIMAL
      },
      estado: {
        type: Sequelize.STRING
      },
      notaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Nota',
            key: 'id',
            as: 'notaId'
          }
        }, 
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Plans');
  }
};