import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {
handlelogout() {
this.AuthenticationService.logout().subscribe({
  next:()=>
    this.router.navigateByUrl("/login")
})
}
constructor(public AuthenticationService:AuthenticationService, private router:Router){

}
}
