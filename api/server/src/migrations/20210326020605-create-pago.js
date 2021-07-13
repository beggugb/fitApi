'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaPago: {
        type: Sequelize.DATE
      },
      pagoTotal: {
        type: Sequelize.DECIMAL
      },
      usuarioId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id',
            as: 'usuarioId'
          }
        }, 
      planId: {
        type: Sequelize.INTEGER,
         references: {
         model: 'Plans',
         key: 'id',
         as: 'planId'
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
    await queryInterface.dropTable('Pagos');
  }
};