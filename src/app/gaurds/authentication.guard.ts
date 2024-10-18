import { CanActivateFn, Router } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthenticationService)
  const router = inject(Router)
  
  if(authService.isAuthenticated()){
  return true;}
else{
   router.navigateByUrl("/login")};
   return false;
};
