import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

export const introGuard: CanActivateFn = async () => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const introVisto = await storage.get('introVisto');

  if (introVisto) {
    return true; // ✅ Puede ir al Home
  } else {
    router.navigateByUrl('/intro'); // 🚫 Redirige al Intro
    return false;
  }
};
