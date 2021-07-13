sequelize model: create--name Empresa --attributes nombre:string,direccion:string,telefono:string,email:string,website:string,filename:string,smtpHost:string,smtpUser:string,smtpPOrt:string,smtpPassword:string
sequelize model: create--name Sucursal --attributes nombre:string,direccion:string,
sequelize model: create--name Rol --attributes nombre:string
sequelize model: create--name Usuario --attributes nombre:string,username:string,password:string,enabled:boolean,sucursalId:integer,rolId:integer
sequelize model: create--name Modulo --attributes path:string,name:string,icon:string,component:string,layout:string,enabled:boolean,rolId: integer
sequelize model: create--name Tarea --attributes start:date,end:date,title:string,url:string,classNames:string,editable:boolean,backgroundColor:string,selectable:boolean,usuarioId:integer
sequelize model: create--name Cliente --attributes nombres:string,direccion:string,telefono:string,email:string,celular:string,filename:string,estado:boolean,ciudad:string,pais:string,tipo:string,isCliente:boolean
sequelize model: create--name Registro --attributes registro:date,tipo:string,clienteId:integer
sequelize model: create--name Paquete --attributes nombre:string,valor:decimal
sequelize model: create--name Membresia --attributes orden:string,num:integer,ivigencia:date,fvigencia:date,ingresos:integer,estado:boolean,renovacion:boolean,paqueteId:integer,clienteId:integer,usuarioId:integer
sequelize model: create--name Nota --attributes ncuotas:integer,monto:decimal,pagoTotal:decimal,saldoTotal:decimal,gestion:integer,ivigencia:date,fvigencia:date,usuarioId:integer,membresiaId:integer
sequelize model: create--name Plan --attributes cuota:integer,fechaPago:date,importe:decimal,estado:string,notaId:integer

sequelize model: create--name Pago --attributes fechaPago:date,pagoTotal:decimal,usuarioId:integer,planId:integer

sequelize model: create--name Caja --attributes estado:boolean,montoInicial:decimal,montoEgreso:decimal,montoIngreso:decimal,montoFinal:decimal,fechaCierre:date,usuarioId:integer
sequelize model: create--name CajaItems --attributes monto:decimal,tipo:string,label:string,estado:boolean,cajaId:integer
sequelize model: create--name Puc --attributes codigo:string,descripcion:string,nivel:integer,tipo:string

sequelize model: create--name Comprobante --attributes tipo:string,label:string,ncomprobante:string,glosa:string,impuesto:decimal,subtotal:decimal,total:decimal,gestion:integer,tDebe:decimal,tHaber:decimal,estado:string,cajaId:integer,ventaId:integer
sequelize model: create--name Asiento --attributes glosa:string,respaldo:string,debe:decimal,haber:decimal,descripcion:string,cc:string,referencia:string,auxiliar:string,comprobanteId:integer,pucId:integer

sequelize model: create--name Categoria --attributes nombre:string
sequelize model: create--name Articulo --attributes nombre:string,code:string,variantes:string,pventa:decimal,filename:string,stock:integer,categoriaId:integer
sequelize model: create--name Venta --attributes estado:boolean,montoTotal:decimal,fecha:date,usuarioId:integer, clienteId:integer
sequelize model: create--name VentaItems --attributes monto:decimal,tipo:string,label:string,estado:boolean,ventaId:integer,articuloId:integer