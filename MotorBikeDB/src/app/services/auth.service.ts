import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut, 
  User,
  user 
} from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../app/environments/firebase';
import { Observable, firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  user$: Observable<User | null>;

  constructor() {
    this.user$ = user(this.auth);
  }

  // 🔹 Login con Firebase y carga de rol desde backend
  async login(email: string, password: string): Promise<User | null> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const firebaseUser = userCredential.user;

    if (!firebaseUser) return null;

    // Obtener usuario con rol desde backend
    const usuario = await firstValueFrom(
      this.http.get(`${environment.apiUrl}/usuarios/obtenerPorUid/${firebaseUser.uid}`)
    );

    // Guardar en localStorage solo si está en navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }

    return firebaseUser;
  }

  // 🔹 Registro en Firebase + backend
  async register(email: string, password: string, newUser: any): Promise<User | null> {
    try {
      // 1. Crear en Firebase
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const firebaseUser = userCredential.user;

      if (!firebaseUser) return null;

      // 2. Enviar al backend
      const userToSave = {
        ...newUser,
        uid_firebase: firebaseUser.uid
      };

      await firstValueFrom(
        this.http.post(`${environment.apiUrl}/usuarios/crear`, userToSave)
      );

      return firebaseUser;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  // 🔹 Recuperación de contraseña
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log(`Correo de recuperación enviado a: ${email}`);
    } catch (error) {
      console.error('Error al enviar correo de recuperación:', error);
      throw error;
    }
  }

  // 🔹 Logout
  async logout(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('usuario');
    }
    return await signOut(this.auth);
  }

  // 🔹 Obtener usuario de Firebase
  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }

  // 🔹 UID de Firebase
  getUid(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.uid : null;
  }

  // 🔹 Verificar si está logueado
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('usuario');
    }
    return false;
  }

  // 🔹 Obtener rol del usuario
  getUserRole(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const usuarioStr = localStorage.getItem('usuario');
      if (usuarioStr) {
        const usuario = JSON.parse(usuarioStr);
        return usuario.id_rol_usuario ?? null;
      }
    }
    return null;
  }

  getUsuarioByUid(uid: string): Observable<any> {
  return this.http.get(`${environment.apiUrl}/usuarios/obtenerPorUid/${uid}`);
}
}
