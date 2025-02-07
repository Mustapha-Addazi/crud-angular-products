import { Injectable } from '@angular/core';
import { AppUser } from '../model/user.model';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   users: AppUser[]=[];
   authenticatedUser:AppUser | undefined;
  constructor() {
    this.users.push({userId:UUID.UUID(),username:"user1",password:"1234",roles:["USER"]})
    this.users.push({userId:UUID.UUID(),username:"user2",password:"1234",roles:["USER"]})
    this.users.push({userId:UUID.UUID(),username:"admin",password:"1234",roles:["USER","ADMIN"]})

   }
   public login(username:string,password:string):Observable<AppUser>{
    let user= this.users.find(u=>u.username==username);
    if(!user){
      return throwError(()=>new Error("user not found"))
    }
    if(user.password!=password){
      return throwError(()=>new Error("Bad credentials"))
    }
    return of(user);
   }
   public authenticateUser(AppUser:AppUser):Observable<true>{
    this.authenticatedUser=AppUser;
    localStorage.setItem("authUser",JSON.stringify({username:AppUser.username,roles:AppUser.roles, jwt:"JWT_TOKEN"}));
    return of(true)
   }
   public hasRole(role:string):boolean{
    return this.authenticatedUser!.roles.includes(role);
   }
   public isAuthenticated(){
    return this.authenticatedUser!=undefined
   }
   public logout():Observable<true>{
    this.authenticatedUser=undefined
    localStorage.removeItem("authUser")
    return of(true)
   }
}
