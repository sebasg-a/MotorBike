import { Component, Inject, Output, EventEmitter, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  @Output() toggleMechanicForm = new EventEmitter<void>();
  @Output() toggleClientForm = new EventEmitter<void>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get isClientRegisterRoute(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.location.pathname === '/client-register';
    }
    return false;
  }

  onClickMechanic() {
    this.toggleMechanicForm.emit();
  }

  onClickClient() {
    this.toggleClientForm.emit();
  }
}