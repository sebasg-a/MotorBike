import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();  // ← Muy importante, debe ser lo primero

const connectionString = process.env.DATABASE_URL;

console.log("URL cargada:", connectionString);  // prueba

const sql = postgres(connectionString, {
  ssl: 'require'
});

export default sql;