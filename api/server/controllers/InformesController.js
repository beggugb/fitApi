import ClienteService from "../services/ClienteService";
import MembresiaService from "../services/MembresiaService";
import CajaService from "../services/CajaService";
import PagoService from "../services/PagoService";
import RegistroService from "../services/RegistroService";
import moment from 'moment'

class InformesController {

 static indexar(req, res) {    
    Promise.all([MembresiaService.getTodus(req.params.inicio,req.params.fin)])
      .then(([data]) => {
	Promise.all(data.map(item => MembresiaService.todu(item,item.id)))
         .then(item =>{
         /*  let tasas = ordenars(companias,item,cotizacion.valor)*/
           res.status(200).send({ result: "OK"})
 /*         console.log(item)		 */
        })      
      })
      .catch((reason) => {
	      console.log(reason)
        res.status(400).send({ message: reason });
      });
  }
	 
static clientes(req, res) {    
    const { desde, hasta } = req.body;       
    Promise.all([ClienteService.reporte(desde, hasta)])
      .then(([data]) => {
        res.status(200).send({ result: {detalle: data.total, data: data } });
      })
      .catch((reason) => {
	      console.log(reason)
        res.status(400).send({ message: reason });
      });    
  }

  static membresias(req, res) {   
    const { desde, hasta, usuarioId } = req.body;          

    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)


    
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]

    Promise.all([MembresiaService.total(fdesde,fhasta,usuarioId),
	    	 MembresiaService.totalDetalle(fdesde,fhasta,usuarioId)])
      .then(([dat,datas]) => {
        res.status(200).send({ result: { detalle: dat.total, data: datas} });
      })
      .catch((reason) => {
         console.log(reason)
        res.status(400).send({ message: reason });
      });    
  }

  static cajas(req, res) {    
    const { desde, hasta, usuarioId } = req.body;       
    Promise.all([CajaService.total(desde,hasta,usuarioId),CajaService.totalDetalle(desde,hasta,usuarioId)])
    .then(([dat,datas]) => {
      res.status(200).send({ result: { detalle: dat.total, data: datas} });
    })
    .catch((reason) => {
      res.status(400).send({ message: reason });
    });    
}

  static pagos(req, res) {    
    const { usuarioId, start, end } = req.body;       
    const { desde, hasta } = req.body;       
    Promise.all([PagoService.total(desde,hasta),PagoService.totalDetalle(desde,hasta)])
    .then(([dat,datas]) => {
      res.status(200).send({ result: { detalle: dat, data: datas} });
    })
    .catch((reason) => {
      res.status(400).send({ message: reason });
    });  
  }



  static consolidado(req, res) {         
    const { desde, hasta,usuarioId } = req.body;    
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)
    
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    
    
    Promise.all([MembresiaService.total(fdesde,fhasta,usuarioId),MembresiaService.totals(fdesde,fhasta,usuarioId)])
      .then(([dat,datas]) => {        
        res.status(200).send({ result: { detalle: dat.total, data: datas} });
      })
      .catch((reason) => {

        res.status(400).send({ message: reason });
      });    
  }
 
  static registro(req, res) { 
    const { desde, hasta } = req.body;
    Promise.all([RegistroService.reporte(desde, hasta)])
      .then(([data]) => {
        res.status(200).send({ result: {detalle: data.total, data: data } });
      })
      .catch((reason) => {
    
        res.status(400).send({ message: reason });
      });
  }
 
/******admininstrador***/
static amembresias(req, res) {
    const { desde, hasta } = req.body;
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]

    Promise.all([MembresiaService.atotal(fdesde,fhasta),
                 MembresiaService.atotalDetalle(fdesde,fhasta)])
      .then(([dat,datas]) => {
        res.status(200).send({ result: { detalle: dat.total, data: datas} });
      })
      .catch((reason) => {
         console.log(reason)
        res.status(400).send({ message: reason });
      });
  }





  static aconsolidado(req, res) { 
    const { desde, hasta } = req.body;
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)

    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]


    Promise.all([MembresiaService.atotal(fdesde,fhasta),MembresiaService.atotals(fdesde,fhasta)])
      .then(([dat,datas]) => {
        res.status(200).send({ result: { detalle: dat.total, data: datas} });
      })
      .catch((reason) => {

        res.status(400).send({ message: reason });
      });
  }

/**********************/

  

}

export default InformesController;


   
