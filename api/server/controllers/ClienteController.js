import ClienteService from "../services/ClienteService";

class ClienteController {
 

  static item(req, res) {  
               
      Promise.all([ClienteService.getItem(req.params.id)]) 
           .then(([cliente]) => {
                res.status(200).send({ result: cliente });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }

  static search(req, res) {              
    const { nombres, ci, nit } = req.body
      Promise.all([ClienteService.search(nombres, ci, nit)]) 
           .then(([result]) => {
                res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
		
          res.status(400).send({ reason });
        });   
  }

  static lista(req, res) {        
      Promise.all([ClienteService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }

  static add(req, res) {        
    
    Promise.all([ClienteService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  ClienteService.getAll(1,12,"nombres","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ data: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

  static registro(req, res) {
    
    Promise.all([ClienteService.add(req.body)])
      .then(([result]) => {
           res.status(200).send({ result });
          })
      .catch((reason) => {
        res.status(400).send({ message: reason.message });
      });
 }

  static update(req, res) {
    Promise.all([ClienteService.update(req.body, req.params.id)])
      .then(([cliente]) => {
          res.status(200).send({ message:'Cliente actualizado', cliente });
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, cliente: null });
      });
  }

  static delete(req, res) {
    Promise.all([ClienteService.delete(req.params.id)])
      .then(([cliente]) => {
        Promise.all([                    
          ClienteService.getAll(1,12,"nombres","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Cliente eliminado', data: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}

export default ClienteController;
