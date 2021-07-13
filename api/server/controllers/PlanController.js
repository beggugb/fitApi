import NotaService from "../services/NotaService";
import PlanService from "../services/PlanService";
import CajaService from "../services/CajaService";
import CajaItemsService from "../services/CajaItemsService";
import PagoService from "../services/PagoService";
import MembresiaService from "../services/MembresiaService";

class PlanController {

  static update(req, res) {
    const { notaId, importe, usuarioId, cliente } = req.body  
    
    const d = new Date()        
      Promise.all([CajaService.getItem(usuarioId)])
        .then(([caja]) => {                      
          var dd = caja ? new Date(caja.createdAt) : new Date('2020-01-01 03:24:55.528-04') 
          var fcaja = (new Date(dd + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
          var formatted = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]         
          if(fcaja !== formatted){
            res.status(400).send({ result :{message: "No tiene caja abierta" }});
          }else{
            let newPl = {}
                newPl.notaId = notaId
                newPl.importe = importe
                newPl.usuarioId = usuarioId
                newPl.estado = "pagado"
                newPl.fechaPago = d 
Promise.all([PlanService.update(newPl, req.params.id),
             NotaService.item(notaId)])
  .then(([pln, nota]) => {
    //newNota
    const newNot = nota              
    newNot.pagoTotal = parseFloat(nota.pagoTotal)+ importe
    newNot.saldoTotal = parseFloat(nota.saldoTotal) - importe
    //newPago
    const newPag = {}
    newPag.fechaPago = d
    newPag.pagoTotal = importe
    newPag.usuarioId = usuarioId
    newPag.label = "pago membresia UsuarioId :" + usuarioId
    //Actualizamos Nota  y registramos Pago
    Promise.all([PagoService.add(newPag),NotaService.update(newNot, notaId),PlanService.getAll(notaId)])
      .then(([rPago, rNota, rPlan]) => {
          //item caja
          const citem = {}
          citem.monto = importe
          citem.tipo = "ingreso"
          citem.label = "pago membresia  " + cliente
          citem.estado = true
          citem.cajaId = caja.id
          Promise.all([CajaItemsService.add(citem)])
            .then(([icaja]) => {                           
              const newCaja = caja                                        
              newCaja.montoIngreso = parseFloat(caja.montoIngreso) + importe
              newCaja.montoFinal = parseFloat(caja.montoFinal) +  importe

              //actualizamos caja
              //verificamos nota
              Promise.all([CajaService.update(newCaja,caja.id),NotaService.item(notaId)])
                .then(([resCaja,resNota]) => {

                  //actuslizamos membresia
                  const nmem = {}
                  nmem.id = resNota.membresiaId
                  nmem.estado = true 

                  Promise.all([
                    MembresiaService.update(nmem,resNota.membresiaId),
                                                  ])
                    .then(([rr]) => {            
                        res.status(200).send({ result:{ Nota: resNota, Plan: rPlan, Recibo: rPago }});
                  })
                })      
            })
      })
})
          }   
          })    
      .catch((reason) => {
        res.status(400).send({ message: reason.message, cliente: null });
      });
  }
  
  static updates(req, res) {
    const { notaId, importe, usuarioId } = req.body  
    const d = new Date()    
    //Registro de plan
    Promise.all([PlanService.update(req.body, req.params.id),NotaService.item(notaId)])
      .then(([pln, nota]) => {           
        const dating = nota              
         dating.pagoTotal = parseFloat(nota.pagoTotal)+ importe
         dating.saldoTotal = parseFloat(nota.saldoTotal) - importe
        const pag = {}
          pag.fechaPago = d
          pag.pagoTotal = importe
          pag.usuarioId = usuarioId
          pag.label = "pago membresia UsuarioId :" + usuarioId
          //Actualiza Nota
          Promise.all([NotaService.update(dating, notaId),PlanService.getAll(notaId),PagoService.add(pag)])
            .then(([not, planes, pagu]) => {                            
              /*CAJA*/
              Promise.all([CajaService.verificarCaja(usuarioId)])
              .then(([caja]) => {            
                const citem = {}
                citem.monto = importe
                citem.tipo = "ingreso"
                citem.label = "pago membresia" + usuarioId
                citem.estado = true
                citem.cajaId = caja.id
                Promise.all([CajaItemsService.add(citem)])
                  .then(([icaja]) => {            
                    const newCaja = caja                                        
                    newCaja.montoIngreso = parseFloat(caja.montoIngreso) + importe
                    newCaja.montoFinal = parseFloat(caja.montoFinal) + importe                                    
                    
                    Promise.all([CajaService.update(newCaja,caja.id),NotaService.item(notaId)])
                      .then(([cc,nn]) => {
                        const nmem = {}
                        nmem.id = nn.membresiaId
                        nmem.estado = true                   
                        
                        Promise.all([MembresiaService.update(nmem,nn.membresiaId)])
                          .then(([rr]) => {            
                              res.status(200).send({ Nota: nn, Plan: planes });
                     })
                  })   
              })  
              /*END CAJA*/                
            })        
         })
       }) 
      .catch((reason) => {
        res.status(400).send({ message: reason.message, cliente: null });
      });
  }
    
}

export default PlanController;
