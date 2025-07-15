import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const introGuard: CanActivateFn = async (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  const visto = await storageService.get('intro-visto');

  if (visto) {
    
    return true;
  } else {
    
    router.navigateByUrl('/intro');
    return false;
  }
};
