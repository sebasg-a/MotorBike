<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role']; // rol requerido de la ruta
    const userRole = this.authService.getUserRole(); // obtiene rol del usuario logueado

    if (this.authService.isAuthenticated() && userRole === expectedRole) {
      return true;
    }

    // opcional: podrías redirigir a una página de "403 no autorizado"
    this.router.navigate(['/forbidden']);
    return false;
  }
}
=======
// src/app/guards/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data?.['expectedRole'] as string | undefined;

  // Si no se definió un rol esperado, permitimos el acceso (o puedes cambiar a false)
  if (!expectedRole) {
    return of(true);
  }

  return authService.getUserRole().pipe(
    take(1), // tomamos solo la primera emisión
    tap(role => console.log('[roleGuard] expected:', expectedRole, '-> role:', role)),
    map(role => {
      const ok = role === expectedRole;
      if (!ok) {
        // redirige si no tiene permisos
        router.navigate(['/inicio']);
      }
      return ok;
    })
  );
};
>>>>>>> fc98701172364496cc3d811c8e0c132c8f4a19a9
