import database from "../src/models";
import moment from 'moment'
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Plan, Usuario } = database;

class PlanService {   

  static add(data) {    
    return new Promise((resolve, reject) => {        
        Plan.bulkCreate(data, {individualHooks: true})  
            .then((result) => {              
                resolve({ message: result })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              }); 
     });
    }
        
    static getAll(notaId) {        
      return new Promise((resolve, reject) => {        
          Plan.findAll({
              order: [['cuota', 'DESC']],            
              where: { notaId: notaId }              
          })
          .then((planes) => {                
                  resolve({ plan: planes })
              })
          .catch((reason) => {                
                  reject({ message: reason.message, data: null })
           });
         });
     }

    static update(dato, datoId) {
      return new Promise((resolve, reject) => {
        Plan.update(dato, { where: { id: Number(datoId) } })
          .then((plan) => resolve(plan))
          .catch((reason) => reject(reason));
      });
    }

    static delete(datoId) {
    return new Promise((resolve, reject) => {
        Plan.destroy({ where: { notaId: Number(datoId) } })
        .then((plan) => resolve(plan))
        .catch((reason) => reject(reason));
    });
  }
	

  
}

export default PlanService;
