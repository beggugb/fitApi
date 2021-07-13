import CajaService from "../services/CajaService";
import CajaItemsService from "../services/CajaItemsService";

class CajaController { 
 
  static add(req, res) {        
      const { usuarioId } = req.body
    Promise.all([CajaService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  CajaService.getAllUsuario(1,12,"createdAt","DESC",usuarioId)
              ]) 
              .then(([result]) => {
                  res.status(200).send({ message:"registrado",result: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

static listadetalle(req, res) {        
    Promise.all([CajaService.getAllUsuario(req.params.page,req.params.num,"createdAt","DESC",req.params.id)]) 
      .then(([result]) => {
           res.status(200).send({ result: result });                
          })        
      .catch((reason) => {      
          
        res.status(400).send({ reason });
      });   
  }

static update(req, res) {
  const d = new Date()
  const io = req.body
  const { usuarioId } = req.body	
	
  io.fechaCierre = d
    Promise.all([CajaService.update(io, req.params.id)])
      .then(([caja]) => {
        Promise.all([CajaService.getAllUsuario(1,12,"createdAt","DESC",usuarioId)])
          .then(([cajas])=> {
	    res.status(200).send({ message:'Caja actualizada', result: cajas});
        })
      })  
      .catch((reason) => {
        res.status(400).send({ message: reason.message, cliente: null });
      });
  }  

  static item(req, res) {          
    Promise.all([CajaService.item(req.params.id),
      CajaItemsService.getAllCaja(1,12,"createdAt","ASC",req.params.id)])
        .then(([cajau,itemsu]) => {
              res.status(200).send({ result:{cajau, itemsu}});    
        })  
        .catch((reason) => {
          res.status(400).send({ message: reason.message, cliente: null });
        });
    }

  static items(req, res) { 
    Promise.all([CajaService.item(req.params.id),
      CajaItemsService.getItemsCaja(req.params.id)])
        .then(([cajau,itemsu]) => {
              res.status(200).send({ result:{cajau, itemsu}});
        })
        .catch((reason) => {
          res.status(400).send({ message: reason.message, cliente: null });
        });
    }


}


export default CajaController;
