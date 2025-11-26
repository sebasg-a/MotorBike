import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import CitaRuta from './routes/citaRuta.js';
import ClienteRuta from './routes/clienteRuta.js';
import UsuarioRuta from './routes/usuarioRuta.js';
import ServicioRuta from './routes/servicioRuta.js';
import MecanicoRuta from './routes/mecanicoRuta.js';
import MotoRuta from './routes/motoRuta.js';
import HistorialRuta from './routes/historialRuta.js';
import OrdenRuta from './routes/ordenRuta.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/usuarios', UsuarioRuta);
app.use('/api/clientes', ClienteRuta);
app.use('/api/citas', CitaRuta);
app.use('/api/servicios', ServicioRuta);
app.use('/api/mecanicos', MecanicoRuta);
app.use('/api/motos', MotoRuta);
app.use('/api/historial', HistorialRuta);
app.use('/api/ordenes', OrdenRuta);
 
export default app;