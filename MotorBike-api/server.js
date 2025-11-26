import app from './app.js';
const port = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola desde la API de MotorBike!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});