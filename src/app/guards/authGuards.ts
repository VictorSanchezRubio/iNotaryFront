import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GlobalConstant } from '../global/global-constant';



@Injectable({ providedIn: 'root' })export class AuthGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token=sessionStorage.getItem('access_token');
        console.log(token);
     //  token="";
        if (token!=null)
         {
            GlobalConstant._isLoged=true;

            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
