import KeyToken from './keyToken'
import usuarioRoutes from './UsuarioRoutes'
import tareaRoutes from './TareasRoutes'
import clienteRoutes from './ClientesRoutes'
import empresaRoutes from './EmpresasRoutes'
import sucursalRoutes from './SucursalesRoutes'
import rolRoutes from './RolesRoutes'
import articuloRoutes from './ArticulosRoutes'
import categoriaRoutes from './CategoriasRoutes'
import paquetesRoutes from './PaquetesRoutes'
import membresiasRoutes from './MembresiasRoutes'
import planesRoutes from './PlanesRoutes'
import filesRoutes from './FilespRoutes'
import cajasRoutes from './CajasRoutes'
import cajasItemsRoutes from './CajasItemsRoutes'
import registrosRoutes from './RegistroRoutes'
import informesRoutes from './InformesRoutes'
import tpvRoutes from './TpvRoutes'
import ventasRoutes from './VentasRoutes'


export default (app) => {
        app.use('/api/usuarios',usuarioRoutes);                
        app.use('/api/tareas', tareaRoutes);                
        app.use('/api/clientes', clienteRoutes);
        app.use('/api/empresas', empresaRoutes);
        app.use('/api/sucursales', sucursalRoutes);
	app.use('/api/roles',KeyToken,rolRoutes);
        app.use('/api/articulos',articuloRoutes);	
	app.use('/api/categorias',categoriaRoutes);
        app.use('/api/paquetes',paquetesRoutes);
        app.use('/api/membresias',membresiasRoutes);
        app.use('/api/planes',planesRoutes);
        app.use('/api/files',filesRoutes);        
        app.use('/api/cajas',cajasRoutes);
        app.use('/api/cajasitems',cajasItemsRoutes); 
        app.use('/api/registros',registrosRoutes);        
        app.use('/api/informes',informesRoutes);        
	app.use('/api/tpv',tpvRoutes);
        app.use('/api/ventas',ventasRoutes);
}
