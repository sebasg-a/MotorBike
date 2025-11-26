export interface User {
  email_usuario: string;
  uid_firebase: string;
  nombre_usuario: string;
  apellido_usuario: string;
  telefono_usuario: string;
  id_rol_usuario: number;


  contrasena_usuario?: string;
  cambio_contrasena?: string;
}