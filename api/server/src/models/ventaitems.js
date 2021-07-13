'use strict';
module.exports = (sequelize, DataTypes) => {
  const VentaItems = sequelize.define('VentaItems', {
    monto: DataTypes.DECIMAL,
    tipo: DataTypes.STRING,
    label: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,    
    articuloId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Articulo',
        key: 'id',
        as: 'articuloId'
      }
    },
    ventaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Venta',
        key: 'id',
        as: 'ventaId'
      }
    }
  }, {});
  
  VentaItems.associate = function(models) {
    // associations can be defined here
    VentaItems.belongsTo(models.Articulo,{
      foreignKey: 'articuloId',
      onDelete: 'CASCADE'
    });
    VentaItems.belongsTo(models.Venta,{
      foreignKey: 'ventaId',
      onDelete: 'CASCADE'
    });
  };
  return VentaItems;
};
