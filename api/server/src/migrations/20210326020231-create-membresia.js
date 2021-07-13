'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Membresia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orden: {
        type: Sequelize.STRING
      },
      num: {
        type: Sequelize.INTEGER
      },
      ivigencia: {
        type: Sequelize.DATE
      },
      fvigencia: {
        type: Sequelize.DATE
      },
      ingresos: {
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      renovacion: {
        type: Sequelize.BOOLEAN
      },
      paqueteId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Paquetes',
            key: 'id',
            as: 'paqueteId'
          }
        },
      clienteId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Clientes',
            key: 'id',
            as: 'clienteId'
          }
        },
      usuarioId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id',
            as: 'usuarioId'
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
    await queryInterface.dropTable('Membresia');
  }
};