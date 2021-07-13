'use strict';
module.exports = (sequelize, DataTypes) => {
  const CajaItems = sequelize.define('CajaItems', {
    monto: DataTypes.DECIMAL,
    tipo: DataTypes.STRING,
    label: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,    
    cajaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Caja',
        key: 'id',
        as: 'cajaId'
      }
    }
  }, {});
  
  CajaItems.associate = function(models) {
    // associations can be defined here
    CajaItems.belongsTo(models.Caja,{
      foreignKey: 'cajaId',
      onDelete: 'CASCADE'
    });
  };
  return CajaItems;
};
