'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Nota', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ncuotas: {
        type: Sequelize.INTEGER
      },
      monto: {
        type: Sequelize.DECIMAL
      },
      pagoTotal: {
        type: Sequelize.DECIMAL
      },
      saldoTotal: {
        type: Sequelize.DECIMAL
      },
      gestion: {
        type: Sequelize.INTEGER
      },
      ivigencia: {
        type: Sequelize.DATE
      },
      fvigencia: {
        type: Sequelize.DATE
      },
      usuarioId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id',
            as: 'usuarioId'
          }
        }, 
      membresiaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Membresia',
            key: 'id',
            as: 'membresiaId'
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
    await queryInterface.dropTable('Nota');
  }
};