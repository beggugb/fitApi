import database from "../src/models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Cliente, Membresia, Paquete } = database;

class MembresiaService {

   
  static totals(desde,hasta,usuarioId) {    
	  console.log(usuarioId)
    return new Promise((resolve, reject) => {        
        Membresia.findAll({ 
          raw: true,
          nest: true,
          include: [{ model: Paquete, attributes: ["nombre","valor"]}],
          attributes: ['paqueteId',[Sequelize.fn('count', Sequelize.col('ingresos')), 'cantidad'],[Sequelize.fn('sum', Sequelize.col('ingresos')), 'total']],                      
	      where: {
         	 [Op.and]: [
	            { createdAt: { [Op.between]: [desde, hasta]}},
          	  { usuarioId: usuarioId },
              { estado: true },
	          ]
          },	
          group: ['paqueteId','Paquete.nombre','Paquete.valor'],
        })           
            .then((result) => {              
                resolve(result)
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
     });
  }

   static total(desde,hasta,usuarioId) {    
    return new Promise((resolve, reject) => {        
        Membresia.findOne({ 
          raw: true,
          nest: true,
          attributes: [[Sequelize.fn('sum', Sequelize.col('ingresos')), 'total']],            
         /* where :  { createdAt: {[Op.betwaeen]: [desde, hasta]}}*/
           where: {
                 [Op.and]: [
                   { createdAt: { [Op.between]: [desde, hasta]}},
                   { usuarioId: usuarioId },
                   { estado: true },
                  ]
          }, 		
	   
        })           
            .then((result) => {              
                resolve(result)
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
     });
  }

  static totalDetalle(desde,hasta,usuarioId) {
    return new Promise((resolve, reject) => {       
       Membresia.findAndCountAll({
         raw: true,
         nest: true,         
         /*where :  { ivigencia: {[Op.between]: [desde, hasta]}},   */
	 where: {
          [Op.and]: [
            { createdAt: { [Op.between]: [desde, hasta]}},
            { estado: true },
            { usuarioId: usuarioId }
          ]
         },      
         order: [['ivigencia', 'DESC']],
         include: [
             { model: Paquete, attributes: ["id", "nombre","valor"]},
             { model: Cliente, attributes: ["id", "nombres"]}
  		 
         ]      
       })
         .then((membresias) =>
           resolve({             
             total: membresias.count,
             data: membresias.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }	

  static add(newmem) {    
    return new Promise((resolve, reject) => {        
        Membresia.create(newmem,{ 
          raw: true,
          nest: true})           
            .then((result) => {              
                resolve({ Membresia: result })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
     });
  }

  static getItem(datoId) {    
    return new Promise((resolve, reject) => {
      Membresia.findByPk(datoId, {
		raw: true,
                nest: true,
	        include: [
            { model: Paquete, attributes: ["id", "nombre","valor"]}
        ]
	      })
        .then((result) => {
		resolve({ Membresia: result })
	})
        .catch((reason) => reject(reason));
    });
  }

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Membresia.update(dato, { where: { id: Number(datoId) } })
        .then((membresia) => resolve(membresia))
        .catch((reason) => reject(reason));
    });
  }
  static getAllClientes(pag,num,clienteId) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Membresia.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
	where: { clienteId: Number(clienteId) },      
        order: [['fvigencia', 'DESC']],
	attributes: ["id","ivigencia","fvigencia","estado","ingresos","paqueteId","intros","clienteId","usuarioId"],      
	include: [
            { model: Paquete, attributes: ["id", "nombre","valor"]}
        ]      
      })
        .then((membresias) =>
          resolve({
            paginas: Math.ceil(membresias.count / num),
            pagina: page,
            total: membresias.count,
            data: membresias.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	

   static delete(datoId) {
    return new Promise((resolve, reject) => {
        Membresia.destroy({ where: { id: Number(datoId) } })
        .then((membresia) => resolve(membresia))
        .catch((reason) => reject(reason));
    });
  }

  static getItemClienteActivo(clienteId) {  
    console.log(clienteId)  
      var d         = new Date()
      var formatted = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    return new Promise((resolve, reject) => {
      Membresia.findOne({
            where: { 
              clienteId: Number(clienteId),
              estado: true,
              fvigencia: {[Op.gte]: formatted } 
            },
		        raw: true,
            nest: true,
	          include: [{ model: Paquete, attributes: ["id", "nombre","valor"]}]
	      })
        .then((result) => {
		resolve({ Membresia: result })
	})
        .catch((reason) => reject(reason));
    });
  }
}

export default MembresiaService;
