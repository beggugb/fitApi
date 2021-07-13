import ArticuloService from "../services/ArticuloService";

class TpvController {
 
  static listas(req, res) {      
 
      Promise.all([ArticuloService.getAllCategorias(req.params.page,req.params.num,req.params.categoria)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }

  
}

export default TpvController;
