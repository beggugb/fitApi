'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comprobantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo: {
        type: Sequelize.STRING
      },
      label: {
        type: Sequelize.STRING
      },
      ncomprobante: {
        type: Sequelize.STRING
      },
      glosa: {
        type: Sequelize.STRING
      },
      impuesto: {
        type: Sequelize.DECIMAL
      },
      subtotal: {
        type: Sequelize.DECIMAL
      },
      total: {
        type: Sequelize.DECIMAL
      },
      gestion: {
        type: Sequelize.INTEGER
      },
      tDebe: {
        type: Sequelize.DECIMAL
      },
      tHaber: {
        type: Sequelize.DECIMAL
      },
      estado: {
        type: Sequelize.STRING
      },
      cajaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Cajas',
            key: 'id',
            as: 'cajaId'
          }
        }, 
      ventaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Venta',
            key: 'id',
            as: 'ventaId'
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
    await queryInterface.dropTable('Comprobantes');
  }
};