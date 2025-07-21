import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = async () => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const logueado = await storage.get('logueado');

  if (logueado) {
    return true; // ✅ Usuario logueado, puede continuar
  } else {
    router.navigateByUrl('/login'); // 🚫 No logueado → al login
    return false;
  }
};
