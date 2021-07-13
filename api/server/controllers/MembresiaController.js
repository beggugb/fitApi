import MembresiaService from "../services/MembresiaService";
import NotaService from "../services/NotaService";
import PlanService from "../services/PlanService";
import ClienteService from "../services/ClienteService"
import fFecha from "../utils/fFecha"
class MembresiaController {

  static add(req, res) { 
 
    var d = new Date()          
    Promise.all([MembresiaService.add(req.body)])
        .then(([result]) => {             
            const nota =  {}
            nota.ncuotas = result.Membresia.num,
            nota.monto = result.Membresia.ingresos,
            nota.pagoTotal = 0,
            nota.saldoTotal = result.Membresia.ingresos,
            nota.gestion = parseInt(d.getFullYear()),
            nota.ivigencia = d,
            nota.fvigencia = d,
            nota.usuarioId = result.Membresia.usuarioId,
            nota.membresiaId = result.Membresia.id
            Promise.all([NotaService.add(nota)])
              .then(([nota]) => {
                let pagos = Array()
                let nump = result.Membresia.num
                for (let i = 1; i <= nump; i++) {
                  let date = {}
                  date.cuota = i;
                  date.importe = parseFloat(nota.Nota.monto / nump);
                  date.estado = 'pendiente';
                  date.fechaPago = i === 1 ? d : fFecha.sumarDia(2)               
                  date.notaId = nota.Nota.id
                  pagos.push(date)
                }
		   
                Promise.all([
                  PlanService.add(pagos),
                  MembresiaService.getAllClientes(1,12,req.body.clienteId)

                ])
                  .then(([resu, rem]) => {
                    res.status(200).send({ message: 'Membresia registrada', result: rem });
                })    
           })
        })
      .catch((reason) => {     
	
       res.status(400).send({ message: reason.message });
      });    }

 static getItem(req, res) {

    Promise.all([
      MembresiaService.getItem(req.params.id),     
      NotaService.getItem(req.params.id)	    
    ])
    .then(([mem,not]) => {
	    Promise.all([PlanService.getAll(not.Nota.id),ClienteService.getItem(mem.Membresia.clienteId)])
		 .then(([pla,cli]) => {
		    res.status(200).send({ result: { mem, not,pla,cli }});
           })			 
      })  
    .catch((reason) => {
      res.status(400).send({ message: reason.message, cliente: null });
    });	    

 
}

 static getDetalle(req, res) {
  Promise.all([
      MembresiaService.getAllClientes(req.params.page,req.params.num,req.params.id),
      ClienteService.getItem(req.params.id)
    ])
    .then(([membresias,cliente]) => {
       res.status(200).send({ cliente: cliente, membresia: membresias });
    })
    .catch((reason) => {
      res.status(400).send({ message: reason.message, cliente: null });
    });
}


static listadetalle(req, res) {        
  Promise.all([MembresiaService.getAllClientes(req.params.page,req.params.num,req.params.id)]) 
    .then(([result]) => {
         res.status(200).send({ result: result });                
        })        
    .catch((reason) => {          
      res.status(400).send({ reason });
    });   
}

 static delete(req, res) {
 Promise.all([NotaService.getItem(req.params.id),MembresiaService.getItem(req.params.id)])
  .then(([mo1,mo2]) => {	 
     Promise.all([PlanService.delete(mo1.Nota.id)])
      .then(([m1]) => {
	 Promise.all([NotaService.delete(req.params.id)])
	  .then(([n2]) => {
             Promise.all([MembresiaService.delete(req.params.id)])
                .then(([n3]) => {
		   Promise.all([MembresiaService.getAllClientes(1,12,mo2.Membresia.clienteId)])
                       .then(([membresias]) => {
			   res.status(200).send({ message:'Cliente eliminado', result: membresias });
                           })
        		})
		})
	})    
    })	  
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  



  }
  

static reporte(req, res) {        
  Promise.all([MembresiaService.getAllClientes(req.params.page,req.params.num,req.params.id)]) 
    .then(([result]) => {
         res.status(200).send({ result: result });                
        })        
    .catch((reason) => {          
      res.status(400).send({ reason });
    });   
}


  

  
}
export default MembresiaController;
