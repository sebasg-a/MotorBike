import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // Comprobar que estamos en navegador
    if (typeof window === 'undefined') return false;

    // Leer usuario desde localStorage
    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) {
      this.router.navigate(['/']);
      return false;
    }

    const usuario = JSON.parse(usuarioStr);

    // Verificar si la ruta requiere un rol específico
    const rolesPermitidos: number[] = route.data['roles'] || [];

    if (rolesPermitidos.length && !rolesPermitidos.includes(usuario.id_rol_usuario)) {
      // Si el usuario no tiene el rol permitido
      this.router.navigate(['/']);
      return false;
    }

    // Usuario autenticado y con rol permitido
    return true;
  }
}
