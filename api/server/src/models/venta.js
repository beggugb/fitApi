'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venta = sequelize.define('Venta', {
    estado: DataTypes.BOOLEAN,
    montoTotal: DataTypes.DECIMAL,
    fecha: DataTypes.DATE,    
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id',
        as: 'usuarioId'
      }
    },
    clienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cliente',
        key: 'id',
        as: 'clienteId'
      }
    }
  }, {});
  
  Venta.associate = function(models) {
    // associations can be defined here
    Venta.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId',
      onDelete: 'CASCADE'
    });
    Venta.belongsTo(models.Cliente,{
      foreignKey: 'clienteId',
      onDelete: 'CASCADE'
    });
  };
  return Venta;
};
