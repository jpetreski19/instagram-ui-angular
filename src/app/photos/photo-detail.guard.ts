import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoDetailGuard implements CanActivate {
  constructor(private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = Number(route.paramMap.get('id'));
    const userId = Number(route.paramMap.get('userId'));
    const albumId = Number(route.paramMap.get('albumId'));
    if (isNaN(id) || id < 1) {
      // Photo id is invalid

      alert('Invalid photo id');
      this.router.navigate(['']);
      return false;

    } else if (userId != 5) {
      // User id is not correct

      alert('Invalid user id');
      this.router.navigate(['']);
      return false;

    } else if (albumId != 50) {
      // Album id is not correct
      
      alert('Invalid album id');
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  
}
